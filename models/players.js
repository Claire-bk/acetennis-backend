import { db } from '../db/database.js';

// Get all player's name and level info
export async function getAll(eventId) {
    return db.execute('SELECT user.id, name, level FROM users as user JOIN players as player ON user.id = player.userId WHERE eventid=?', [eventId])
    .then((result) => result[0]);
}

// Get play info by id
export async function getById(id) {
    return db.execute('SELECT userId, name, level FROM users WHERE id =?', [id])
    .then((result) => result[0]);
}

// Get player info by level
export async function getByLevel(level) {
    return db.execute('SELECT name FROM users as user JOIN players as player ON user.id = player.userId WHERE level=?', [level])
    .then((result) => result[0]);
}

// create new  player info
export async function create(userId, eventId) {
    return db.execute('INSERT INTO players (userId, eventId) VALUES (?, ?)', [userId, eventId])
    .then((result) => result[0].insertId);
}

// delete player 
export async function remove(id) {
    return db.execute('DELETE FROM players WHERE id=?', [id]);
}

// search if user already exist
export async function exist(userId, eventId) {
    return db.execute('SELECT * FROM players WHERE userId =? and eventId=?', [userId, eventId])
    .then((result) => result[0][0]);
}
