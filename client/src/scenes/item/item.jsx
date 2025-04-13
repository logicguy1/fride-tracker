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
  Alert,
  Container
} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import EventIcon from '@mui/icons-material/Event';
import ScanBox from "../../components/common/scanbox";
import StatusChip from "../../components/common/statusChip";
import ItemActivities from "../../components/data-display/itemActivities";

import { useNetwork } from '../../hooks/useNetwork';
import { useNavigate } from "react-router-dom";

import InfoBox from './item/infobox';

import { useTheme } from "@mui/material";
import { tokens } from "../../theme.js";

const Item = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const { makeRequest } = useNetwork();
  const [loading, setLoading] = useState(false);
  const [dataNotFound, setDataNotFound] = useState(false);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // State for box data with correct structure
  const [boxData, setBoxData] = useState({
    id: 0,
    item_id: 0,
    owned_by: 0,
    created: "2025-04-06T12:36:56.685Z",
    expires: "2025-04-06T12:36:56.685Z",
    status: "active",
    item: {
      id: 0,
      name: "",
      description: "",
      sn: ""
    },
    owner: {
      id: 0,
      name: ""
    }
  });

  // Calculate age from created date
  const calculateAge = (createdDate) => {
    const created = new Date(createdDate);
    const now = new Date();
    const diffTime = Math.abs(now - created);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} days`;
  };

  // Format expiry date
  const formatExpiryDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setDataNotFound(false);
        const endpoint = `/v1/records/item?id=${id}`;
        const data = await makeRequest(endpoint, 'get');
        if (data !== null) {
          setBoxData(data);
        } else {
          setDataNotFound(true);
        }
      } catch (error) {
        // Error handling is managed by useNetwork hook
        setDataNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const handleFreeBox = async () => {
    try {
      setLoading(true);
      // Use the complete endpoint as per API documentation
      const endpoint = `/v1/records/${boxData.id}/complete`;
      await makeRequest(endpoint, 'put');

      // Refresh data after completing the record
      const updatedData = await makeRequest(`/v1/records/item?id=${id}`, 'get');
      if (updatedData !== null) {
        setBoxData(updatedData);
        setDataNotFound(false);
      } else {
        setDataNotFound(true);
      }
    } catch (error) {
      // Error handling is managed by useNetwork hook
    } finally {
      setLoading(false);
    }
  };

  const handleAssign = () => {
    navigate(`/item/${id}/assign`);
  }

  const renderContent = () => {
    if (loading) {
      return (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      );
    }

    if (dataNotFound) {
      return (
        <Alert
          severity="info"
          sx={{
            mt: 2,
            mb: 2,
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            '& .MuiAlert-message': {
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontWeight: 500,
            }
          }}
        >
          <Typography>The box is not currently in use.</Typography>
          <Button
            variant="contained"
            size="medium"
            onClick={handleAssign}
          >
            Assign
          </Button>
        </Alert>
      );
    }

    return (
      <InfoBox boxData={boxData} />
    );
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <ScanBox id={id} />
      <Typography variant="h6" gutterBottom>Box Details</Typography>
      <Box mb={2} />
      {renderContent()}
      <Box mb={7} />
      <Typography variant="h6" gutterBottom>History</Typography>
      <Box mb={2} />
      <ItemActivities item_id={id} />
    </Container>
  );
};

export default Item;