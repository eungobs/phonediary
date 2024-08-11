import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Registration from './Registration';
import Login from './Login';
import AddRecipe from './AddRecipe';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add-recipe" element={<AddRecipe />} />
      </Routes>
    </Router>
  );
}

export default App;

