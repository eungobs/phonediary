import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';
import ActiveEmployees from './ActiveEmployees';
import AddEmployee from './AddEmployee';
import EditProfile from './EditProfile';
import Personnel from './Personnel';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('login'); // Initial page set to 'login'

  const renderPage = () => {
    switch (currentPage) {
      case 'signup':
        return <Signup navigate={setCurrentPage} />;
      case 'login':
        return <Login navigate={setCurrentPage} />;
      case 'active-employees':
        return <ActiveEmployees navigate={setCurrentPage} />;
      case 'add-employee':
        return <AddEmployee navigate={setCurrentPage} />;
      case 'edit-profile':
        return <EditProfile navigate={setCurrentPage} />;
      case 'personnel':
        return <Personnel navigate={setCurrentPage} />;
      default:
        return <Login navigate={setCurrentPage} />; // Default to 'login' page
    }
  };

  return <div className="App">{renderPage()}</div>;
}

export default App;
