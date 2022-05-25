import { db } from '../db/database.js'

// Get user information from users database by username
export async function findByUsername(username) {
    return db.execute('SELECT * FROM users WHERE username=?', [username])
    .then((result) => result[0][0]);
}

// Get user information from users database by userId
export async function findById(id) {
    return db.execute('SELECT * FROM users WHERE id=?', [id])
    .then((result) => result[0][0]);
}

// Insert user information into users database
export async function createUser(user) {
    const { username, password, name, email, level, role } = user;
    return db.execute(
        'INSERT INTO users (username, password, name, email, level, role) VALUES (?,?,?,?,?,?)', 
        [ username, password, name, email, level, role]
    ).then((result) => result[0].insertId);
}

export async function countUser() {
    return db.execute('SELECT COUNT(*) FROM users')
    .then((result) => result[0][0]['COUNT(*)']);    
}