import { Chip } from '@mui/material';

const StatusChip = ({ status }) => {
  let color = 'default';
  let label = status;

  switch (status) {
    case 'completed':
      color = 'success';
      break;
    case 'active':
      color = 'primary';
      break;
    case 'expired':
      color = 'error';
      break;
    case 'idle':
      color = 'warning';
      break;
    default:
      color = 'default';
      break;
  }

  return <Chip label={label} color={color} size="small" />;
};

export default StatusChip;