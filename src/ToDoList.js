import React, { useState, useRef, useEffect } from 'react';
import ReminderModal from './ReminderModal';
import './todo.css';

function ToDoList({ navigate, onLogout }) {
  const [tasks, setTasks] = useState([]);
  const [opened, setOpened] = useState(false);
  const [isReminderOpen, setIsReminderOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const taskTitle = useRef('');
  const taskSummary = useRef('');
  const taskDateTime = useRef('');
  const taskPriority = useRef('Medium');

  // Mock fetch tasks function
  const fetchTasks = () => {
    
    const mockTasks = [
      { id: 1, title: 'Sample Task', summary: 'This is a sample task.', dateTime: '2024-01-01T12:00', priority: 'Medium' },
      { id: 2, title: 'Another Task', summary: 'This is another task.', dateTime: '2024-01-02T12:00', priority: 'High' }
      
    ];
    setTasks(mockTasks);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Create a new task function
  const createTask = () => {
    const newTask = {
      id: Date.now(), 
      title: taskTitle.current.value,
      summary: taskSummary.current.value,
      dateTime: taskDateTime.current.value,
      priority: taskPriority.current.value,
    };

    console.log('Creating task:', newTask); 

    setTasks([...tasks, newTask]);
    setOpened(false); 
  };

  // Delete a task function
  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  // Search function
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
    <div className='ToDoList'>
      <div className='header-buttons'>
        <button className='logout-button' onClick={onLogout}>Logout</button>
        <button className='profile-button' onClick={() => navigate('profile')}>Profile</button>
        <button className='home-button' onClick={() => navigate('Home')}>Home</button>
      </div>
      <div className='search-bar'>
        <input
          type='text'
          placeholder='Search tasks...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {opened && (
        <div className='modal'>
          <div className='modal-content'>
            <h2>New Task</h2>
            <label>Title</label>
            <input ref={taskTitle} placeholder='Task Title' required />
            <label>Summary</label>
            <input ref={taskSummary} placeholder='Task Summary' />
            <label>Date and Time</label>
            <input type='datetime-local' ref={taskDateTime} required />
            <label>Priority</label>
            <select ref={taskPriority} required>
              <option value='Low'>Low</option>
              <option value='Medium'>Medium</option>
              <option value='High'>High</option>
            </select>
            <div className='modal-actions'>
              <button onClick={() => setOpened(false)}>Cancel</button>
              <button onClick={createTask}>Create Task</button>
            </div>
          </div>
        </div>
      )}
      <div className='tasks-container'>
        <h1>My Tasks</h1>
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <div className={`task-card ${task.priority.toLowerCase()}`} key={task.id}>
              <div className='task-header'>
                <strong>{task.title}</strong>
                <button className='delete-button' onClick={() => deleteTask(task.id)}>Delete</button>
              </div>
              <p>{task.summary || 'No summary was provided for this task'}</p>
              <p>Reminder set for: {task.dateTime}</p>
              <p>Priority: {task.priority}</p>
            </div>
          ))
        ) : (
          <p>You have no tasks</p>
        )}
        <button className='new-task-button' onClick={() => setOpened(true)}>New Task</button>
      </div>
      <ReminderModal
        isOpen={isReminderOpen}
        onClose={closeReminderModal}
        task={currentTask}
      />
    </div>
  );
}

export default ToDoList;



