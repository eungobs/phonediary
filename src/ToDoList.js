import React, { useState, useEffect } from 'react';
import './ToDoList.css';

// Sample logout function; replace with your actual implementation
const logout = () => {
  // Clear any authentication state or tokens here
  alert('Logged out');
  // Redirect to login page or home page
  window.location.href = '/login'; // Adjust the path as needed
};

const ToDoList = () => {
  const [time, setTime] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [notes, setNotes] = useState('');
  const [taskTime, setTaskTime] = useState('');

  useEffect(() => {
    // Update the clock every second
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Automatically adjust to the next month if needed
    const today = new Date();
    if (today.getMonth() !== currentMonth.getMonth() || today.getFullYear() !== currentMonth.getFullYear()) {
      setCurrentMonth(new Date(today.getFullYear(), today.getMonth(), 1));
    }
  }, [currentMonth]);

  // Helper function to get the days in a month
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Generate the calendar grid
  const generateCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth.getFullYear(), currentMonth.getMonth());
    const startDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
    const calendarDays = [];

    // Empty days before the start of the month
    for (let i = 0; i < startDay; i++) {
      calendarDays.push(null);
    }

    // Actual days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      calendarDays.push(i);
    }

    // Fill the rest of the grid to complete the last week
    while (calendarDays.length % 7 !== 0) {
      calendarDays.push(null);
    }

    return calendarDays;
  };

  const handlePreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)));
  };

  const handleAddTask = () => {
    if (newTask.trim() !== '' && selectedDate !== null) {
      setTasks([
        ...tasks,
        { 
          date: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), selectedDate),
          task: newTask,
          notes,
          time: taskTime
        },
      ]);
      setNewTask('');
      setNotes('');
      setTaskTime('');
    }
  };

  return (
    <div className="todo-list-container">
      <button className="logout-button" onClick={logout}>Logout</button>
      <div className="calendar-container">
        <div className="month-year">
          <button className="nav-button" onClick={handlePreviousMonth}>{'<'}</button>
          {`${currentMonth.toLocaleString('default', { month: 'long' })} ${currentMonth.getFullYear()}`}
          <button className="nav-button" onClick={handleNextMonth}>{'>'}</button>
        </div>
        <div className="calendar">
          <div className="calendar-header">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>
          <div className="calendar-dates">
            {generateCalendar().map((day, index) => (
              <div
                key={index}
                className={`date ${day === new Date().getDate() && currentMonth.getMonth() === new Date().getMonth() && currentMonth.getFullYear() === new Date().getFullYear() ? 'current-date' : ''} ${day === selectedDate ? 'selected' : ''}`}
                onClick={() => setSelectedDate(day)}
              >
                {day}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="tasks-container">
        <div className="add-task-form">
          <input
            type="text"
            placeholder="Add new task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <textarea
            placeholder="Notes..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>
          <input
            type="time"
            value={taskTime}
            onChange={(e) => setTaskTime(e.target.value)}
          />
          <button onClick={handleAddTask}>Add Task</button>
        </div>
        <div className="current-time">Current Time: {time.toLocaleTimeString()}</div>
        {tasks
          .filter(
            (task) =>
              task.date.getDate() === selectedDate &&
              task.date.getMonth() === currentMonth.getMonth() &&
              task.date.getFullYear() === currentMonth.getFullYear()
          )
          .map((task, index) => (
            <div key={index} className="task">
              <div className="task-details">
                <div className="task-title">{task.task}</div>
                <div className="task-time">Time: {task.time}</div>
                <div className="task-notes">Notes: {task.notes}</div>
              </div>
            </div>
          ))}
        {tasks.length === 0 && <div className="no-tasks">No tasks for this day</div>}
      </div>
    </div>
  );
};

export default ToDoList;

