import React, { useState } from 'react';
import { addUser, initDatabase } from './database';
import './register.css';

function Register({ navigate }) {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    gender: '',
    dateOfBirth: '',
    country: '',
    occupation: '',
    phoneNumber: '',
    email: '',
    interests: '',
    photo: null,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePhotoChange = (event) => {
    setFormData({
      ...formData,
      photo: event.target.files[0],
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const db = await initDatabase();
      await addUser(db, formData.name, formData.email);
      // Add other form data handling here
      alert('User registered successfully!');
      navigate('login'); // Redirect to login page after successful registration
    } catch (error) {
      console.error('Error registering user:', error);
      alert('Failed to register user');
    }
  };

  return (
    <div className="register-screen">
      {/* Removed the logo image */}
      <h2 className="diary-text">Diary in your pocket</h2>
      <h1>Register Here</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="surname"
          placeholder="Surname"
          value={formData.surname}
          onChange={handleChange}
          required
        />
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <input
          type="date"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="country"
          placeholder="Country"
          value={formData.country}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="occupation"
          placeholder="Occupation"
          value={formData.occupation}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phoneNumber"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="interests"
          placeholder="Interests"
          value={formData.interests}
          onChange={handleChange}
          required
        />
        <input
          type="file"
          name="photo"
          onChange={handlePhotoChange}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
