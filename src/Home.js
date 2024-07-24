import React, { useState, useEffect } from 'react';
import { initDatabase, getUsers } from './database';
import './styles.css';

function Home({ navigate }) {
  // eslint-disable-next-line no-unused-vars
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dbInstance = await initDatabase(); // dbInstance is used here
        const usersData = await getUsers(dbInstance);
        setUsers(usersData);
      } catch (error) {
        console.error('Error initializing or fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="home-screen">
      {/* Remove or comment out the following lines if you don't want them displayed */}
      {/* <h1>Home</h1> */}
      {/* {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.name} - {user.email}
            </li>
          ))}
        </ul>
      )} */}
      <button onClick={() => navigate('register')}>Register</button>
    </div>
  );
}

export default Home;



