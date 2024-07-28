import React, { useState, useRef, useEffect } from 'react';
import ReminderModal from './ReminderModal'; // Import the ReminderModal component
import './styles.css';

function ToDoList({ navigate, onLogout }) {
  const [tasks, setTasks] = useState([]);
  const [opened, setOpened] = useState(false);
  const [isReminderOpen, setIsReminderOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  const taskTitle = useRef('');
  const taskSummary = useRef('');
  const taskDateTime = useRef('');

  const createTask = () => {
    const newTask = {
      title: taskTitle.current.value,
      summary: taskSummary.current.value,
      dateTime: taskDateTime.current.value,
    };
    setTasks([...tasks, newTask]);
    saveTasks([...tasks, newTask]);
    setOpened(false);
  };

  const deleteTask = (index) => {
    const clonedTasks = [...tasks];
    clonedTasks.splice(index, 1);
    setTasks(clonedTasks);
    saveTasks(clonedTasks);
  };

  const loadTasks = () => {
    const loadedTasks = localStorage.getItem('tasks');
    const tasks = JSON.parse(loadedTasks);
    if (tasks) {
      setTasks(tasks);
    }
  };

  const saveTasks = (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  useEffect(() => {
    loadTasks();
  }, []);

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
            <div className='modal-actions'>
              <button onClick={() => setOpened(false)}>Cancel</button>
              <button onClick={createTask}>Create Task</button>
            </div>
          </div>
        </div>
      )}
      <div className='tasks-container'>
        <h1>My Tasks</h1>
        {tasks.length > 0 ? (
          tasks.map((task, index) => (
            <div className='task-card' key={index}>
              <div className='task-header'>
                <strong>{task.title}</strong>
                <button className='delete-button' onClick={() => deleteTask(index)}>Delete</button>
              </div>
              <p>{task.summary || 'No summary was provided for this task'}</p>
              <p>Reminder set for: {task.dateTime}</p>
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
