import { Chip } from '@mui/material';
import { useTheme } from "@mui/material";
import { tokens } from "../../theme.js";
import { capitalizeFirstLetter } from '../../utils/strings/capitalizeFirst';
import CircleIcon from '@mui/icons-material/Circle';

const StatusChip = ({ status }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Define color scheme based on status
  const getColorScheme = (status) => {
    switch (status) {
      case 'completed':
        return colors.greenAccent;
      case 'active':
        return colors.primary;
      case 'expired':
        return colors.redAccent;
      case 'idle':
        return colors.yellowAccent;
      default:
        return colors.grey;
    }
  };

  const colorScheme = getColorScheme(status);

  return (
    <Chip
      icon={<CircleIcon />}
      label={capitalizeFirstLetter(status)}
      sx={{
        backgroundColor: colorScheme[900],
        color: colorScheme[200],
        border: `1px solid ${colorScheme[200]}`,
        fontWeight: 600,
        '& .MuiChip-icon': {
          color: colorScheme[300],
          width: "15px"
        }
      }}
      size="small"
    />
  );
};

export default StatusChip;