const express = require('express');
const cors = require('cors');
const usersRouter = require('./routes/users');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/users', usersRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:3000`);
});
