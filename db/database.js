// Import mysql2 module so that we can talk to the database
import mysql  from 'mysql2';
import { config } from '../config.js'

// Create a connection to the database
const pool = mysql.createPool({
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database,
});

export const db = pool.promise();
