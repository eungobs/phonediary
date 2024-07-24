import React, { useState } from 'react';
import Home from './Home';
import Register from './Register';
import Login from './Login';
import ToDoList from './ToDoList';
import './styles.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const navigate = (page) => {
    setCurrentPage(page);
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
        return <ToDoList navigate={navigate} />;
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
**/git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/eungobs/phonediary.git
git push 
