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
    const profiles = await db.all('SELECT * FROM profile');
    return profiles;
};

export async function addProfile(){
    const db = await dbConn;
    const profiles = await db.all('INSERT INTO profile (USERNAME) VALUES (?)', [USERNAME]);
    return profiles;
};