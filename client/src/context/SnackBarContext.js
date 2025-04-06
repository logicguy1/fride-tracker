// src/context/SnackBarContext.js
import React, { createContext, useContext, useState } from "react";
import { Snackbar, Alert } from "@mui/material";

export const SnackBarContext = createContext();

export const SnackBarProvider = ({ children }) => {
  const [snackState, setSnackState] = useState({
    open: false,
    message: "",
    severity: "info"
  });

  const showSnackBar = (message, severity = "info") => {
    setSnackState({ 
      open: true, 
      message, 
      severity 
    });
  };

  const hideSnackBar = () => {
    setSnackState(prev => ({ ...prev, open: false }));
  };

  return (
    <SnackBarContext.Provider value={{ showSnackBar }}>
      {children}
      <Snackbar
        open={snackState.open}
        autoHideDuration={6000}
        onClose={hideSnackBar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={hideSnackBar}
          severity={snackState.severity}
          sx={{ width: '100%' }}
        >
          {snackState.message}
        </Alert>
      </Snackbar>
    </SnackBarContext.Provider>
  );
};

export const useSnackBar = () => {
  const context = useContext(SnackBarContext);
  if (!context) {
    throw new Error('useSnackBar must be used within a SnackBarProvider');
  }
  return context;
};