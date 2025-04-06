import { useState } from 'react';
import { 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  CardActionArea,
  Box,
  Avatar,
  Skeleton,
  TextField,
  InputAdornment
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const SelectOwner = ({ users, selectedUserId, onSelect, loading }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <Box>
        <Typography variant="h6" gutterBottom>Select Owner</Typography>
        <Grid container spacing={2}>
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item}>
              <Skeleton variant="rectangular" height={100} sx={{ borderRadius: 2 }} />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>Select Owner</Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Choose the person who will be responsible for this box.
      </Typography>
      
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search users..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ mb: 3 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      <Grid container spacing={2}>
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <Grid item xs={12} sm={6} md={4} key={user.id}>
              <Card 
                elevation={selectedUserId === user.id ? 3 : 1}
                sx={{
                  borderRadius: 2,
                  borderColor: selectedUserId === user.id ? 'primary.main' : 'transparent',
                  borderWidth: 2,
                  borderStyle: 'solid',
                  height: '100%',
                  position: 'relative'
                }}
              >
                <CardActionArea 
                  onClick={() => onSelect(user.id, user.name)}
                  sx={{ height: '100%' }}
                >
                  <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 3 }}>
                    <Avatar 
                      sx={{ 
                        bgcolor: selectedUserId === user.id ? 'primary.main' : 'action.disabledBackground',
                        width: 64, 
                        height: 64,
                        mb: 2
                      }}
                    >
                      <PersonIcon fontSize="large" />
                    </Avatar>
                    <Typography variant="h6" align="center">
                      {user.name}
                    </Typography>
                    
                    {selectedUserId === user.id && (
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
          ))
        ) : (
          <Grid item xs={12}>
            <Typography align="center" color="text.secondary">
              No users found matching "{searchQuery}"
            </Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default SelectOwner;