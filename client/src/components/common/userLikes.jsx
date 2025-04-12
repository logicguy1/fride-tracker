import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Container,
  CircularProgress,
  Button,
  Divider,
  Card,
  CardContent
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import RecipeGrid from './recipeGrid';
import RefreshButton from './refreshButton';
import { useNetwork } from '../../hooks/useNetwork';

const UserLikes = () => {
  const { makeRequest } = useNetwork();
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserLikes = async () => {
    try {
      setLoading(true);
      const endpoint = `/v1/recipes/likes/all`;
      const data = await makeRequest(endpoint, 'get');
      setUserData(data.users);
    } catch (error) {
      setError('Failed to load user likes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserLikes();
  }, []);

  // Handler for when refresh is successful
  const handleRefreshSuccess = (newData) => {
    setUserData(newData.users);
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 5, textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>Loading user data...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 5, textAlign: 'center' }}>
        <Typography variant="h6" color="error">{error}</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      {userData.length === 0 ? (
        <Typography variant="body1">No user data available.</Typography>
      ) : (
        userData.map((user) => (
          <Card key={user.user_id} sx={{ mb: 3, overflow: 'visible' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="h6">
                  {user.user_name} ({user.recipes.length} liked recipes)
                </Typography>
                <Button 
                  variant="outlined" 
                  startIcon={<VisibilityIcon />}
                  onClick={() => (null)}
                >
                  See All
                </Button>
              </Box>
              
              {/* Always show recipes in the grid/carousel by default */}
              <RecipeGrid
                recipes={user.recipes}
                loading={false}
                error={null}
              />
            </CardContent>
          </Card>
        ))
      )}
    </Container>
  );
};

export default UserLikes;