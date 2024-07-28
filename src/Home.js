// Home.js
import React from 'react';
import './styles.css';

function Home({ navigate }) {
  return (
    <div className="home-screen">
      <div className="intro-text">
        📅 <span>Welcome to Your Ultimate Task Manager!</span> 🎯
        <div className="description">
          Organize Your Life with Ease<br />
          Transform how you manage your tasks and stay on top of your responsibilities with our intuitive To-Do List app. Whether you're juggling personal goals, work projects, or daily chores, we've got you covered!
        </div>
      </div>
      <div className="button-container">
        <button onClick={() => navigate('register')}>Register</button>
        <button onClick={() => navigate('login')}>Login</button>
        <button onClick={() => navigate('logout')}>Logout</button>
      </div>
    </div>
  );
}

export default Home;

