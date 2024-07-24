import React, { useState, useEffect } from 'react';
import { initDatabase, getUsers } from './database';
import './styles.css';

function Profile() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dbInstance = await initDatabase();
        const usersData = await getUsers(dbInstance);
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="profile-screen">
      <h1>Profiles</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Profile;
