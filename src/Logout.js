// src/Logout.js

import React, { useEffect } from 'react';

const Logout = ({ onLogout }) => {
  useEffect(() => {
    // Perform logout actions
    if (onLogout) onLogout();
  }, [onLogout]);

  return (
    <div>
      <p>Logging out...</p>
    </div>
  );
};

export default Logout;

