import React, { useState, useRef, useEffect } from 'react';
import ReminderModal from './ReminderModal';
import { Button, TextField, Select, MenuItem, InputLabel, FormControl, Container, CssBaseline, Box, Typography, Paper, AppBar, Toolbar, IconButton } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Ensure axios is installed with npm install axios
import './todo.css';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function ToDoList({ onLogout }) {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [opened, setOpened] = useState(false);
  const [isReminderOpen, setIsReminderOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const taskTitle = useRef('');
  const taskSummary = useRef('');
  const taskDateTime = useRef('');
  const taskPriority = useRef('Medium');

  // Fetch tasks from the JSON server
  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:3000/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Create a new task and save it to the JSON server
  const createTask = async () => {
    const newTask = {
      id: Date.now(),
      title: taskTitle.current.value,
      summary: taskSummary.current.value,
      dateTime: taskDateTime.current.value,
      priority: taskPriority.current.value,
    };

    try {
      await axios.post('http://localhost:3000/tasks', newTask);
      setTasks([...tasks, newTask]);
      setOpened(false);
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  // Delete a task and remove it from the JSON server
  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:3000/tasks/${taskId}`);
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.summary.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().toISOString().slice(0, 16);
      tasks.forEach((task) => {
        if (task.dateTime === now) {
          setCurrentTask(task);
          setIsReminderOpen(true);
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [tasks]);

  const closeReminderModal = () => {
    setIsReminderOpen(false);
    setCurrentTask(null);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container component="main">
        <AppBar position="static">
          <Toolbar>
            <Button color="inherit" onClick={onLogout}>Logout</Button>
            <Button color="inherit" onClick={() => navigate('/profile')}>Profile</Button>
            <Button color="inherit" onClick={() => navigate('/')}>Home</Button>
          </Toolbar>
        </AppBar>
        <Box display="flex" flexDirection="column" alignItems="center">
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              endAdornment: <SearchIcon />,
            }}
          />
          {opened && (
            <Paper elevation={3} sx={{ padding: 2, margin: 2 }}>
              <Typography component="h2" variant="h5">New Task</Typography>
              <TextField inputRef={taskTitle} label="Title" fullWidth margin="normal" required />
              <TextField inputRef={taskSummary} label="Summary" fullWidth margin="normal" />
              <TextField inputRef={taskDateTime} label="Date and Time" type="datetime-local" fullWidth margin="normal" required InputLabelProps={{ shrink: true }} />
              <FormControl fullWidth margin="normal">
                <InputLabel>Priority</InputLabel>
                <Select inputRef={taskPriority} label="Priority" defaultValue="Medium">
                  <MenuItem value="Low">Low</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="High">High</MenuItem>
                </Select>
              </FormControl>
              <Box display="flex" justifyContent="space-between">
                <Button variant="contained" color="secondary" onClick={() => setOpened(false)}>Cancel</Button>
                <Button variant="contained" color="primary" onClick={createTask}>Create Task</Button>
              </Box>
            </Paper>
          )}
          <Box mt={2} width="100%">
            <Typography component="h1" variant="h4" gutterBottom>My Tasks</Typography>
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => (
                <Paper key={task.id} elevation={3} sx={{ padding: 2, margin: 2 }}>
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="h6">{task.title}</Typography>
                    <IconButton onClick={() => deleteTask(task.id)}><DeleteIcon /></IconButton>
                  </Box>
                  <Typography>{task.summary || 'No summary was provided for this task'}</Typography>
                  <Typography>Reminder set for: {task.dateTime}</Typography>
                  <Typography>Priority: {task.priority}</Typography>
                </Paper>
              ))
            ) : (
              <Typography>You have no tasks</Typography>
            )}
            <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => setOpened(true)}>New Task</Button>
          </Box>
        </Box>
        <ReminderModal isOpen={isReminderOpen} onClose={closeReminderModal} task={currentTask} />
      </Container>
    </ThemeProvider>
  );
}

export default ToDoList;
