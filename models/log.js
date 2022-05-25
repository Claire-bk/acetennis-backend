import { db } from '../db/database.js';

// Insert new log into log database
export async function log(userId, ip, role, method) {
    return db.execute('INSERT INTO logs (userId, ip, role, timeStamp, method) VALUES (?, ?, ?, ?, ?)', [userId, ip, role, new Date(), method])
    .then(() => console.log('log saved'));
}