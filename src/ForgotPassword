import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Typography, Container } from '@mui/material';




function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');


  const handleChange = (event) => {
    setEmail(event.target.value);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');


    if (email) {
      try {
        const response = await fetch('http://localhost:3000/users/forgot-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });


        const result = await response.json();


        if (response.ok) {
          setSuccess('Password reset link sent to your email.');
          navigate('/login');
        } else {
          setError(result.error);
        }
      } catch (error) {
        console.error('Error sending password reset link:', error);
        setError('Error sending password reset link');
      }
    } else {
      setError('Please enter your email.');
    }
  };


  return (
    <Container component="main" maxWidth="xs">
      <div className="forgot-password-screen">
        <Typography variant="h5" align="center">
          Forgot Your Password?
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        {success && <Typography color="success">{success}</Typography>}
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="email"
            label="Email"
            type="email"
            value={email}
            onChange={handleChange}
            autoComplete="email"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Send Reset Link
          </Button>
        </form>
      </div>
    </Container>
  );
}


export default ForgotPassword;
