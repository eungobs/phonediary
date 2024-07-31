import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import './home.css';

function Home() {
  const navigate = useNavigate();

  return (
    <Container className="home-screen">
      <Box className="intro-text" textAlign="center" my={4}>
        <Typography variant="h4" component="h1">
          📅 Welcome to Your Ultimate Task Manager! 🎯
        </Typography>
        <Typography variant="body1" className="description" mt={2}>
          Organize Your Life with Ease<br />
          Transform how you manage your tasks and stay on top of your responsibilities with our intuitive To-Do List app. Whether you're juggling personal goals, work projects, or daily chores, we've got you covered!
        </Typography>
      </Box>
      <Box className="button-container" textAlign="center" mt={4}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/register')}
          sx={{ margin: '0.5rem', padding: '1rem 2rem' }}
          className="home-screen-button"
        >
          Register
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/login')}
          sx={{ margin: '0.5rem', padding: '1rem 2rem' }}
          className="home-screen-button"
        >
          Login
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/logout')}
          sx={{ margin: '0.5rem', padding: '1rem 2rem' }}
          className="home-screen-button"
        >
          Logout
        </Button>
      </Box>
    </Container>
  );
}

export default Home;


