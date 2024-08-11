import React, { useState, useEffect } from 'react';
import { Button, Typography, Container, Box, List, ListItem, ListItemText, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Added for React Router navigation
import './Home.css';

const Home = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const navigate = useNavigate(); // Hook for navigation

  const images = [
    "https://img.freepik.com/free-photo/penne-pasta-tomato-sauce-with-chicken-tomatoes-wooden-table_2829-19744.jpg?t=st=1723380227~exp=1723383827~hmac=723721196720d6d95c59441722f0e959789b1c6c342eb14dd5bac3e76feaef30&w=996",
    "https://img.freepik.com/free-photo/fresh-grill-bbq-chicken_144627-7526.jpg?t=st=1723380268~exp=1723383868~hmac=92fce21ce0d0fd0dd05fa22dc8b1b22ab8c3feec2ea5be89a69a92e39a8f6af1&w=996",
    "https://img.freepik.com/free-photo/top-view-vegetable-soup-with-meat-inside-plate-grey_140725-36040.jpg?t=st=1723380314~exp=1723383914~hmac=cb3645abd9d9dab356be8c1ded0ff4f33318e31b2325e215fd5c82ce3d268991&w=996",
    "https://img.freepik.com/free-photo/pre-prepared-food-showcasing-ready-eat-delicious-meals-go_23-2151246068.jpg?t=st=1723380390~exp=1723383990~hmac=799a00085a3f5b27b4789ef10a672a40ee5a2f7b9a158effb8bb99eeffc4bb0e&w=996",
    "https://img.freepik.com/free-photo/preparation-baking-kitchen-ingredients-cooking_114579-491.jpg?t=st=1723380462~exp=1723384062~hmac=b2a44a6b0dfd0ac241a4cd814938b385c15d1dbff135e642f2fd40d191bfa242&w=360"
  ];

  const recipes = [
    {
      name: 'Spaghetti Carbonara',
      details: 'A classic Italian pasta dish made with eggs, cheese, pancetta, and pepper.',
      ingredients: ['Spaghetti', 'Eggs', 'Cheese', 'Pancetta', 'Pepper'],
      instructions: 'Cook spaghetti. Fry pancetta. Mix eggs and cheese. Combine all ingredients.',
      category: 'Main Course',
      prepTime: '15 minutes',
      cookTime: '20 minutes',
      servings: '4'
    },
    {
      name: 'Grilled Chicken Salad',
      details: 'A healthy salad with grilled chicken, fresh vegetables, and a light dressing.',
      ingredients: ['Chicken', 'Lettuce', 'Tomatoes', 'Cucumbers', 'Dressing'],
      instructions: 'Grill chicken. Chop vegetables. Mix together with dressing.',
      category: 'Appetiser',
      prepTime: '10 minutes',
      cookTime: '15 minutes',
      servings: '4'
    },
    {
      name: 'Vegetable Soup',
      details: 'A hearty soup made with a variety of vegetables, perfect for a cold day.',
      ingredients: ['Carrots', 'Potatoes', 'Celery', 'Tomatoes', 'Onions'],
      instructions: 'Chop vegetables. Cook in broth until tender.',
      category: 'Starter',
      prepTime: '15 minutes',
      cookTime: '30 minutes',
      servings: '9'
    },
    {
      name: 'Beef Stroganoff',
      details: 'A Russian dish with sautéed pieces of beef served in a sauce with smetana (sour cream).',
      ingredients: ['Beef', 'Sour Cream', 'Mushrooms', 'Onions', 'Garlic'],
      instructions: 'Sauté beef and onions. Add mushrooms and cook. Stir in sour cream.',
      category: 'Main Course',
      prepTime: '20 minutes',
      cookTime: '25 minutes',
      servings: '4'
    },
    {
      name: 'Chocolate Cake',
      details: 'A rich and moist chocolate cake perfect for dessert.',
      ingredients: ['Flour', 'Cocoa Powder', 'Sugar', 'Butter', 'Eggs'],
      instructions: 'Mix ingredients. Bake in oven until cooked through.',
      category: 'Dessert',
      prepTime: '20 minutes',
      cookTime: '30 minutes',
      servings: '15'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(prev => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleClose = () => {
    setSelectedRecipe(null);
  };

  return (
    <Container className="home" maxWidth={false} disableGutters>
      <Typography variant="h4" align="center" gutterBottom sx={{ color: 'white', mb: 4 }}>
        <strong>Welcome to Smart Recipe!</strong>
      </Typography>
      <Typography variant="body1" align="center" className="paragraph">
        <strong>Explore our collection of delicious recipes! Whether you're looking to add new dishes to your meal plan or find inspiration for your next culinary adventure, our app offers a variety of recipes to suit your tastes.</strong>
      </Typography>
      <Box className="recipe-list-container">
        <Typography variant="h5" align="center" sx={{ color: 'white', mb: 2 }}>
          <strong>Featured Recipes</strong>
        </Typography>
        <List className="recipe-list">
          {recipes.map((recipe, index) => (
            <ListItem button key={index} onClick={() => handleRecipeClick(recipe)}>
              <ListItemText primary={recipe.name} />
            </ListItem>
          ))}
        </List>
      </Box>
      <Box className="image-slider">
        <img src={images[currentImage]} alt={`Featured Recipe ${currentImage + 1}`} />
      </Box>
      <Box className="links" display="flex" justifyContent="center" gap={2}>
        <Button variant="contained" color="primary" onClick={() => navigate('/register')}>
          Register
        </Button>
        <Button variant="contained" color="secondary" onClick={() => navigate('/login')}>
          Login
        </Button>
        <Button variant="contained" color="success" onClick={() => navigate('/add-recipe')}>
          Add Recipe
        </Button>
      </Box>
      <Dialog open={!!selectedRecipe} onClose={handleClose}>
        <DialogTitle>{selectedRecipe?.name}</DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            <strong>Details:</strong>
          </Typography>
          <Typography variant="body2">{selectedRecipe?.details}</Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Ingredients:</strong>
          </Typography>
          <Typography variant="body2">{selectedRecipe?.ingredients.join(', ')}</Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Instructions:</strong>
          </Typography>
          <Typography variant="body2">{selectedRecipe?.instructions}</Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Category:</strong>
          </Typography>
          <Typography variant="body2">{selectedRecipe?.category}</Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Preparation Time:</strong>
          </Typography>
          <Typography variant="body2">{selectedRecipe?.prepTime}</Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Cooking Time:</strong>
          </Typography>
          <Typography variant="body2">{selectedRecipe?.cookTime}</Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Servings:</strong>
          </Typography>
          <Typography variant="body2">{selectedRecipe?.servings}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Home;

