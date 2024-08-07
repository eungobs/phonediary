import React, { useState, useEffect } from 'react';
import initSqlJs from 'sql.js';
import { Container, Typography, TextField, Button, List, ListItem, ListItemText, IconButton, Select, MenuItem, InputLabel, FormControl, Box, AppBar, Toolbar } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import UndoIcon from '@mui/icons-material/Undo';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './todo.css';

// Function to initialize the SQLite database
export const initializeDatabase = async () => {
  const SQL = await initSqlJs({
    locateFile: file => `https://sql.js.org/dist/${file}`,
  });
  const db = new SQL.Database();
  db.run(`CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    task TEXT,
    completed BOOLEAN,
    priority TEXT
  )`);
  return db;
};

// TodoList component
const TodoList = () => {
  const navigate = useNavigate(); // Use useNavigate for navigation
  const [db, setDb] = useState(null);
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [searchTerm, setSearchTerm] = useState('');

  // Setup database and load todos when component mounts
  useEffect(() => {
    const setupDb = async () => {
      const db = await initializeDatabase();
      setDb(db);
      loadTodos(db);
    };
    setupDb();
  }, []);

  // Function to load todos from the database
  const loadTodos = (db) => {
    const stmt = db.prepare('SELECT * FROM todos');
    const rows = [];
    while (stmt.step()) {
      rows.push(stmt.getAsObject());
    }
    setTodos(rows);
  };

  // Function to add a new todo
  const addTodo = () => {
    if (newTask.trim()) {
      db.run('INSERT INTO todos (task, completed, priority) VALUES (?, ?, ?)', [newTask, false, priority]);
      loadTodos(db);
      setNewTask('');
      setPriority('Medium');
    }
  };

  // Function to toggle completion status of a todo
  const toggleTodo = (id, completed) => {
    db.run('UPDATE todos SET completed = ? WHERE id = ?', [!completed, id]);
    loadTodos(db);
  };

  // Function to delete a todo
  const deleteTodo = (id) => {
    db.run('DELETE FROM todos WHERE id = ?', [id]);
    loadTodos(db);
  };

  // Function to filter todos based on search term
  const filteredTodos = todos.filter(todo =>
    todo.task.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container className="todo-container">
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" onClick={() => navigate('/login')}>Logout</Button>
          <Button color="inherit" onClick={() => navigate('/profile')}>Profile</Button>
          <Button color="inherit" onClick={() => navigate('/')}>Home</Button>
        </Toolbar>
      </AppBar>
      <Typography variant="h4" gutterBottom>
        To-Do List
      </Typography>
      <TextField
        label="Search tasks"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        margin="normal"
        InputProps={{
          endAdornment: <SearchIcon />,
        }}
      />
      <Box display="flex" flexDirection="column" gap={2}>
        <TextField
          label="New task"
          variant="outlined"
          fullWidth
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Priority</InputLabel>
          <Select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            label="Priority"
          >
            <MenuItem value="Low">Low</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="High">High</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          onClick={addTodo}
          fullWidth
        >
          Add Task
        </Button>
      </Box>
      <List>
        {filteredTodos.map(todo => (
          <ListItem
            key={todo.id}
            secondaryAction={
              <>
                <IconButton edge="end" onClick={() => toggleTodo(todo.id, todo.completed)}>
                  {todo.completed ? <UndoIcon /> : <CheckCircleIcon />}
                </IconButton>
                <IconButton edge="end" onClick={() => deleteTodo(todo.id)}>
                  <DeleteIcon />
                </IconButton>
              </>
            }
            className={`task-card ${todo.priority.toLowerCase()}`}
          >
            <ListItemText
              primary={todo.task}
              secondary={todo.completed ? "Completed" : "Pending"}
              primaryTypographyProps={{ style: { textDecoration: todo.completed ? 'line-through' : 'none' } }}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default TodoList;








