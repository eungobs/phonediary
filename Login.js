import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, TextField, Typography, Container } from '@mui/material';
import './login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');

    if (email && password) {
      // Allow login with any email and password
      localStorage.setItem('user', JSON.stringify({ email })); // Store user info in localStorage
      window.location.href = '/todo-list'; // Redirect to the ToDoList page or your desired page
    } else {
      setError('Please enter email and password.');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className="login-screen">
        <Typography variant="h5" align="center">
          Login
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
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
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
          <div className="links">
            <Link to="/forgot-password" className="forgot-password-link">
              Forgot Password?
            </Link>
            <br />
            <Link to="/change-password" className="change-password-link">
              Change Password
            </Link>
          </div>
        </form>
      </div>
    </Container>
  );
}

export default Login;





