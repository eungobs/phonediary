const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');

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
      profileImage TEXT,
      password TEXT
    )
  `);
});

// Route to create a new user
router.post('/', async (req, res) => {
  const { name, surname, gender, dob, country, occupation, phoneNumber, email, interests, profileImage, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
  db.run(`
    INSERT INTO users (name, surname, gender, dob, country, occupation, phoneNumber, email, interests, profileImage, password)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `, [name, surname, gender, dob, country, occupation, phoneNumber, email, interests, profileImage, hashedPassword], function(err) {
    if (err) {
      res.status(500).json({ error: 'Error adding user' });
    } else {
      res.status(201).json({ id: this.lastID });
    }
  });
});

// Route to get users by email
router.get('/', (req, res) => {
  const email = req.query.email;
  db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
    if (err) {
      res.status(500).json({ error: 'Error fetching users' });
    } else {
      res.json(row);
    }
  });
});

// Route to validate user login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
    if (err) {
      res.status(500).json({ error: 'Error fetching user' });
    } else if (user && await bcrypt.compare(password, user.password)) {
      res.status(200).json({ message: 'Login successful', user });
    } else {
      res.status(401).json({ error: 'Invalid email or password' });
    }
  });
});

module.exports = router;
