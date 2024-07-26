import React, { useState } from 'react';
import { initDatabase, addUser } from './database'; // Ensure addUser is imported

function Register({ navigate }) {
  const [userData, setUserData] = useState({
    name: '',
    surname: '',
    gender: '',
    dob: '',
    country: '',
    occupation: '',
    phoneNumber: '',
    email: '',
    interests: '',
    profileImage: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const db = await initDatabase();
      await addUser(db, userData);
      navigate('login'); // Redirect to login after registration
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={userData.name} onChange={handleChange} placeholder="Name" required />
        <input type="text" name="surname" value={userData.surname} onChange={handleChange} placeholder="Surname" required />
        <input type="text" name="gender" value={userData.gender} onChange={handleChange} placeholder="Gender" required />
        <input type="date" name="dob" value={userData.dob} onChange={handleChange} placeholder="Date of Birth" required />
        <input type="text" name="country" value={userData.country} onChange={handleChange} placeholder="Country" required />
        <input type="text" name="occupation" value={userData.occupation} onChange={handleChange} placeholder="Occupation" required />
        <input type="tel" name="phoneNumber" value={userData.phoneNumber} onChange={handleChange} placeholder="Phone Number" required />
        <input type="email" name="email" value={userData.email} onChange={handleChange} placeholder="Email" required />
        <input type="text" name="interests" value={userData.interests} onChange={handleChange} placeholder="Interests" required />
        <input type="file" accept="image/*" onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
              setUserData((prevData) => ({
                ...prevData,
                profileImage: reader.result,
              }));
            };
            reader.readAsDataURL(file);
          }
        }} />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
