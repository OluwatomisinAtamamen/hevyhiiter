import * as db from './dbConnection.js';

import express from 'express';
// create an Express.js server (aka app)
const app = express();

// Serve files from the 'client' directory
app.use(express.static('client'));

async function getProfiles(req, res) {
    res.json(await db.sendProfiles());
}

async function postProfile(req, res) {
    const username = await db.addProfile(req.body.username);
    res.json(username);
}

async function getWorkouts(req, res) {
    const workouts = await db.sendWorkouts(req.params.id);
    if (workouts) {
        res.json(workouts);
    } else {
        res.status(404).send('No match for that ID.');
    }
}

app.get('/data/profiles', getProfiles);
app.post('/data/profiles', express.json(), postProfile);
app.get('/data/profiles/workouts:id', getWorkouts);

// make the server available on the network
app.listen(8080);
