import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, Card, CardContent, Grid, CardActions, Paper } from '@mui/material';

const AddRecipe = () => {
  const [recipes, setRecipes] = useState([]);
  const [currentRecipe, setCurrentRecipe] = useState(null);
  const [recipeName, setRecipeName] = useState('');
  const [recipeDescription, setRecipeDescription] = useState('');

  useEffect(() => {
    axios.get('/recipes')
      .then(response => setRecipes(response.data))
      .catch(error => console.error('Error fetching recipes:', error));
  }, []);

  const handleAddRecipe = () => {
    axios.post('/recipes', { name: recipeName, description: recipeDescription })
      .then(response => {
        setRecipes([...recipes, response.data]);
        setRecipeName('');
        setRecipeDescription('');
      })
      .catch(error => console.error('Error adding recipe:', error));
  };

  const handleEditRecipe = (id) => {
    const updatedRecipe = { name: recipeName, description: recipeDescription };
    axios.put(`/recipes/${id}`, updatedRecipe)
      .then(response => {
        setRecipes(recipes.map(recipe => recipe.id === id ? response.data : recipe));
        setCurrentRecipe(null);
        setRecipeName('');
        setRecipeDescription('');
      })
      .catch(error => console.error('Error editing recipe:', error));
  };

  const handleDeleteRecipe = (id) => {
    axios.delete(`/recipes/${id}`)
      .then(() => setRecipes(recipes.filter(recipe => recipe.id !== id)))
      .catch(error => console.error('Error deleting recipe:', error));
  };

  return (
    <Container maxWidth="md" style={{ backgroundColor: '#fafafa', padding: 20, borderRadius: 8 }}>
      <Typography variant="h4" gutterBottom align="center" color="primary">
        {currentRecipe ? 'Edit Recipe' : 'Add Recipe'}
      </Typography>
      <Paper elevation={3} style={{ padding: 20 }}>
        <TextField
          fullWidth
          label="Recipe Name"
          variant="outlined"
          margin="normal"
          value={recipeName}
          onChange={(e) => setRecipeName(e.target.value)}
        />
        <TextField
          fullWidth
          label="Recipe Description"
          variant="outlined"
          margin="normal"
          multiline
          rows={4}
          value={recipeDescription}
          onChange={(e) => setRecipeDescription(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={currentRecipe ? () => handleEditRecipe(currentRecipe.id) : handleAddRecipe}
          style={{ marginTop: 20 }}
        >
          {currentRecipe ? 'Update Recipe' : 'Add Recipe'}
        </Button>
      </Paper>

      <Typography variant="h5" gutterBottom align="center" color="primary" style={{ marginTop: 40 }}>
        Existing Recipes
      </Typography>
      <Grid container spacing={2}>
        {recipes.map(recipe => (
          <Grid item xs={12} sm={6} md={4} key={recipe.id}>
            <Card style={{ marginBottom: 20 }}>
              <CardContent>
                <Typography variant="h6">{recipe.name}</Typography>
                <Typography variant="body2">{recipe.description}</Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => {
                    setCurrentRecipe(recipe);
                    setRecipeName(recipe.name);
                    setRecipeDescription(recipe.description);
                  }}
                >
                  Edit
                </Button>
                <Button
                  size="small"
                  color="secondary"
                  onClick={() => handleDeleteRecipe(recipe.id)}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AddRecipe;


