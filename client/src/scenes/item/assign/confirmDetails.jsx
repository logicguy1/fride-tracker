import { 
    Box, 
    Typography, 
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
    Button,
    Alert,
    CircularProgress
  } from '@mui/material';
  import PersonIcon from '@mui/icons-material/Person';
  import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
  import InventoryIcon from '@mui/icons-material/Inventory';
  import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
  
  const ConfirmDetails = ({ formData, onSubmit, loading, success, error }) => {
    const formatExpiryText = (days) => {
      if (days === 1) return '1 day';
      if (days === 7) return '1 week';
      if (days === 14) return '2 weeks';
      if (days === 30) return '1 month';
      return `${days} days`;
    };
  
    return (
      <Box>
        <Typography variant="h6" gutterBottom>Confirm Details</Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Please review the details below before creating the box record.
        </Typography>
  
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}
  
        {success && (
          <Alert 
            icon={<CheckCircleOutlineIcon fontSize="inherit" />} 
            severity="success"
            sx={{ mb: 3 }}
          >
            Box record successfully created!
          </Alert>
        )}
  
        <Box 
          sx={{ 
            bgcolor: 'background.paper', 
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'divider',
            mb: 3
          }}
        >
          <List>
            <ListItem>
              <ListItemIcon>
                <InventoryIcon />
              </ListItemIcon>
              <ListItemText 
                primary="Item ID" 
                secondary={formData.item_id || 'Not specified'} 
              />
            </ListItem>
            
            <Divider component="li" />
            
            <ListItem>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText 
                primary="Owner" 
                secondary={formData.ownerName} 
              />
            </ListItem>
            
            <Divider component="li" />
            
            <ListItem>
              <ListItemIcon>
                <CalendarTodayIcon />
              </ListItemIcon>
              <ListItemText 
                primary="Expiry" 
                secondary={formatExpiryText(formData.expiry_days)} 
              />
            </ListItem>
          </List>
        </Box>
  
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={onSubmit}
            disabled={loading || success}
            sx={{ px: 4, py: 1 }}
          >
            {loading ? (
              <>
                <CircularProgress size={24} sx={{ mr: 1, color: 'inherit' }} />
                Creating...
              </>
            ) : (
              'Create Box Record'
            )}
          </Button>
        </Box>
      </Box>
    );
  };
  
  export default ConfirmDetails;