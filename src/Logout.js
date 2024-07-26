import React, { useEffect } from 'react';
import './Logout.css'; // Import the CSS file

const Logout = ({ onLogout }) => {
  useEffect(() => {
    // Perform logout actions
    if (onLogout) onLogout();
  }, [onLogout]);

  return (
    <div className="logout-screen">
      <p>Logging out...</p>
    </div>
  );
};

export default Logout;

