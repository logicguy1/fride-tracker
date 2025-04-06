import { useState, useContext, useEffect } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
// import "react-pro-sidebar/dist/css/styles.css";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme.js";

import "react-pro-sidebar/dist/css/styles.css";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = ({ setExpanded }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [isCollapsed, setIsCollapsed] = useState(true);
  const [selected, setSelected] = useState("Dashboard");

  useEffect(() => {
    setExpanded(isCollapsed);
  }, [isCollapsed])

  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        height: "100vh",
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 10px !important",
        },
        "& .pro-sub-menu > .pro-inner-item": {
          color: colors.grey[100] + " !important",
          fill: colors.grey[100] + " !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
          fill: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
          fill: "#6870fa !important",
        },
        "& .pro-inner-item:focus": {
          color: colors.grey[100],
          fill: colors.grey[100],
        },
        "& .pro-menu": {
          height: "100%",
        },
        "& ul": {
          height: "100%",
        },
        "& .pro-inner-list-item": {
          paddingLeft: !isCollapsed ? "40px !important" : "25px !important"
        },
        "& .pro-inner-list-item::before !important": {
          backgroundColor: "#f00",
          height: "40px",
          widht: "2px"
        }
      }}
    >

      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          <Box display="flex" flexDirection="column" height="100%">
            <MenuItem
              onClick={() => setIsCollapsed(!isCollapsed)}
              icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
              style={{
                margin: "10px 0 20px 0",
                color: colors.grey[100],
              }}
              sx={{
                "&*": { fill: colors.grey[100] },
              }}
            >
              {!isCollapsed && (
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  ml="15px"
                >
                  <Typography variant="h3" color={colors.grey[100]}>
                    Fridge
                  </Typography>
                  <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                    <MenuOutlinedIcon />
                  </IconButton>
                </Box>
              )}
            </MenuItem>

            {/* MENU ITEMS */}
            <Box paddingLeft={isCollapsed ? undefined : "3%"} overflow="overlay" flex="1">
              <>
                <Item
                  title="Dashboard"
                  to="/"
                  icon={<HomeOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Brugere"
                  to="/users"
                  icon={<PeopleAltOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
              </>
            </Box>
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  )
}

export default Sidebar;
