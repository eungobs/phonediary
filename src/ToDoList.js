import React, { useState, useEffect } from 'react';
import './todolist.css'; // Your CSS file for styling

function ToDoList() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    // Update the clock every second
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="todolist-screen">
      <div className="calendar-container">
        <div className="calendar">
          {/* Calendar rendering code here */}
        </div>
        <div className="clock-container">
          <h2>Current Time:</h2>
          <div className="clock">{time.toLocaleTimeString()}</div>
        </div>
      </div>
      <div className="content-container">
        <div className="left-panel">
          <button className="profile-button">Profile</button>
          <button className="view-button">View</button>
          <div className="new-task">
            <a href="/new-task">New Task</a>
            <input type="text" placeholder="Task Name" />
          </div>
          <div className="notes">
            <h3>Notes</h3>
            <textarea placeholder="Notes and details"></textarea>
          </div>
          <div className="timer">
            <input type="time" />
          </div>
        </div>
        <div className="right-panel">
          <button className="bell">🔔</button>
          <button className="add-task">Add Task</button>
        </div>
      </div>
    </div>
  );
}

export default ToDoList;
