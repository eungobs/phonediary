// ReminderModal.js
import React from 'react';
import './ReminderModal.css';

function ReminderModal({ isOpen, onClose, task }) {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Reminder</h2>
        {task && (
          <div>
            <h3>{task.title}</h3>
            <p>{task.summary}</p>
            <p>{task.dateTime}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReminderModal;