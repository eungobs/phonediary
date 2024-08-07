import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Typography, Container } from '@mui/material';
import './changePassword.css';

function ChangePassword() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (formData.oldPassword && formData.newPassword) {
      try {
        const response = await fetch('http://localhost:3000/users/change-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (response.ok) {
          setSuccess('Password changed successfully!');
          navigate('/login');
        } else {
          setError(result.error || 'Error changing password');
        }
      } catch (error) {
        console.error('Error changing password:', error);
        setError('Error changing password');
      }
    } else {
      setError('Please fill in both fields.');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className="change-password-screen">
        <Typography variant="h5" align="center">
          Change Your Password
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        {success && <Typography color="success">{success}</Typography>}
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="oldPassword"
            label="Old Password"
            type="password"
            value={formData.oldPassword}
            onChange={handleChange}
            autoComplete="current-password"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="newPassword"
            label="New Password"
            type="password"
            value={formData.newPassword}
            onChange={handleChange}
            autoComplete="new-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Change Password
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default ChangePassword;
