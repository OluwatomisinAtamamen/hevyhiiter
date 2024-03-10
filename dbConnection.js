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

export async function sendProfiles(){
    const db = await dbConn;
    const profiles = await db.all('SELECT * FROM PROFILE');
    return profiles;
};

export async function addProfile(username){
    const db = await dbConn;
    const profiles = await db.run('INSERT INTO PROFILE (USERNAME) VALUES (?)', [username]);
    return profiles;
};

export async function sendWorkouts(id){
    const db = await dbConn;
    const workouts = await db.all('SELECT WORKOUT_NAME, DESCRIPTION FROM PROFILE JOIN WORKOUT ON PROFILE.ID = WORKOUT.PROFILE_ID WHERE PROFILE_ID = ?', id);
    return workouts;
}