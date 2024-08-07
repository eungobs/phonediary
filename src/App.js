import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Home from './Home';
import Register from './Register';
import Login from './Login';
import ToDoList from './ToDoList';
import Profile from './Profile';
import Logout from './Logout';
import ForgotPassword from './ForgotPassword';
import ChangePassword from './ChangePassword';

const wasmPath = '/db/todo.wasm'; 

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [db, setDb] = useState(null);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const setupDatabase = async () => {
      try {
        // Load and instantiate the WebAssembly module
        const response = await fetch(wasmPath);
        const buffer = await response.arrayBuffer();
        const { instance } = await WebAssembly.instantiate(buffer);
        setDb(instance.exports);

        // Fetch initial todos
        fetchTodos();
      } catch (error) {
        console.error('Error initializing database:', error);
      }
    };
    setupDatabase();
  }, []);

  const handleLogout = (navigate) => {
    setIsLoading(true);
    setTimeout(() => {
      saveDatabase();
      localStorage.removeItem('authToken');
      sessionStorage.removeItem('authToken');
      setIsLoading(false);
      navigate('/login');
    }, 2000);
  };

  const addTask = (title, description, priority) => {
    if (db) {
      try {
        const addTask = db._add_task;
        addTask(title, description, priority);
        fetchTodos();
      } catch (error) {
        console.error('Error adding task:', error);
      }
    }
  };

  const fetchTodos = () => {
    if (db) {
      try {
        const count = db._get_task_count();
        console.log('Number of tasks:', count);
        // Implement task fetching logic here
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    }
  };

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route 
            path="/todo-list" 
            element={<ToDoList 
              onLogout={handleLogout} 
              todos={todos} 
              addTask={addTask} 
            />} 
          />
          <Route path="/profile" element={<Profile />} />
          <Route 
            path="/logout" 
            element={<LogoutComponent 
              onLogout={handleLogout} 
              isLoading={isLoading} 
            />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

// Create a new LogoutComponent to use the useNavigate hook
function LogoutComponent({ onLogout, isLoading }) {
  const navigate = useNavigate();

  useEffect(() => {
    onLogout(navigate);
  }, [navigate, onLogout]);

  return (
    <div>
      {isLoading ? 'Logging out...' : 'Logged out'}
    </div>
  );
}

export default App;



