import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  Chip,
  IconButton,
  CircularProgress,
  Alert
} from '@mui/material';

import { useNetwork } from '../../hooks/useNetwork';
import CreateBoxRecord from './assign/createBoxRecord';

import { capitalizeFirstLetter } from '../../utils/strings/capitalizeFirst';

const AssignItem = () => {
  const { id } = useParams();

  const renderContent = () => {
    return (
        <CreateBoxRecord id={id} />
    )
  };

  return (
    <Box p={2}>
      {renderContent()}
    </Box>
  );
};

export default AssignItem;