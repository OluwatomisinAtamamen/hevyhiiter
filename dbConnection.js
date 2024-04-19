import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

// Initialize the database connection
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
  const workouts = await db.all('SELECT WORKOUT_NAME, DESCRIPTION FROM PROFILE JOIN WORKOUT ON PROFILE.PROFILE_ID = WORKOUT.PROFILE_ID WHERE PROFILE.PROFILE_ID = ?', id);
  return workouts;
}

export async function addWorkout(id, workoutName, workoutDesc, workoutExercises, totalDuration) {
  const db = await dbConn;
  const workout = await db.run('INSERT INTO WORKOUT (PROFILE_ID, WORKOUT_NAME, DESCRIPTION, WORKOUT_DURATION) VALUES (?, ?, ?, ?)', [id, workoutName, workoutDesc, totalDuration]);
  const workoutID = workout.lastID;

  for (const exercise of workoutExercises) {
    const { exerciseTimeInput, restTimeInput, exerciseName } = exercise;
    const exerciseId = await db.get('SELECT EXERCISE_ID FROM EXERCISE WHERE EXERCISE_NAME = ?', [exerciseName]);

    await db.run('INSERT INTO WORKOUT_EXERCISE (WORKOUT_ID, EXERCISE_ID, EXERCISE_DURATION, REST_DURATION) VALUES (?, ?, ?, ?)', [workoutID, exerciseId, exerciseTimeInput, restTimeInput]);
  }

  return workout;
}

// Retrieve all exercises from the database
export async function sendExercises() {
  const db = await dbConn;
  const exercises = await db.all("SELECT EXERCISE_NAME, DESCRIPTION FROM EXERCISE WHERE EXERCISE_NAME != 'Rest' ORDER BY EXERCISE_NAME ASC");
  return exercises;
}

// Retrieve exercises for a specific muscle group
export async function sendExercisesByMuscle(muscleName) {
  const db = await dbConn;
  const exercises = await db.all('SELECT EXERCISE_NAME, DESCRIPTION FROM EXERCISE JOIN EXERCISE_MUSCLE ON EXERCISE.EXERCISE_ID = EXERCISE_MUSCLE.EXERCISE_ID JOIN MUSCLE_GROUP ON EXERCISE_MUSCLE.MUSCLE_ID = MUSCLE_GROUP.MUSCLE_ID WHERE MUSCLE_NAME = ? ORDER BY EXERCISE_NAME ASC', muscleName);
  return exercises;
}
