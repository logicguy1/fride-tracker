import { useState } from 'react';
import axios from 'axios';
import { useSnackBar } from '../context/SnackBarContext';
import { capitalizeFirstLetter } from '../utils/strings/capitalizeFirst';

export const useNetwork = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { showSnackBar } = useSnackBar();

  const makeRequest = async (endpoint, method = 'get', data = null, config = {}, hideSnack = false) => {
    setLoading(true);
    setError(null);

    const requestConfig = {
      ...config,
      url: "http://localhost:8000/api" + endpoint,
      method,
      data,
    };

    try {
      const response = await axios(requestConfig);
      setLoading(false);
      return response.data;
    } catch (err) {
      setLoading(false);
      handleError(err, hideSnack);
      throw err;
    }
  };

  const handleError = (err, hideSnack) => {
    if (err.response?.data?.error_code) {
      const { error_code, message } = err.response.data;
      if (!hideSnack) {
        showSnackBar(capitalizeFirstLetter(message), 'error');
      }
      setError({ error_code, message });
    } else {
      if (!hideSnack) {
        showSnackBar(
          capitalizeFirstLetter(err.message) || 'An unexpected error occurred',
          'error'
        );
      }
      setError({
        error_code: 'NETWORK_ERROR',
        message: err.message
      });
    }
  };

  return { makeRequest, loading, error };
};
