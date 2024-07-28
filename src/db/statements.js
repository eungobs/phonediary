// statements.js
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

const dbFile = './database.db';
const exists = fs.existsSync(dbFile);

const db = new sqlite3.Database(dbFile);

db.serialize(() => {
  if (!exists) {
    const createStatements = fs.readFileSync('./statements.sql', 'utf8');
    db.exec(createStatements, (err) => {
      if (err) {
        console.error('Error creating tables:', err);
      } else {
        console.log('Tables created successfully');
      }
    });
  }
});

db.close();
