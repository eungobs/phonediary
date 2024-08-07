import React, { useState } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './logout.css';

function Logout({ onLogout }) {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true); // Set loading state to true

      // Simulate server request delay
      // Remove or adjust setTimeout as needed
      setTimeout(() => {
        onLogout(); // Call the onLogout function
        setLoading(false); // Reset loading state
        navigate('/login'); // Navigate to login page
      }, 2000); // Adjust timeout as needed
    } catch (error) {
      console.error('Error logging out:', error);
      setLoading(false); // Reset loading state in case of error
    }
  };

  return (
    <div className="logout-container">
      {isLoading ? (
        <div className="loader">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      ) : (
        <>
          <h2>Are you sure you want to logout?</h2>
          <Button variant="contained" color="primary" onClick={handleLogout}>Logout</Button>
        </>
      )}
    </div>
  );
}

export default Logout;
