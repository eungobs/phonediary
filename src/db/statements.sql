-- statements.sql
CREATE TABLE IF NOT EXISTS users (
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
  profileImage TEXT,
  password TEXT
);

CREATE TABLE IF NOT EXISTS tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT,
  summary TEXT,
  dateTime TEXT
);
