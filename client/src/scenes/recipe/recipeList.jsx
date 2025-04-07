import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Container,
  CircularProgress
} from '@mui/material';
import RecipeGrid from '../../components/common/recipeGrid';
import RefreshButton from '../../components/common/refreshButton';
import { useNetwork } from '../../hooks/useNetwork';

const RecipePage = () => {
  const { makeRequest } = useNetwork();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const fetchRecipes = async () => {
    try {
      setLoading(true);
      const endpoint = `/v1/recipes/daily`;
      const data = await makeRequest(endpoint, 'get');
      setRecipes(data.recipes);
    } catch (error) {
      // Error handling is managed by useNetwork hook
      setError('Failed to load recipes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  // Handler for when refresh is successful
  const handleRefreshSuccess = (newRecipes) => {
    setRecipes(newRecipes);
  };

  // Filter recipes based on search term and category
  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     (recipe.tags && recipe.tags.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = categoryFilter === '' || categoryFilter === 'All' || recipe.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategoryFilter(event.target.value);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            Daily Recipes
          </Typography>
          <Typography variant="h6" component="h2">
            {loading ? 'Loading...' : ``}
          </Typography>
        </Box>
        <RefreshButton onRefreshSuccess={handleRefreshSuccess} />
      </Box>

      <RecipeGrid
        recipes={filteredRecipes}
        loading={loading}
        error={error}
      />
    </Container>
  );
};

export default RecipePage;