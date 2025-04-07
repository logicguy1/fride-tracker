import React, { useState, useRef } from 'react';
import { Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider, Box } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import './App.css';

// Context Providers
import { HeadProvider } from './context/HeadContext';
import { SnackBarProvider } from './context/SnackBarContext';

// Hooks
import { useScreenshot } from 'use-react-screenshot';

// Components
import Sidebar from "./scenes/global/sidebar";
import Topbar from "./scenes/global/topbar";
import Dashboard from './scenes/dashboard/dashboard';
import Item from './scenes/item/item';
import AssignItem from './scenes/item/assign';

import Recipe from './scenes/recipe/recipe';
import RecipeList from './scenes/recipe/recipeList';

const App = () => {
  // Theme and color mode
  const [theme, colorMode] = useMode();

  // State management
  const [headerData, setHeaderData] = useState({ location: ["FrNet", "Dashboard"] });
  const [expanded, setExpanded] = useState(false);
  const [snackText, setSnackText] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Screenshot functionality
  const appRef = useRef(null);
  const [image, takeScreenshot] = useScreenshot();

  return (
    <HeadProvider value={{ data: headerData, setData: setHeaderData, expanded }}>
      <SnackBarProvider value={{ text: snackText, setText: setSnackText }}>
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box
              className="App"
              display="flex"
              height="100%"
              ref={appRef}
            >
              {/*<Sidebar setExpanded={setExpanded} />*/}
              <Box>
                <Topbar drawerOpen={expanded} setDrawerOpen={setExpanded} />
                <Box component="main" sx={{
                  flexGrow: 1,
                  p: 3,
                  mt: '52px', // Height of AppBar
                  width: { sm: `calc(100vw - ${expanded ? '240px' : '0px'})` },
                  ml: { sm:expanded ? '240px' : '0px' },
                  transition: theme.transitions.create(['margin', 'width'], {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                  }),
                }}>
                  <Routes>
                    {/* Routes will be added here */}
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/item/:id" element={<Item />} />
                    <Route path="/item/:id/assign" element={<AssignItem />} />
                    <Route path="/recipes" element={<RecipeList />} />
                    <Route path="/recipe/:id" element={<Recipe />} />
                  </Routes>
                </Box>
              </Box>
            </Box>
          </ThemeProvider>
        </ColorModeContext.Provider>
      </SnackBarProvider>
    </HeadProvider>
  );
};

export default App;