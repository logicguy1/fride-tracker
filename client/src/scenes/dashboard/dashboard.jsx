import { useState } from 'react';
import { Box, Typography, Container } from '@mui/material';

import ActiveGrid from "../../components/data-display/activeList";
import ScanBox from "../../components/common/scanbox";

const UsersPage = () => {

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <ScanBox />
      <ActiveGrid />
    </Container>
  );
};

export default UsersPage;