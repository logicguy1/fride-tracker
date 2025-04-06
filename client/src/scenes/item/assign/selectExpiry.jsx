import { useState } from 'react';
import { 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  CardActionArea,
  Box,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment
} from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const SelectExpiry = ({ selectedDays, onSelect }) => {
  const [customDialogOpen, setCustomDialogOpen] = useState(false);
  const [customDays, setCustomDays] = useState('');
  const [error, setError] = useState('');

  // Predefined expiry options
  const expiryOptions = [
    { days: 1, label: '1 Day' },
    { days: 3, label: '3 Days' },
    { days: 7, label: '1 Week' },
    { days: 14, label: '2 Weeks' },
    { days: 30, label: '1 Month' }
  ];

  const handleCustomDaysSubmit = () => {
    const days = parseInt(customDays, 10);
    
    if (isNaN(days) || days < 1) {
      setError('Please enter a valid number greater than 0');
      return;
    }
    
    if (days > 365) {
      setError('Maximum allowed days is 365');
      return;
    }
    
    onSelect(days);
    setCustomDialogOpen(false);
    setCustomDays('');
    setError('');
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>Select Expiry</Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Choose how long this box will be assigned to the selected person.
      </Typography>

      <Grid container spacing={2}>
        {expiryOptions.map((option) => (
          <Grid item xs={6} sm={4} md={4} key={option.days}>
            <Card 
              elevation={selectedDays === option.days ? 3 : 1}
              sx={{
                borderRadius: 2,
                borderColor: selectedDays === option.days ? 'primary.main' : 'transparent',
                borderWidth: 2,
                borderStyle: 'solid',
                height: '100%',
                position: 'relative'
              }}
            >
              <CardActionArea 
                onClick={() => onSelect(option.days)}
                sx={{ height: '100%' }}
              >
                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 3 }}>
                  <Box 
                    sx={{ 
                      bgcolor: selectedDays === option.days ? 'primary.main' : 'action.disabledBackground',
                      width: 64, 
                      height: 64,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2
                    }}
                  >
                    <CalendarTodayIcon fontSize="large" sx={{ color: selectedDays === option.days ? 'white' : 'text.primary' }} />
                  </Box>
                  <Typography variant="h6" align="center">
                    {option.label}
                  </Typography>
                  
                  {selectedDays === option.days && (
                    <Box 
                      sx={{ 
                        position: 'absolute', 
                        top: 10, 
                        right: 10,
                        color: 'primary.main'
                      }}
                    >
                      <CheckCircleIcon />
                    </Box>
                  )}
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}

        {/* Custom option */}
        <Grid item xs={6} sm={4} md={4}>
          <Card 
            elevation={1}
            sx={{
              borderRadius: 2,
              borderStyle: 'dashed',
              borderWidth: 2,
              borderColor: 'action.disabledBackground',
              height: '100%',
              bgcolor: 'background.default'
            }}
          >
            <CardActionArea 
              onClick={() => setCustomDialogOpen(true)}
              sx={{ height: '100%' }}
            >
              <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 3 }}>
                <Box 
                  sx={{ 
                    width: 64, 
                    height: 64,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2
                  }}
                >
                  <AddCircleOutlineIcon fontSize="large" color="action" />
                </Box>
                <Typography variant="h6" align="center" color="text.secondary">
                  Custom
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>

      {/* Custom days dialog */}
      <Dialog open={customDialogOpen} onClose={() => setCustomDialogOpen(false)}>
        <DialogTitle>Set Custom Expiry</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" paragraph sx={{ mt: 1 }}>
            Enter the number of days this box should be assigned.
          </Typography>
          <FormControl fullWidth error={!!error} variant="outlined">
            <InputLabel htmlFor="custom-days-input">Days</InputLabel>
            <OutlinedInput
              id="custom-days-input"
              type="number"
              value={customDays}
              onChange={(e) => {
                setCustomDays(e.target.value);
                setError('');
              }}
              endAdornment={<InputAdornment position="end">days</InputAdornment>}
              label="Days"
              autoFocus
            />
            {error && (
              <Typography color="error" variant="caption" sx={{ mt: 1 }}>
                {error}
              </Typography>
            )}
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCustomDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleCustomDaysSubmit} variant="contained">Set Days</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SelectExpiry;