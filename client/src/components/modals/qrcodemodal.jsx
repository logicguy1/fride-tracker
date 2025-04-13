import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Modal,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { QRCodeCanvas } from 'qrcode.react';
import { useParams, useNavigate } from 'react-router-dom';
import { useNetwork } from '../../hooks/useNetwork';

// QR Code Modal Component
const QRCodeModal = ({ open, handleClose, url, title }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="qr-code-modal"
      aria-describedby="scan-qr-code-with-phone"
    >
      <Paper
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 320,
          p: 4,
          borderRadius: 2,
          outline: 'none',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" component="h2">
            Scan QR Code
          </Typography>
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {title}
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <QRCodeCanvas value={url} size={220} level="H" />
        </Box>
        
        <Typography variant="body2" sx={{ mt: 1, textAlign: 'center', wordBreak: 'break-all' }}>
          {url}
        </Typography>
      </Paper>
    </Modal>
  );
};

export default QRCodeModal;