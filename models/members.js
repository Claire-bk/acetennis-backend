import { db } from '../db/database.js';

// Get members information from users database
export async function getAll() {
    return db.execute('SELECT id, username, name, level FROM users')
    .then((result) => result[0]);
}

// Get user information from users database by userId
export async function findById(id) {
    return db.execute('SELECT * FROM users WHERE id=?', [id])
    .then((result) => result[0][0]);
}

// Get members information from users database by level
export async function getByLevel(level) {
    return db.execute('SELECT id, username, name, level FROM users WHERE level=?', [level])
    .then((result) => result[0]);
}

// Update member information into user database
export async function update(id, level) {
    return db.execute('UPDATE users SET level=? WHERE id=?', [level, id])
    .then((result) => result[0]);
}

// Delete member from user database by user ID
export async function remove(id) {
    return db.execute('DELETE FROM users WHERE id=?', [id])
}