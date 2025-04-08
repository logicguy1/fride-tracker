import { 
  AppBar, 
  Box, 
  IconButton, 
  useTheme, 
  Typography, 
  Tooltip, 
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  ListItemButton, 
  Divider,
  useMediaQuery
} from "@mui/material";
import { useContext, useState } from "react";
import { ColorModeContext, tokens } from "../../theme.js";
import { useNavigate, Link } from "react-router-dom";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { HeadContext } from '../../context/HeadContext';

// Import your sidebar menu items/icons here
// For example:
import DashboardIcon from '@mui/icons-material/Dashboard';
import KitchenIcon from '@mui/icons-material/Kitchen';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const ResponsiveAppBar = ({ drawerOpen, setDrawerOpen }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate();
  const headSettings = useContext(HeadContext);
  
  // Menu items for the drawer
  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'My Fridge', icon: <KitchenIcon />, path: '/fridge' },
    { text: 'Recipes', icon: <RestaurantIcon />, path: '/recipes' },
    { text: 'Shopping List', icon: <ShoppingCartIcon />, path: '/shopping' },
  ];

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <AppBar 
        position="fixed" 
        sx={{
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          boxShadow: 1,
          zIndex: theme.zIndex.drawer + 1
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          height="100%"
          p={1}
          pl={5}
          pr={2}
        >
          {/* MENU BUTTON AND TITLE */}
          <Box display="flex" alignItems="center">
            <IconButton 
              edge="start" 
              color="inherit" 
              aria-label="menu" 
              onClick={toggleDrawer}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {headSettings.data?.title || "Smart Fridge"}
            </Typography>
          </Box>

          {/* RIGHT SIDE ICONS */}
          <Box display="flex">
            <Tooltip title={`Switch to ${theme.palette.mode === 'dark' ? 'light' : 'dark'} theme`}>
              <IconButton onClick={colorMode.toggleColorMode} color="inherit">
                {theme.palette.mode === "dark" ? (
                  <DarkModeOutlinedIcon />
                ) : (
                  <LightModeOutlinedIcon />
                )}
              </IconButton>
            </Tooltip>
            <Tooltip title="Notifications">
              <IconButton color="inherit">
                <NotificationsOutlinedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Settings">
              <IconButton color="inherit">
                <SettingsOutlinedIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </AppBar>
      
      {/* Navigation Drawer */}
      <Drawer
        variant={"temporary"}
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer}
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            marginTop: '52px', // Height of AppBar
            height: 'calc(100% - 52px)', // Subtract AppBar height
          },
        }}
      >
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {menuItems.map((item) => (
              <ListItem 
                key={item.text} 
                disablePadding
                onClick={() => {
                  navigate(item.path);
                  setDrawerOpen(false);
                }}
              >
                <ListItemButton>
                  <ListItemIcon sx={{ 
                    color: theme.palette.text.secondary
                  }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          
        </Box>
      </Drawer>
    </>
  );
};

export default ResponsiveAppBar;