import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Register from './Register';
import Login from './Login';
import ToDoList from './ToDoList';
import Profile from './Profile';
import Logout from './Logout';
import UserList from './UserList'; // Import UserList component
import EditUser from './EditUser'; // Import EditUser component

function App() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = () => {
    setIsLoading(true);
    setTimeout(() => {
      localStorage.removeItem('authToken');
      sessionStorage.removeItem('authToken');
      setIsLoading(false);
      // Navigate to the login page after logging out
      window.location.href = '/login';
    }, 2000); // Simulating an API call
  };

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/todo-list" element={<ToDoList onLogout={handleLogout} />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/logout" element={<Logout onLogout={handleLogout} isLoading={isLoading} />} />
          <Route path="/users" element={<UserList />} /> {/* Route for UserList */}
          <Route path="/edit-user/:id" element={<EditUser />} /> {/* Route for EditUser */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
