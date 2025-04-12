import React from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import RecipeCard from './recipeCard';

const RecipeCarousel = ({ recipes, loading, error }) => {
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ py: 4, textAlign: 'center' }}>
        <Typography color="error">Error loading recipes. Please try again later.</Typography>
      </Box>
    );
  }

  if (!recipes || recipes.length === 0) {
    return (
      <Box sx={{ py: 4, textAlign: 'center' }}>
        <Typography>No recipes found.</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        overflowX: 'auto',
        gap: 2,
        py: 2,
        px: 2,
        scrollSnapType: 'x mandatory',
        '&::-webkit-scrollbar': { display: 'none' }, // optional: hides scrollbar on WebKit browsers
      }}
    >
      {recipes.map((recipe) => (
        <Box
          key={recipe.id}
          sx={{
            flex: '0 0 auto',
            width: 250, // You can adjust the width as needed
          }}
        >
          <RecipeCard recipe={recipe} />
        </Box>
      ))}
    </Box>
  );
};

export default RecipeCarousel;
