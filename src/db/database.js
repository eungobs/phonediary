// database.js
const Database = require('better-sqlite3');
const db = new Database('database.db');

function getProfileData() {
  const stmt = db.prepare('SELECT * FROM users WHERE id = 1');
  return stmt.get();
}

function upsertProfileData(userData) {
  const stmt = db.prepare(`
    INSERT INTO users (id, name, surname, gender, dob, country, occupation, phoneNumber, email, interests, profileImage, password)
    VALUES (:id, :name, :surname, :gender, :dob, :country, :occupation, :phoneNumber, :email, :interests, :profileImage, :password)
    ON CONFLICT(id) DO UPDATE SET
      name = excluded.name,
      surname = excluded.surname,
      gender = excluded.gender,
      dob = excluded.dob,
      country = excluded.country,
      occupation = excluded.occupation,
      phoneNumber = excluded.phoneNumber,
      email = excluded.email,
      interests = excluded.interests,
      profileImage = excluded.profileImage,
      password = excluded.password
  `);
  stmt.run(userData);
}

function getTasks() {
  const stmt = db.prepare('SELECT * FROM tasks');
  return stmt.all();
}

function upsertTaskData(taskData) {
  const stmt = db.prepare(`
    INSERT INTO tasks (title, summary, dateTime)
    VALUES (:title, :summary, :dateTime)
  `);
  stmt.run(taskData);
}

function deleteTask(taskId) {
  const stmt = db.prepare('DELETE FROM tasks WHERE id = :id');
  stmt.run({ id: taskId });
}

module.exports = {
  getProfileData,
  upsertProfileData,
  getTasks,
  upsertTaskData,
  deleteTask,
};
