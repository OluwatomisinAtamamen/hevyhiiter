import * as db from './dbConnection.js';

import express from 'express';
// create an Express.js server (aka app)
const app = express();

// Serve files from the 'client' directory
app.use(express.static('client'));

async function getProfiles(req, res) {
    res.json(await db.sendProfiles());
    console.log();
}

async function postProfile(req, res) {
    const profiles = await mb.addProfile(req.body.USERNAME);
    res.json(profiles);
}

app.get('/data/profiles', getProfiles);
app.post('/data/profiles', express.json(), postProfile);

// make the server available on the network
app.listen(8080);
