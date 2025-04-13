import { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  Divider,
  Stack,
  Chip
} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import EventIcon from '@mui/icons-material/Event';
import AssignmentIcon from '@mui/icons-material/Assignment';
import QrCodeIcon from '@mui/icons-material/QrCode';
import { useTheme } from "@mui/material/styles";

// This is a redesigned version of the Box Details component using MUI styling
export default function RedesignedInfoBox({ boxData }) {
  const theme = useTheme();

  const calculateAge = (createdDate) => {
    const created = new Date(createdDate);
    const now = new Date();
    const diffTime = Math.abs(now - created);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} days`;
  };

  const formatExpiryDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Custom status chip using MUI styling
  const StatusChip = ({ status }) => {
    const getStatusColor = () => {
      switch (status.toLowerCase()) {
        case 'active': return theme.palette.success.main;
        case 'expired': return theme.palette.error.main;
        case 'idle': return theme.palette.warning.main;
        default: return theme.palette.grey[500];
      }
    };

    return (
      <Chip
        label={status.charAt(0).toUpperCase() + status.slice(1)}
        sx={{
          bgcolor: getStatusColor(),
          color: '#fff',
          fontWeight: 'medium',
          borderRadius: '16px'
        }}
      />
    );
  };

  return (
    <Box>
      <Paper sx={{
        borderRadius: 2,
        overflow: 'hidden',
        border: `1px solid ${theme.palette.primary.light}`,
        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.primary[900] : theme.palette.primary[50],
      }}>
        {/* Header with most important information */}
        <Box sx={{ bgcolor: theme.palette.primary.main, color: 'white', p: 2 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={7} sm={8}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <QrCodeIcon fontSize="small" />
                <Typography variant="h6" sx={{ fontWeight: 500 }}>
                  Serial Number: {boxData.item.sn}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={5} sm={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <StatusChip status={boxData.status} />
            </Grid>
          </Grid>
        </Box>

        {/* Content area */}
        <Box sx={{ p: 3 }}>
          <Grid container spacing={3}>
            {/* Left column */}
            <Grid item xs={12} md={8}>
              <Stack spacing={2}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <PersonOutlineIcon sx={{ color: theme.palette.primary.main }} />
                  <Typography variant="body1">
                    <Box component="span" sx={{ color: theme.palette.text.secondary }}>Owner:</Box>{' '}
                    <Box component="span" sx={{ fontWeight: 500 }}>{boxData.owner.name}</Box>
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <AccessTimeIcon sx={{ color: theme.palette.primary.main }} />
                  <Typography variant="body1">
                    <Box component="span" sx={{ color: theme.palette.text.secondary }}>Age:</Box>{' '}
                    <Box component="span" sx={{ fontWeight: 500 }}>{calculateAge(boxData.created)}</Box>
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <EventIcon sx={{ color: theme.palette.primary.main }} />
                  <Typography variant="body1">
                    <Box component="span" sx={{ color: theme.palette.text.secondary }}>Expires:</Box>{' '}
                    <Box component="span" sx={{ fontWeight: 500 }}>{formatExpiryDate(boxData.expires)}</Box>
                  </Typography>
                </Box>
              </Stack>
            </Grid>

            {/* Right column - action area */}
            <Grid item xs={12} md={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
              <Box sx={{ width: { xs: '100%', md: 'auto' }, display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Button
                  variant="contained"
                  startIcon={<DeleteOutlineIcon />}
                  disabled={boxData.status !== 'active'}
                  sx={{
                    bgcolor: theme.palette.error.main,
                    '&:hover': {
                      bgcolor: theme.palette.error.dark
                    },
                    width: { xs: '100%', md: 'auto' }
                  }}
                >
                  Free Box
                </Button>

                <Button
                  variant="outlined"
                  startIcon={<AssignmentIcon />}
                  sx={{
                    borderColor: theme.palette.primary.main,
                    color: theme.palette.primary.main,
                    '&:hover': {
                      bgcolor: theme.palette.primary[50]
                    },
                    width: { xs: '100%', md: 'auto' }
                  }}
                >
                  Reassign
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
}