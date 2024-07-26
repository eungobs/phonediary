import React, { useState } from 'react';
import Home from './Home';
import Register from './Register';
import Login from './Login';
import Logout from './Logout';
import ToDoList from './ToDoList';
import Profile from './Profile';
import './styles.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const navigate = (page) => {
    setCurrentPage(page);
  };

  const handleLogout = () => {
    // Clear any authentication data if necessary
    localStorage.removeItem('authToken'); // Adjust based on your storage mechanism
    sessionStorage.removeItem('authToken'); // Adjust based on your storage mechanism

    // Redirect to logout page
    setCurrentPage('logout');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home navigate={navigate} handleLogout={handleLogout} />;
      case 'register':
        return <Register navigate={navigate} />;
      case 'login':
        return <Login navigate={navigate} />;
      case 'todo-list':
        return <ToDoList navigate={navigate} onLogout={handleLogout} />;
      case 'profile':
        return <Profile />;
      case 'logout':
        return <Logout onLogout={() => window.location.href = 'https://www.yourhomepage.com'} />;
      default:
        return <Home navigate={navigate} handleLogout={handleLogout} />;
    }
  };

  return (
    <div className="app">
      {renderPage()}
    </div>
  );
}

export default App;
