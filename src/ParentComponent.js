// ParentComponent.js
import React from 'react';
import TodoList from './TodoList';

const ParentComponent = () => {
  const navigate = (path) => {
    window.location.href = path; // Adjust this as needed for routing
  };

  const onLogout = () => {
    // Example logout logic
    // Clear session or authentication token if needed
    window.location.href = '/login'; // Redirect to login page
  };

  return (
    <TodoList navigate={navigate} onLogout={onLogout} />
  );
};

export default ParentComponent;
