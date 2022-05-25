import { db } from '../db/database.js';

// Get match information from matches database by eventId
export async function get(date) {
    return db.execute('SELECT * FROM matches WHERE date=?', [date])
    .then((result) => result[0]);
}

// Inset new match information into matches database
export async function create(courtNum, playerA1, playerA2, playerB1, playerB2, date, eventId) {
    return db.execute('INSERT INTO matches (courtNum, playerA1, playerA2, playerB1, playerB2, date, eventId) VALUES (?, ?, ?, ?, ?, ?, ?)', [courtNum, playerA1, playerA2, playerB1, playerB2, date, eventId])
    .then((result) => result[0].insertId);
}

// Update match information into matches database
export async function update(id, courtNum, playerA1, playerA2, playerB1, playerB2, date, scoreA, scoreB, eventId) {
    return db.execute('UPDATE matches SET courtNum=?, playerA1=?, playerA2=?, playerB1=?, playerB2=?, date=?, scoreA=?, scoreB=?, eventId=? WHERE id=?', [courtNum, playerA1, playerA2, playerB1, playerB2, date, scoreA, scoreB, eventId, id])
    .then((result) => result[0]);
}

// Delete match from matches database by match ID
export async function remove(id) {
    return db.execute('DELETE FROM matches WHERE id=?', [id])
}
