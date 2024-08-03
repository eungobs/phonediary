const fs = require('fs');

// Load existing data
let rawData = fs.readFileSync('db.json');
let data = JSON.parse(rawData);

// Function to generate a unique ID
const generateUniqueId = (collection) => {
  const ids = collection.map(item => item.id);
  return ids.length ? Math.max(...ids) + 1 : 1;
};

// Function to add a new user
const addUser = (name, email, phone, password) => {
  const newUser = {
    id: generateUniqueId(data.users),
    name: name,
    email: email,
    phone: phone,
    password: password
  };
  data.users.push(newUser);
};

// Function to add a new task
const addTask = (title, summary, dateTime, priority) => {
  const newTask = {
    id: generateUniqueId(data.tasks),
    title: title,
    summary: summary,
    dateTime: dateTime,
    priority: priority
  };
  data.tasks.push(newTask);
};

// Add new users
addUser("Aki Mabasa", "akanie@gmail.com", "0111111111", "password789");
addUser("Hlulani Mabasa", "hlueam@gmail.com", "0222222222", "password101");

// Add new tasks
addTask("Complete Homework", "Finish math and science homework.", "2024-01-04T15:00", "High");
addTask("Grocery Shopping", "Buy fruits and vegetables.", "2024-01-05T10:00", "Medium");

// Save updated data back to the file
fs.writeFileSync('db.json', JSON.stringify(data, null, 2));

console.log('New users and tasks added successfully.');
