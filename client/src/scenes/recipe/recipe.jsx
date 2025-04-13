import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  Container,
  Card,
  CardMedia,
  IconButton,
  Stack,
  Link,
  CircularProgress
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import PublicIcon from '@mui/icons-material/Public';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkIcon from '@mui/icons-material/Link';
import FastfoodIcon from '@mui/icons-material/Fastfood';

import QRCodeModal from '../../components/modals/qrcodemodal';
import { useNetwork } from '../../hooks/useNetwork';

const RecipeDetailPage = () => {
  const { makeRequest } = useNetwork();
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // QR Code modal state
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [qrData, setQrData] = useState({ url: '', title: '' });

  const handleOpenQrModal = (url, title) => {
    setQrData({ url, title });
    setQrModalOpen(true);
  };

  const handleCloseQrModal = () => {
    setQrModalOpen(false);
  };

  useEffect(() => {
    // In a real application, you would fetch the specific recipe
    // For demo purposes, we'll simulate a fetch operation
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        const endpoint = `/v1/recipes/${id}`;
        const data = await makeRequest(endpoint, 'get');
        setRecipe(data);
        setLoading(false);
      } catch (error) {
        // Error handling is managed by useNetwork hook
        console.log(error)
        setError('Failed to load recipes');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  // Extract tags from the comma-separated string if available
  const tagList = recipe?.tags ? recipe.tags.split(',') : [];

  // Format instructions into steps
  const instructionSteps = recipe?.instructions
    ? recipe.instructions.split(/\d+\./).filter(step => step.trim().length > 0)
    : [];

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !recipe) {
    return (
      <Box sx={{ py: 4, textAlign: 'center' }}>
        <Typography color="error">
          {error || 'Recipe not found'}
        </Typography>
        <Button startIcon={<ArrowBackIcon />} onClick={handleBack} sx={{ mt: 2 }}>
          Back to Recipes
        </Button>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button startIcon={<ArrowBackIcon />} onClick={handleBack} sx={{ mb: 2 }}>
        Back to Recipes
      </Button>

      <Paper elevation={2} sx={{ overflow: 'hidden' }}>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}>
              <CardMedia
                component="img"
                image={recipe.image_url || '/placeholder-recipe.jpg'}
                alt={recipe.name}
                sx={{ height: 400, objectFit: 'cover' }}
              />
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h4" component="h1" gutterBottom>
                {recipe.name}
              </Typography>

              <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <RestaurantIcon sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="body1">{recipe.category}</Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <PublicIcon sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="body1">{recipe.area}</Typography>
                </Box>
              </Stack>

              {tagList.length > 0 && (
                <Box sx={{ mb: 3 }}>
                  <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                    {tagList.map((tag, index) => (
                      <Chip
                        key={index}
                        label={tag.trim()}
                        color="primary"
                        size="small"
                      />
                    ))}
                  </Stack>
                </Box>
              )}

              <Box sx={{ mb: 2, mt: 'auto' }}>
                <Stack direction="row" spacing={2}>
                  {recipe.youtube_url && (
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<YouTubeIcon />}
                      onClick={() => handleOpenQrModal(recipe.youtube_url, 'YouTube Video Tutorial')}
                    >
                      Watch Video
                    </Button>
                  )}

                  {recipe.source && (
                    <Button
                      variant="outlined"
                      startIcon={<LinkIcon />}
                      onClick={() => handleOpenQrModal(recipe.source, 'Recipe Source')}
                    >
                      Source
                    </Button>
                  )}
                </Stack>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12} md={4}>
          <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <FastfoodIcon sx={{ mr: 1 }} /> Ingredients
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <List>
              {recipe.ingredients.map((ingredient) => (
                <ListItem key={ingredient.id} disablePadding sx={{ py: 0.5 }}>
                  <ListItemText
                    primary={
                      <Typography variant="body1">
                        {ingredient.name} - <b>{ingredient.measure}</b>
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Instructions
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <List>
              {instructionSteps.map((step, index) => (
                <ListItem key={index} sx={{ py: 1 }}>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex' }}>
                        <Typography
                          variant="body1"
                          sx={{
                            backgroundColor: 'primary.main',
                            color: 'white',
                            borderRadius: '50%',
                            minWidth: 28,
                            minHeight: 28,
                            maxWidth: 28,
                            maxHeight: 28,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mr: 2,
                          }}
                        >
                          {index + 1}
                        </Typography>
                        <Typography variant="body1">{step.trim()}</Typography>
                      </Box>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>

      {/* QR Code Modal */}
      <QRCodeModal 
        open={qrModalOpen} 
        handleClose={handleCloseQrModal} 
        url={qrData.url} 
        title={qrData.title} 
      />
    </Container>
  );
};

export default RecipeDetailPage;