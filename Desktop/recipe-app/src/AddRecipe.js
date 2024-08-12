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
  ListItemAvatar,
  Avatar,
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
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';

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
  const [image, setImage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [editIndex, setEditIndex] = useState(-1);
  const [viewIndex, setViewIndex] = useState(-1);
  const [open, setOpen] = useState(false);
  const [imageDialogOpen, setImageDialogOpen] = useState(false); // State for image dialog
  const [selectedImage, setSelectedImage] = useState(''); // State for selected image

  const navigate = useNavigate();

  useEffect(() => {
    const savedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
    setRecipes(savedRecipes);
  }, []);

  useEffect(() => {
    localStorage.setItem('recipes', JSON.stringify(recipes));
  }, [recipes]);

  useEffect(() => {
    const matchedIndex = recipes.findIndex(recipe => 
      recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (matchedIndex !== -1) {
      setViewIndex(matchedIndex);
      setOpen(true);
    }
  }, [searchTerm, recipes]);

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
      image,
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

  // eslint-disable-next-line no-unused-vars
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
    setImage(recipe.image);
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

  const handleOpenImageDialog = (imageUrl) => {
    setSelectedImage(imageUrl);
    setImageDialogOpen(true);
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
    setImage('');
  };

  const handleOpenDialog = (index) => {
    setEditIndex(index);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setEditIndex(-1);
    setViewIndex(-1);
    setOpen(false);
    setImageDialogOpen(false);
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
            sx={{ mb: 2 }}
          />
          <TextField
            label="Image URL"
            fullWidth
            variant="outlined"
            value={image}
            onChange={(e) => setImage(e.target.value)}
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
                <ListItemAvatar>
                  <Avatar
                    src={recipe.image}
                    onClick={() => handleOpenImageDialog(recipe.image)} // Open image dialog
                    sx={{ cursor: 'pointer' }}
                  />
                </ListItemAvatar>
                <ListItemText primary={recipe.name} secondary={recipe.category} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>

      {/* Recipe View/Edit Dialog */}
      <Dialog open={open} onClose={handleCloseDialog} fullWidth maxWidth="md">
        <DialogTitle>
          {viewIndex >= 0
            ? recipes[viewIndex]?.name
            : editIndex >= 0
            ? 'Edit Recipe'
            : ''}
        </DialogTitle>
        <DialogContent>
          {viewIndex >= 0 ? (
            <>
              <Typography variant="h6">Details</Typography>
              <Typography paragraph>{recipes[viewIndex]?.details}</Typography>
              <Typography variant="h6">Ingredients</Typography>
              <Typography paragraph>
                {recipes[viewIndex]?.ingredients}
              </Typography>
              <Typography variant="h6">Instructions</Typography>
              <Typography paragraph>
                {recipes[viewIndex]?.instructions}
              </Typography>
              <Typography variant="h6">Preparation Time</Typography>
              <Typography paragraph>{recipes[viewIndex]?.prepTime}</Typography>
              <Typography variant="h6">Cooking Time</Typography>
              <Typography paragraph>{recipes[viewIndex]?.cookTime}</Typography>
              <Typography variant="h6">Servings</Typography>
              <Typography paragraph>{recipes[viewIndex]?.servings}</Typography>
              <img
                src={recipes[viewIndex]?.image}
                alt="Recipe"
                style={{ width: '100%', maxHeight: 300 }}
              />
            </>
          ) : editIndex >= 0 ? (
            <>
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
                sx={{ mb: 2 }}
              />
              <TextField
                label="Image URL"
                fullWidth
                variant="outlined"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                sx={{ mb: 4 }}
              />
            </>
          ) : null}
        </DialogContent>
        <DialogActions>
          {viewIndex >= 0 && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleEditRecipe(viewIndex)}
            >
              Edit
            </Button>
          )}
          <Button onClick={handleCloseDialog} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Image Dialog */}
      <Dialog
        open={imageDialogOpen}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogContent>
          <img
            src={selectedImage}
            alt="Recipe"
            style={{ width: '100%', maxHeight: 500 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AddRecipe;

