// src/db.js
import initSqlJs from 'sql.js';

let db;

export const initializeDatabase = async () => {
  const SQL = await initSqlJs({
    locateFile: file => `https://sql.js.org/dist/${file}`,
  });
  db = new SQL.Database();
  db.run(`CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    task TEXT,
    completed BOOLEAN
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    surname TEXT,
    gender TEXT,
    dob TEXT,
    country TEXT,
    occupation TEXT,
    phoneNumber TEXT,
    email TEXT,
    interests TEXT,
    profileImage TEXT
  )`);
  loadDatabase(); // Load the database from local storage if available
  return db;
};

// Save database to local storage
export const saveDatabase = () => {
  if (db) {
    const data = db.export();
    localStorage.setItem('db', JSON.stringify(data));
  }
};

// Load database from local storage
export const loadDatabase = () => {
  if (db) {
    const data = JSON.parse(localStorage.getItem('db'));
    if (data) {
      db = new SQL.Database(new Uint8Array(data));
    }
  }
};

// Add user function
export const addUser = (userData) => {
  if (db) {
    const { name, surname, gender, dob, country, occupation, phoneNumber, email, interests, profileImage } = userData;
    db.run('INSERT INTO users (name, surname, gender, dob, country, occupation, phoneNumber, email, interests, profileImage) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
      [name, surname, gender, dob, country, occupation, phoneNumber, email, interests, profileImage]);
    saveDatabase(); // Save changes to local storage
  }
};

// Existing functions
export const fetchTodos = () => {
  if (db) {
    const stmt = db.prepare('SELECT * FROM todos');
    const rows = [];
    while (stmt.step()) {
      rows.push(stmt.getAsObject());
    }
    return rows;
  }
  return [];
};

export const addTodo = (task) => {
  if (db) {
    db.run('INSERT INTO todos (task, completed) VALUES (?, ?)', [task, false]);
    saveDatabase(); // Save changes to local storage
  }
};

export const toggleTodo = (id, completed) => {
  if (db) {
    db.run('UPDATE todos SET completed = ? WHERE id = ?', [!completed, id]);
    saveDatabase(); // Save changes to local storage
  }
};

export const deleteTodo = (id) => {
  if (db) {
    db.run('DELETE FROM todos WHERE id = ?', [id]);
    saveDatabase(); // Save changes to local storage
  }
};

export const fetchUserProfile = (id) => {
  if (db) {
    const stmt = db.prepare('SELECT * FROM users WHERE id = ?');
    stmt.bind([id]);
    if (stmt.step()) {
      return stmt.getAsObject();
    }
  }
  return null;
};

export const updateUserProfile = (id, userData) => {
  if (db) {
    const { name, surname, gender, dob, country, occupation, phoneNumber, email, interests, profileImage } = userData;
    db.run('UPDATE users SET name = ?, surname = ?, gender = ?, dob = ?, country = ?, occupation = ?, phoneNumber = ?, email = ?, interests = ?, profileImage = ? WHERE id = ?', 
      [name, surname, gender, dob, country, occupation, phoneNumber, email, interests, profileImage, id]);
    saveDatabase(); // Save changes to local storage
  }
};
