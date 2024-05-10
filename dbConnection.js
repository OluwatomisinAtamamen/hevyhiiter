import { open } from 'sqlite';
import sqlite3 from 'sqlite3';


async function init() {
  const db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database,
    verbose: true,
  });
  await db.migrate({ migrationsPath: './migrations-sqlite' });
  return db;
}

const dbConn = init();

// Retrieve all profiles from the database
export async function sendProfiles() {
  const db = await dbConn;
  const profiles = await db.all('SELECT * FROM PROFILE');
  return profiles;
}

// Add a new profile to the database
export async function addProfile(username) {
  const db = await dbConn;
  const profile = await db.run('INSERT INTO PROFILE (USERNAME) VALUES (?)', [username]);
  return profile;
}

// Retrieve workouts for a specific profile
export async function sendWorkouts(id) {
  const db = await dbConn;
  const workouts = await db.all(`SELECT WORKOUT_ID, WORKOUT_NAME, DESCRIPTION, WORKOUT_DURATION, DATE_CREATED FROM PROFILE 
                                 JOIN WORKOUT ON PROFILE.PROFILE_ID = WORKOUT.PROFILE_ID 
                                 WHERE PROFILE.PROFILE_ID = ?`, id);

  const workoutExerciseDetails = await db.all(`SELECT WORKOUT.WORKOUT_ID, WORKOUT_EXERCISE_ID, EXERCISE_NAME, EXERCISE_DURATION, REST_DURATION, EXERCISE.DESCRIPTION FROM WORKOUT 
                                               JOIN WORKOUT_EXERCISE ON WORKOUT.WORKOUT_ID = WORKOUT_EXERCISE.WORKOUT_ID 
                                               JOIN EXERCISE ON WORKOUT_EXERCISE.EXERCISE_ID = EXERCISE.EXERCISE_ID 
                                               WHERE WORKOUT.PROFILE_ID = ?`, id);
  return { workouts, workoutExerciseDetails };
}

export async function addWorkout(id, workoutName, workoutDesc, workoutExercises, totalDuration, editWorkoutId) {
  const db = await dbConn;

  if (editWorkoutId === null || editWorkoutId === undefined) {
    // Create a new workout
    const newWorkout = await db.run('INSERT INTO WORKOUT (PROFILE_ID, WORKOUT_NAME, DESCRIPTION, WORKOUT_DURATION) VALUES (?, ?, ?, ?)', [id, workoutName, workoutDesc, totalDuration]);
    const workoutId = newWorkout.lastID;

    // Insert workout exercises
    for (const exercise of workoutExercises) {
      const { exerciseTimeInput, restTimeInput, exerciseName } = exercise;
      const exerciseIdObj = await db.get('SELECT EXERCISE_ID FROM EXERCISE WHERE EXERCISE_NAME = ?', [exerciseName]);
      const exerciseId = exerciseIdObj.EXERCISE_ID;

      await db.run('INSERT INTO WORKOUT_EXERCISE (WORKOUT_ID, EXERCISE_ID, EXERCISE_DURATION, REST_DURATION) VALUES (?, ?, ?, ?)', [workoutId, exerciseId, exerciseTimeInput, restTimeInput]);
    }
    return { workoutId };
  } else {
    // Edit an existing workout
    await db.run('UPDATE WORKOUT SET WORKOUT_NAME = ?, DESCRIPTION = ?, WORKOUT_DURATION = ? WHERE WORKOUT_ID = ?', [workoutName, workoutDesc, totalDuration, editWorkoutId]);

    // Delete existing workout exercises
    const existingExercises = await db.all('SELECT WORKOUT_EXERCISE_ID FROM WORKOUT_EXERCISE WHERE WORKOUT_ID = ?', [editWorkoutId]);
    for (const exercise of existingExercises) {
      await db.run('DELETE FROM WORKOUT_EXERCISE WHERE WORKOUT_EXERCISE_ID = ?', [exercise.WORKOUT_EXERCISE_ID]);
    }

    // Insert new workout exercises
    for (const exercise of workoutExercises) {
      const { exerciseTimeInput, restTimeInput, exerciseName } = exercise;
      const exerciseIdObj = await db.get('SELECT EXERCISE_ID FROM EXERCISE WHERE EXERCISE_NAME = ?', [exerciseName]);
      const exerciseId = exerciseIdObj.EXERCISE_ID;

      await db.run('INSERT INTO WORKOUT_EXERCISE (WORKOUT_ID, EXERCISE_ID, EXERCISE_DURATION, REST_DURATION) VALUES (?, ?, ?, ?)', [editWorkoutId, exerciseId, exerciseTimeInput, restTimeInput]);
    }

    return { workoutId: editWorkoutId };
  }
}

// delete workout from database
export async function deleteWorkoutFromDatabase(userId, workoutId) {
  const db = await dbConn;
  const result = await db.run('DELETE FROM WORKOUT WHERE PROFILE_ID = ? AND WORKOUT_ID = ?', [userId, workoutId]);
  return result;
}

// Retrieve all exercises from the database
export async function sendExercises() {
  const db = await dbConn;
  const exercises = await db.all('SELECT EXERCISE_NAME FROM EXERCISE ORDER BY EXERCISE_NAME ASC');
  return exercises;
}

// Retrieve exercises for a specific muscle group
export async function sendExercisesByMuscle(muscleName) {
  const db = await dbConn;
  const exercises = await db.all(`SELECT EXERCISE_NAME, DESCRIPTION FROM EXERCISE 
                                  JOIN EXERCISE_MUSCLE ON EXERCISE.EXERCISE_ID = EXERCISE_MUSCLE.EXERCISE_ID 
                                  JOIN MUSCLE_GROUP ON EXERCISE_MUSCLE.MUSCLE_ID = MUSCLE_GROUP.MUSCLE_ID 
                                  WHERE MUSCLE_NAME = ? ORDER BY EXERCISE_NAME ASC`, muscleName);
  return exercises;
}
