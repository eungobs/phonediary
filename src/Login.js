import React, { useState } from 'react';
import './login.css';

function Login({ navigate }) {
  const [formData, setFormData] = useState({
    name: '',
    password: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform login logic here
    // If login is successful, navigate to the To-Do List page
    alert('Login successful!');
    navigate('todo-list'); // Match the route name exactly as defined in App.js
  };

  return (
    <div className="login-screen">
      <div className="diary-text">Diary in your pocket</div>
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name & Surname"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
