import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // For navigation

const About = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        About Smart Recipe
      </Typography>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" paragraph>
          Welcome to Smart Recipe! Our mission is to help busy professionals, chefs, busy mothers, and anyone who loves to cook and bake by providing a platform where you can find, share, and enjoy a wide variety of recipes.
        </Typography>
        <Typography variant="body1" paragraph>
          Our website offers a diverse collection of recipes that are updated weekly. Users can not only browse and use recipes from others but also add their own recipes and make edits as needed. Whether you're looking for a quick meal, a gourmet dish, or a delicious dessert, Smart Recipe is here to inspire and assist you in your culinary adventures.
        </Typography>
        <Typography variant="body1" paragraph>
          If you have any questions or suggestions, feel free to contact us at: <strong>smartrecipes@gmail.com</strong>.
        </Typography>
      </Box>
      <Box display="flex" justifyContent="center">
        <Button variant="contained" color="primary" onClick={() => navigate('/')}>
          Back to Home
        </Button>
      </Box>
    </Container>
  );
};

export default About;

