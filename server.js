import * as db from './dbConnection.js';
import express from 'express';
import path from 'path';

// create an Express.js server (aka app)
const app = express();

// Serve files from the 'client' directory
app.use(express.static('client'));

/**
 * Sends all profiles from the database.
 *
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 */
async function getProfiles(req, res) {
  res.json(await db.sendProfiles());
}

async function postProfile(req, res) {
  const result = await db.addProfile(req.body.username);
  res.json({ PROFILE_ID: result.lastID });
}

/**
 * Sends all workouts for a specific profile from the database.
 *
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 */
async function getWorkouts(req, res) {
  const workouts = await db.sendWorkouts(req.params.id);
  if (workouts) {
    res.json(workouts);
  } else {
    res.status(404).send('No match for that ID.');
  }
}

/**
 * Adds a new workout to the database.
 *
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 */
async function postWorkouts(req, res) {
  try {
    console.log('Received editWorkoutId:', req.body.editWorkoutId); // Log the received editWorkoutId

    const result = await db.addWorkout(
      req.params.id,
      req.body.workoutName,
      req.body.workoutDesc,
      req.body.workoutExercises,
      req.body.totalDuration,
      req.body.editWorkoutID,
    );
    res.json({ WORKOUT_ID: result.workoutId });
  } catch (error) {
    console.log('Internal Server Error', error);
  }
}

/**
 * Deletes a workout from the database.
 *
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 */
async function deleteWorkout(req, res) {
  const result = await db.deleteWorkoutFromDatabase(req.params.userId, req.params.workoutId);
  res.json(result);
}

/**
 * Sends all exercises from the database.
 *
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 */
async function getExercises(req, res) {
  res.json(await db.sendExercises());
}

/**
 * Sends all exercises for a specific muscle group from the database.
 *
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 */
async function getExercisesByMuscle(req, res) {
  res.json(await db.sendExercisesByMuscle(req.params.muscleName));
}

app.get('/data/profiles', getProfiles);
app.post('/data/profiles', express.json(), postProfile);
app.get('/data/profiles/workouts/:id', getWorkouts);
app.post('/data/profiles/workouts/:id', express.json(), postWorkouts);
app.delete('/data/profiles/workouts/:userId/:workoutId', deleteWorkout);
app.get('/data/exercises/all', getExercises);
app.get('/data/exercises/by-muscle/:muscleName', getExercisesByMuscle);

app.get('/*', (req, res) => {
  res.sendFile(path.resolve('client', 'index.html'));
});

// make the server available on the network
app.listen(8080);
