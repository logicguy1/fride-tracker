import { useState } from 'react';
import { Box, Typography } from '@mui/material';

import ActiveGrid from "../../components/data-display/activeList";
import ScanBox from "../../components/common/scanbox";

const UsersPage = () => {

  return (
    <Box p={2}>
      <ScanBox />
      <ActiveGrid />
    </Box>
  );
};

export default UsersPage;