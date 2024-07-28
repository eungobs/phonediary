// ReminderModal.js

import React from 'react';
import './styles.css'; 

function ReminderModal({ isOpen, onClose, task }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Task Reminder</h2>
        <p>It's time for your task:</p>
        <strong>{task.title}</strong>
        <p>{task.summary || 'No summary was provided for this task'}</p>
        <div className="modal-actions">
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default ReminderModal;
