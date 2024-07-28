import React from 'react';
import './styles.css';

function Logout({ onLogout }) {
  return (
    <div className="logout-container">
      <h2>Are you sure you want to logout?</h2>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}

export default Logout;
