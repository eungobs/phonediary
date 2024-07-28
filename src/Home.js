import React, { useEffect } from 'react';
import { initDatabase } from './database';
import './styles.css';

function Home({ navigate }) {
  useEffect(() => {
    const fetchData = async () => {
      try {
        await initDatabase();
      } catch (error) {
        console.error('Error initializing or fetching data:', error);
      }
    };

    fetchData();
  }, []);

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
