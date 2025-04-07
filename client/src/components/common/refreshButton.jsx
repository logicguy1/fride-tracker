import { useState } from 'react';
import { Button, Box, CircularProgress } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useNetwork } from '../../hooks/useNetwork';

const RefreshButton = ({ onRefreshSuccess }) => {
  const { makeRequest } = useNetwork();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    try {
      setIsRefreshing(true);
      // Make API call to refresh daily recipes
      const response = await makeRequest('/v1/recipes/daily/refresh', 'post');
      
      // If successful, call the success handler with new recipes
      if (response && response.recipes) {
        onRefreshSuccess(response.recipes);
      }
    } catch (error) {
      console.error('Failed to refresh recipes:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <Box sx={{ mb: 2 }}>
      <Button
        color="primary"
        startIcon={!isRefreshing && <RefreshIcon />}
        onClick={handleRefresh}
        disabled={isRefreshing}
        sx={{ borderRadius: 2 }}
      >
        {isRefreshing ? (
          <>
            <CircularProgress size={20} color="inherit" sx={{ mr: 1 }} />
            Refreshing...
          </>
        ) : (
          'Refresh Recipes'
        )}
      </Button>
    </Box>
  );
};

export default RefreshButton;