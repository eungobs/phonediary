const sqlite3 = require('sqlite3').verbose();

// Initialize SQLite database
const db = new sqlite3.Database('./database.db');

// Create Users table if not exists
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      surname TEXT,
      gender TEXT,
      dob TEXT,
      country TEXT,
      occupation TEXT,
      phoneNumber TEXT,
      email TEXT UNIQUE,
      interests TEXT,
      profileImage TEXT
    )
  `);
});

module.exports = db;
