// Header.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthenticated, logout } from './auth';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header>
      <nav>
        <Link to="/">Home</Link>
        {isAuthenticated() ? (
          <>
            <Link to="/add-recipe">Add Recipe</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
