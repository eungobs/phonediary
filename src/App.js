import React, { useState } from 'react';
import Home from './Home';
import Register from './Register';
import Login from './Login';
import ToDoList from './ToDoList';
import Profile from './Profile';
import Logout from './Logout';
import './styles.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const navigate = (page) => {
    setCurrentPage(page);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('authToken');
    setCurrentPage('logout');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home navigate={navigate} />;
      case 'register':
        return <Register navigate={navigate} />;
      case 'login':
        return <Login navigate={navigate} />;
      case 'todo-list':
        return <ToDoList navigate={navigate} onLogout={handleLogout} />;
      case 'profile':
        return <Profile navigate={navigate} />;
      case 'logout':
        return <Logout onLogout={handleLogout} />;
      default:
        return <Home navigate={navigate} />;
    }
  };

  return (
    <div className="app">
      {renderPage()}
    </div>
  );
}

export default App;
