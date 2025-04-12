import { useState } from 'react';
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  CircularProgress
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SelectOwner from '../../../scenes/item/assign/selectOwner';
import { useNetwork } from '../../../hooks/useNetwork'; // Adjust the path as needed

/**
 * LikeButton Component - Handles liking/unliking recipes
 * 
 * @param {Object} props
 * @param {number} props.recipeId - The ID of the recipe
 * @param {number|null} props.userId - The ID of the user who liked the recipe (if already liked)
 * @param {Function} props.onLikeChange - Callback when like status changes (optional)
 */
const LikeButton = ({ recipeId, userId: initialUserId = null, onLikeChange = () => {} }) => {
  const [isLiked, setIsLiked] = useState(Boolean(initialUserId));
  const [userId, setUserId] = useState(initialUserId);
  const [openModal, setOpenModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { makeRequest } = useNetwork();

  // Fetch users when modal opens
  const handleOpenModal = async () => {
    setOpenModal(true);
    if (users.length === 0) {
      try {
        setLoading(true);
        const data = await makeRequest('/v1/users/', 'get');
        if (data) {
          setUsers(data);
        }
      } catch (err) {
        setError('Failed to load users. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSelectUser = async (selectedUserId, userName) => {
    try {
      setLoading(true);
      await makeRequest(`/v1/users/${selectedUserId}/like/${recipeId}`, 'post');
      setIsLiked(true);
      setUserId(selectedUserId);
      onLikeChange(true, selectedUserId);
      handleCloseModal();
    } catch (err) {
      setError('Failed to like the recipe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleUnlike = async () => {
    if (!userId) return;
    
    try {
      setLoading(true);
      await makeRequest(`/v1/users/${userId}/unlike/${recipeId}`, 'delete');
      setIsLiked(false);
      setUserId(null);
      onLikeChange(false, null);
    } catch (err) {
      setError('Failed to unlike the recipe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLikeClick = () => {
    if (isLiked) {
      handleUnlike();
    } else {
      handleOpenModal();
    }
  };

  return (
    <>
      <IconButton 
        color={isLiked ? "error" : "default"} 
        onClick={handleLikeClick}
        disabled={loading}
      >
        {loading ? (
          <CircularProgress size={24} color="inherit" />
        ) : isLiked ? (
          <FavoriteIcon />
        ) : (
          <FavoriteBorderIcon />
        )}
      </IconButton>

      {/* User Selection Modal */}
      <Dialog 
        open={openModal} 
        onClose={handleCloseModal}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          Like Recipe
        </DialogTitle>
        <DialogContent>
          {error && (
            <Typography color="error" gutterBottom>{error}</Typography>
          )}
          <Box sx={{ py: 2 }}>
            <SelectOwner 
              users={users} 
              selectedUserId={userId} 
              onSelect={handleSelectUser} 
              loading={loading} 
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default LikeButton;