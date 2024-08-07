// src/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, CircularProgress, Typography, Box } from '@mui/material';
import './register.css';
import { addUser } from './db'; // Import the function to add a user

function Register() {
  const navigate = useNavigate();
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
    profileImage: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Save user data without validation for simplicity
    setLoading(true);
    try {
      addUser(userData); // Add the user to the database
      navigate('/login'); // Navigate to login page upon successful registration
    } catch (error) {
      console.error('Error during registration:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-screen">
      {loading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}
      <Typography variant="h4" gutterBottom>
       
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', width: '100%', maxWidth: '1000px', maxHeight: '700px', overflowY: 'auto' }}>
        <TextField
          label="Name"
          name="name"
          value={userData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Surname"
          name="surname"
          value={userData.surname}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Gender"
          name="gender"
          value={userData.gender}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Date of Birth"
          name="dob"
          type="date"
          value={userData.dob}
          onChange={handleChange}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          required
        />
        <TextField
          label="Country"
          name="country"
          value={userData.country}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Occupation"
          name="occupation"
          value={userData.occupation}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Phone Number"
          name="phoneNumber"
          type="tel"
          value={userData.phoneNumber}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={userData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Interests"
          name="interests"
          value={userData.interests}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={userData.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ marginTop: '1rem' }}
        />
        <Button type="submit" variant="contained" color="primary" sx={{ marginTop: '1rem' }}>
          Register
        </Button>
      </Box>
    </div>
  );
}

export default Register;









