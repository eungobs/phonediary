import React, { useState, useRef, useEffect } from 'react';
import { Button, TextField, Select, MenuItem, InputLabel, FormControl, Container, CssBaseline, Box, Typography, Paper, AppBar, Toolbar } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './recipe.css';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function AddRecipe({ onLogout }) {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [opened, setOpened] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentRecipe, setCurrentRecipe] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [imagePreview, setImagePreview] = useState('');

  const recipeName = useRef('');
  const recipeDetails = useRef('');
  const recipeIngredients = useRef('');
  const recipeInstructions = useRef('');
  const recipeCategory = useRef('');
  const recipePrepTime = useRef('');
  const recipeServings = useRef('');
  const recipeCookTime = useRef('');
  const recipeImage = useRef(null);

  // Fetch recipes from the JSON server
  const fetchRecipes = async () => {
    try {
      const response = await axios.get('http://localhost:3001/recipes');
      setRecipes(response.data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  // Upload image and get URL
  const uploadImage = async (file) => {
    if (!file) return ''; // If no file, return empty string

    const uploadUrl = 'https://api.mockimageupload.com/upload'; // Update with your actual image upload URL
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(uploadUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data.url; // URL returned by your image upload service
    } catch (error) {
      console.error('Error uploading image:', error);
      return '';
    }
  };

  // Create a new recipe and save it to the JSON server
  const createRecipe = async () => {
    const imageUrl = await uploadImage(recipeImage.current.files[0]);

    const newRecipe = {
      id: Date.now(),
      name: recipeName.current.value,
      details: recipeDetails.current.value,
      ingredients: recipeIngredients.current.value.split('\n'), // Ensure ingredients are an array
      instructions: recipeInstructions.current.value,
      category: recipeCategory.current.value,
      prepTime: recipePrepTime.current.value,
      servings: recipeServings.current.value,
      cookTime: recipeCookTime.current.value,
      image: imageUrl,
    };

    try {
      const response = await axios.post('http://localhost:3001/recipes', newRecipe);
      console.log('Recipe created:', response.data);
      setRecipes([...recipes, response.data]); // Add the newly created recipe
      setOpened(false);
    } catch (error) {
      console.error('Error creating recipe:', error);
    }
  };

  // Edit a recipe and update it in the JSON server
  const editRecipe = async () => {
    const imageUrl = recipeImage.current.files[0] ? await uploadImage(recipeImage.current.files[0]) : currentRecipe.image;

    const updatedRecipe = {
      ...currentRecipe,
      name: recipeName.current.value,
      details: recipeDetails.current.value,
      ingredients: recipeIngredients.current.value.split('\n'),
      instructions: recipeInstructions.current.value,
      category: recipeCategory.current.value,
      prepTime: recipePrepTime.current.value,
      servings: recipeServings.current.value,
      cookTime: recipeCookTime.current.value,
      image: imageUrl,
    };

    try {
      const response = await axios.put(http://localhost:3001/recipes/${currentRecipe.id}, updatedRecipe);
      console.log('Recipe updated:', response.data);
      setRecipes(recipes.map(recipe => recipe.id === currentRecipe.id ? response.data : recipe));
      setOpened(false);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating recipe:', error);
    }
  };

  // Delete a recipe and remove it from the JSON server
  const deleteRecipe = async (recipeId) => {
    try {
      await axios.delete(http://localhost:3001/recipes/${recipeId});
      setRecipes(recipes.filter(recipe => recipe.id !== recipeId));
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  const filteredRecipes = recipes.filter(recipe =>
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.ingredients.join(' ').toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.instructions.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container component="main">
        <AppBar position="static">
          <Toolbar>
            <Button color="inherit" onClick={onLogout}>Logout</Button>
            <Button color="inherit" onClick={() => navigate('/')}>Home</Button>
          </Toolbar>
        </AppBar>
        <Box display="flex" flexDirection="column" alignItems="center">
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            placeholder="Search recipes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              endAdornment: <SearchIcon />,
            }}
          />
          {opened && (
            <Paper elevation={3} sx={{ padding: 2, margin: 2 }}>
              <Typography component="h2" variant="h5">{isEditing ? 'Edit Recipe' : 'New Recipe'}</Typography>
              <TextField inputRef={recipeName} label="Name" fullWidth margin="normal" required defaultValue={isEditing ? currentRecipe.name : ''} />
              <TextField inputRef={recipeDetails} label="Details" fullWidth margin="normal" multiline rows={2} defaultValue={isEditing ? currentRecipe.details : ''} />
              <TextField inputRef={recipeIngredients} label="Ingredients (one per line)" fullWidth margin="normal" multiline rows={4} defaultValue={isEditing ? currentRecipe.ingredients.join('\n') : ''} />
              <TextField inputRef={recipeInstructions} label="Instructions" fullWidth margin="normal" multiline rows={4} defaultValue={isEditing ? currentRecipe.instructions : ''} />
              <FormControl fullWidth margin="normal">
                <InputLabel>Category</InputLabel>
                <Select inputRef={recipeCategory} label="Category" defaultValue={isEditing ? currentRecipe.category : ''}>
                  <MenuItem value="Appetizer">Appetizer</MenuItem>
                  <MenuItem value="Main Course">Main Course</MenuItem>
                  <MenuItem value="Dessert">Dessert</MenuItem>
                  <MenuItem value="Snack">Snack</MenuItem>
                </Select>
              </FormControl>
              <TextField
                inputRef={recipePrepTime}
                label="Preparation Time"
                fullWidth
                margin="normal"
                defaultValue={isEditing ? currentRecipe.prepTime : ''}
              />
              <TextField
                inputRef={recipeServings}
                label="Servings"
                fullWidth
                margin="normal"
                defaultValue={isEditing ? currentRecipe.servings : ''}
              />
              <TextField
                inputRef={recipeCookTime}
                label="Cook Time"
                fullWidth
                margin="normal"
                defaultValue={isEditing ? currentRecipe.cookTime : ''}
              />
              <TextField
                type="file"
                inputRef={recipeImage}
                label="Image"
                fullWidth
                margin="normal"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setImagePreview(URL.createObjectURL(file));
                  } else {
                    setImagePreview('');
                  }
                }}
              />
              {imagePreview && <img src={imagePreview} alt="Preview" style={{ maxWidth: '100%', marginTop: '16px' }} />}
              <Box display="flex" justifyContent="space-between">
                <Button variant="contained" color="secondary" onClick={() => setOpened(false)}>Cancel</Button>
                <Button variant="contained" color="primary" onClick={isEditing ? editRecipe : createRecipe}>{isEditing ? 'Update Recipe' : 'Create Recipe'}</Button>
              </Box>
            </Paper>
          )}
          <Box mt={2} width="100%">
            {filteredRecipes.length > 0 ? (
              filteredRecipes.map(recipe => (
                <Paper key={recipe.id} elevation={3} sx={{ padding: 2, margin: 2 }}>
                  <Typography variant="h6">{recipe.name}</Typography>
                  <Typography variant="body2">Details: {recipe.details}</Typography>
                  <Typography variant="body2">Category: {recipe.category}</Typography>
                  <Typography variant="body2">Prep Time: {recipe.prepTime}</Typography>
                  <Typography variant="body2">Servings: {recipe.servings}</Typography>
                  <Typography variant="body2">Cook Time: {recipe.cookTime}</Typography>
                  {recipe.image && <img src={recipe.image} alt={recipe.name} style={{ maxWidth: '100%' }} />}
                  <Box mt={2} display="flex" justifyContent="space-between">
                    <Button variant="contained" color="primary" onClick={() => {
                      setCurrentRecipe(recipe);
                      setIsEditing(true);
                      setOpened(true);
                    }}>Edit</Button>
                    <Button variant="contained" color="error" onClick={() => deleteRecipe(recipe.id)} startIcon={<DeleteIcon />}>Delete</Button>
                  </Box>
                </Paper>
              ))
            ) : (
              <Typography variant="h6">No recipes found</Typography>
            )}
          </Box>
          <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => {
            setIsEditing(false);
            setOpened(true);
            setImagePreview('');
          }}>
            Add Recipe
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default AddRecipe;
