import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Registration from './Registration';
import Login from './Login';
import AddRecipe from './AddRecipe';
import About from './About'; // Import About component

function App() {
  const [recipes, setRecipes] = useState([
    {
      id: 1,
      name: 'Spaghetti Carbonara',
      details: 'A classic Italian pasta dish made with eggs, cheese, pancetta, and pepper.',
      ingredients: ['Spaghetti', 'Eggs', 'Cheese', 'Pancetta', 'Pepper'],
      instructions: '1. Cook spaghetti. 2. Fry pancetta. 3. Mix eggs and cheese. 4. Combine all ingredients.',
      category: 'Main Course',
      prepTime: '15 minutes',
      cookTime: '20 minutes',
      servings: 4,
    },
    {
      id: 2,
      name: 'Grilled Chicken Salad',
      details: 'A healthy salad with grilled chicken, fresh vegetables, and a light dressing.',
      ingredients: ['Chicken', 'Lettuce', 'Tomatoes', 'Cucumbers', 'Dressing'],
      instructions: '1. Grill chicken. 2. Chop vegetables. 3. Mix together with dressing.',
      category: 'Appetiser',
      prepTime: '10 minutes',
      cookTime: '15 minutes',
      servings: 2,
    },
    // Other initial recipes...
  ]);

  const addRecipe = (newRecipe) => {
    setRecipes([
      ...recipes,
      { ...newRecipe, id: recipes.length + 1 },
    ]);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home recipes={recipes} />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add-recipe" element={<AddRecipe onAddRecipe={addRecipe} />} />
        <Route path="/about" element={<About />} /> {/* Add About route */}
        {/* Add routes for Update and Delete as needed */}
      </Routes>
    </Router>
  );
}

export default App;
