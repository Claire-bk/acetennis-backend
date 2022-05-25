import { db } from '../db/database.js';

// return event by date
export async function getEvent(date) {
    return db.execute('SELECT * FROM events WHERE date =?', [date])
    .then((result) => result[0][0]);
}

// return event by month
export async function getEventByMonth(month, year) {
    return db.execute('SELECT * FROM events WHERE MONTH(date)=? and YEAR(date)=?', [month, year])
    .then((result) => result[0]);
}

// Inset new event information into event database
export async function create(venueId, date) {
    return db.execute('INSERT INTO events (venueid, date) VALUES (?, ?)', [venueId, date])
    .then((result) => result[0].insertId);
}
