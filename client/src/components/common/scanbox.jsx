import { useState } from 'react';
import { Box, TextField, IconButton, InputAdornment } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

import { useNavigate } from "react-router-dom";
import { useNetwork } from '../../hooks/useNetwork';

const Scanbox = () => {
  const { makeRequest } = useNetwork();
  const navigate = useNavigate();

  const [barcode, setBarcode] = useState("");
  const [loading, setLoading] = useState(false);

  const barcodeCallback = async (barcode) => {
    try {
      setLoading(true);
      const endpoint = `/v1/items/scan?barcode=${barcode}`;
      const data = await makeRequest(endpoint, 'get');
      console.log(data);
      navigate(`/item/${data.id}`);
    } catch (error) {
      // Error handling is managed by useNetwork hook
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (barcodeCallback) {
      barcodeCallback(barcode);
    }
  };

  const handleInputChange = (event) => {
    setBarcode(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        gap: '2rem',
        mb: '2rem'
      }}
    >
      <TextField
        id="outlined-basic"
        label="Stregkode"
        variant="outlined"
        value={barcode}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown} // 👈 listens for Enter
        sx={{ flex: 1 }}
        autoFocus // optional: focus input on load
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton aria-label="opslag" onClick={handleSearch}>
                <SearchOutlinedIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default Scanbox;
