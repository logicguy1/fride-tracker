import { useState, useEffect } from 'react';
import { 
  Box, 
  Stepper, 
  Step, 
  StepLabel, 
  Button, 
  Typography,
  Paper,
  Container
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckIcon from '@mui/icons-material/Check';

import { useNavigate } from "react-router-dom";
import { useNetwork } from '../../../hooks/useNetwork';
import SelectOwner from './selectOwner';
import SelectExpiry from './selectExpiry';
import ConfirmDetails from './confirmDetails';

const steps = ['Select Owner', 'Select Expiry', 'Confirm Details'];

const CreateBoxRecord = ({ id }) => {
  const navigate = useNavigate();
  const { makeRequest } = useNetwork();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    item_id: id, // Assuming this comes from URL or props
    owned_by: null,
    expiry_days: null,
    ownerName: '' // For display purposes
  });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
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
    };

    fetchUsers();
  }, []);

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleOwnerSelect = (userId, userName) => {
    setFormData({
      ...formData,
      owned_by: userId,
      ownerName: userName
    });
  };

  const handleExpirySelect = (days) => {
    setFormData({
      ...formData,
      expiry_days: days
    });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const payload = {
        item_id: formData.item_id,
        owned_by: formData.owned_by,
        expiry_days: formData.expiry_days
      };
      
      await makeRequest('/v1/records/', 'post', payload);
      setSubmitSuccess(true);
      
      // Reset form after successful submission
      setTimeout(() => {
        navigate(`/item/${id}`);
      }, 3000);
      
    } catch (err) {
      setError('Failed to create record. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <SelectOwner 
            users={users} 
            selectedUserId={formData.owned_by}
            onSelect={handleOwnerSelect}
            loading={loading}
          />
        );
      case 1:
        return (
          <SelectExpiry 
            selectedDays={formData.expiry_days}
            onSelect={handleExpirySelect}
          />
        );
      case 2:
        return (
          <ConfirmDetails 
            formData={formData}
            onSubmit={handleSubmit}
            loading={loading}
            success={submitSuccess}
            error={error}
          />
        );
      default:
        return 'Unknown step';
    }
  };

  // Check if we can proceed to next step
  const canProceed = () => {
    switch (activeStep) {
      case 0:
        return formData.owned_by !== null;
      case 1:
        return formData.expiry_days !== null;
      default:
        return true;
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4, mb: 4, borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom align="center" sx={{ mb: 3 }}>
          Create Box Record
        </Typography>
        
        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box sx={{ mt: 4, mb: 4 }}>
          {getStepContent(activeStep)}
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={handleBack}
            disabled={activeStep === 0 || loading}
          >
            Back
          </Button>

          {activeStep === steps.length - 1 ? (
            <Button
              variant="contained"
              color="primary"
              endIcon={<CheckIcon />}
              onClick={handleSubmit}
              disabled={loading || submitSuccess}
            >
              {loading ? 'Submitting...' : 'Create Record'}
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              endIcon={<ArrowForwardIcon />}
              onClick={handleNext}
              disabled={!canProceed() || loading}
            >
              Next
            </Button>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default CreateBoxRecord;