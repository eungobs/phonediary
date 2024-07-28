// server.js
const express = require('express');
const bodyParser = require('body-parser');
const {
  getProfileData,
  upsertProfileData,
  getTasks,
  upsertTaskData,
  deleteTask,
} = require('./database');

const app = express();
const PORT = 3001;

app.use(bodyParser.json());

app.get('/api/profile', (req, res) => {
  const profile = getProfileData();
  res.json(profile);
});

app.post('/api/profile', (req, res) => {
  upsertProfileData(req.body);
  res.sendStatus(200);
});

app.get('/api/tasks', (req, res) => {
  const tasks = getTasks();
  res.json(tasks);
});

app.post('/api/tasks', (req, res) => {
  upsertTaskData(req.body);
  res.sendStatus(200);
});

app.delete('/api/tasks/:id', (req, res) => {
  deleteTask(req.params.id);
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
