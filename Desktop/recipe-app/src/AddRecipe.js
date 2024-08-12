import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  AppBar,
  Toolbar
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility'; // Import View Icon
import { useNavigate } from 'react-router-dom'; // Added for navigation

const categories = ['Breakfast', 'Lunch', 'Dinner'];

const AddRecipe = () => {
  const [recipes, setRecipes] = useState([]);
  const [name, setName] = useState('');
  const [details, setDetails] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [category, setCategory] = useState('');
  const [prepTime, setPrepTime] = useState('');
  const [cookTime, setCookTime] = useState('');
  const [servings, setServings] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [editIndex, setEditIndex] = useState(-1);
  const [viewIndex, setViewIndex] = useState(-1); // State for viewing recipe
  const [open, setOpen] = useState(false);

  const navigate = useNavigate(); // Hook for navigation

  // Load recipes from localStorage on initial render
  useEffect(() => {
    const savedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
    setRecipes(savedRecipes);
  }, []);

  // Save recipes to localStorage whenever the recipes state changes
  useEffect(() => {
    localStorage.setItem('recipes', JSON.stringify(recipes));
  }, [recipes]);

  const handleAddRecipe = () => {
    const newRecipe = {
      name,
      details,
      ingredients,
      instructions,
      category,
      prepTime,
      cookTime,
      servings,
    };

    if (editIndex >= 0) {
      const updatedRecipes = [...recipes];
      updatedRecipes[editIndex] = newRecipe;
      setRecipes(updatedRecipes);
      setEditIndex(-1);
    } else {
      setRecipes([...recipes, newRecipe]);
    }

    clearFields();
  };

  const handleEditRecipe = (index) => {
    const recipe = recipes[index];
    setName(recipe.name);
    setDetails(recipe.details);
    setIngredients(recipe.ingredients);
    setInstructions(recipe.instructions);
    setCategory(recipe.category);
    setPrepTime(recipe.prepTime);
    setCookTime(recipe.cookTime);
    setServings(recipe.servings);
    setEditIndex(index);
    setOpen(false);
  };

  const handleDeleteRecipe = (index) => {
    const updatedRecipes = recipes.filter((_, i) => i !== index);
    setRecipes(updatedRecipes);
    setOpen(false);
  };

  const handleViewRecipe = (index) => {
    setViewIndex(index);
    setOpen(true);
  };

  const clearFields = () => {
    setName('');
    setDetails('');
    setIngredients('');
    setInstructions('');
    setCategory('');
    setPrepTime('');
    setCookTime('');
    setServings('');
  };

  const handleOpenDialog = (index) => {
    setEditIndex(index);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setEditIndex(-1);
    setViewIndex(-1); // Clear viewIndex when closing
    setOpen(false);
  };

  const filteredRecipes = recipes.filter(
    (recipe) =>
      recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxWidth="lg" className="add-recipe-container" sx={{ p: 4, backgroundColor: '#f5f5f5' }}>
      <AppBar position="static" sx={{ mb: 4 }}>
        <Toolbar>
          <Button color="inherit" onClick={() => navigate('/')}>Home</Button>
          <Button color="inherit" onClick={() => navigate('/login')} sx={{ ml: 'auto' }}>Logout</Button>
        </Toolbar>
      </AppBar>
      <Box sx={{ display: 'flex', gap: 4 }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Add New Recipe
          </Typography>
          <TextField
            label="Recipe Name"
            fullWidth
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Details"
            fullWidth
            variant="outlined"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Ingredients (comma-separated)"
            fullWidth
            variant="outlined"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Instructions"
            fullWidth
            variant="outlined"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Category"
            fullWidth
            variant="outlined"
            select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            sx={{ mb: 2 }}
          >
            {categories.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Preparation Time"
            fullWidth
            variant="outlined"
            value={prepTime}
            onChange={(e) => setPrepTime(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Cooking Time"
            fullWidth
            variant="outlined"
            value={cookTime}
            onChange={(e) => setCookTime(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Servings"
            fullWidth
            variant="outlined"
            value={servings}
            onChange={(e) => setServings(e.target.value)}
            sx={{ mb: 4 }}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleAddRecipe}
          >
            {editIndex >= 0 ? 'Update Recipe' : 'Add Recipe'}
          </Button>

          {/* Search Bar */}
          <TextField
            label="Search Recipes"
            fullWidth
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ mt: 4, mb: 2 }}
          />
        </Box>

        {/* Recipe List */}
        <Box
          sx={{
            flex: 1,
            maxWidth: 400,
            borderLeft: '1px solid #ddd',
            pl: 2,
            backgroundColor: '#e0e0e0',
            borderRadius: 1,
            p: 2,
            color: '#000000',
          }}
        >
          <Typography variant="h6" gutterBottom>
            Recipe List
          </Typography>
          <List>
            {filteredRecipes.map((recipe, index) => (
              <ListItem
                key={index}
                secondaryAction={
                  <>
                    <IconButton
                      edge="end"
                      onClick={() => handleViewRecipe(index)}
                      sx={{ color: '#4caf50', mr: 1 }} 
                    >
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton
                      edge="end"
                      onClick={() => handleOpenDialog(index)}
                      sx={{ color: '#2196f3', mr: 1 }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      edge="end"
                      onClick={() => handleDeleteRecipe(index)}
                      sx={{ color: '#f44336' }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </>
                }
              >
                <ListItemText
                  primary={recipe.name}
                  secondary={`${recipe.category} - ${recipe.details}`}
                  primaryTypographyProps={{ fontWeight: 'bold' }} // Bold text
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>

      {/* Edit/Delete Dialog */}
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Edit or Delete Recipe</DialogTitle>
        <DialogContent>
          <Typography variant="h6">
            {recipes[editIndex]?.name}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Details:</strong> {recipes[editIndex]?.details}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Ingredients:</strong> {recipes[editIndex]?.ingredients}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Instructions:</strong> {recipes[editIndex]?.instructions}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Category:</strong> {recipes[editIndex]?.category}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Preparation Time:</strong> {recipes[editIndex]?.prepTime}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Cooking Time:</strong> {recipes[editIndex]?.cookTime}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Servings:</strong> {recipes[editIndex]?.servings}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleEditRecipe(editIndex)}>Edit</Button>
          <Button onClick={() => handleDeleteRecipe(editIndex)}>Delete</Button>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* View Recipe Dialog */}
      <Dialog open={viewIndex >= 0} onClose={handleCloseDialog}>
        <DialogTitle>View Recipe</DialogTitle>
        <DialogContent>
          <Typography variant="h6">
            {recipes[viewIndex]?.name}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Details:</strong> {recipes[viewIndex]?.details}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Ingredients:</strong> {recipes[viewIndex]?.ingredients}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Instructions:</strong> {recipes[viewIndex]?.instructions}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Category:</strong> {recipes[viewIndex]?.category}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Preparation Time:</strong> {recipes[viewIndex]?.prepTime}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Cooking Time:</strong> {recipes[viewIndex]?.cookTime}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Servings:</strong> {recipes[viewIndex]?.servings}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AddRecipe;
