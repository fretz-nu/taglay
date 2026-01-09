import React, { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { styled, useTheme, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import AssessmentIcon from "@mui/icons-material/Assessment";
import Button from "@mui/material/Button";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import ArticleIcon from "@mui/icons-material/Article";
import logo from "../assets/react.svg";
import { Stack } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import hackerTheme from "../theme/hackerTheme";
import "../styles/AdminPanel.css";
import { AdminSearchProvider, useAdminSearch } from "../context/AdminSearchContext.jsx";
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: "rgba(0, 0, 0, 0.95)",
  backdropFilter: "blur(4px)",
  borderBottom: "1px solid #00ff00",
  boxShadow: "0 0 20px rgba(0, 255, 0, 0.2), inset 0 0 20px rgba(0, 255, 0, 0.05)",
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": {
      ...openedMixin(theme),
      backgroundColor: "#0a0f0a",
      borderRight: "1px solid #00ff00",
      backgroundImage: "repeating-linear-gradient(0deg, rgba(0, 255, 0, 0.03) 0px, rgba(0, 255, 0, 0.03) 1px, transparent 1px, transparent 2px)",
      backgroundSize: "100% 4px",
    },
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": {
      ...closedMixin(theme),
      backgroundColor: "#0a0f0a",
      borderRight: "1px solid #00ff00",
      backgroundImage: "repeating-linear-gradient(0deg, rgba(0, 255, 0, 0.03) 0px, rgba(0, 255, 0, 0.03) 1px, transparent 1px, transparent 2px)",
      backgroundSize: "100% 4px",
    },
  }),
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#00cc00",
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "4px",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  border: "1px solid #008800",
  "&:hover": {
    backgroundColor: "rgba(0, 255, 0, 0.05)",
    borderColor: "#00ff00",
    boxShadow: "0 0 15px rgba(0, 255, 0, 0.3)",
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "#00ff00",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    fontFamily: '"Space Mono", monospace',
    color: "#00ff00",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const getPageTitle = (pathname) => {
  switch (pathname) {
    case "/dashboard/dash-articles":
      return "Intel";
    case "/dashboard/users":
      return "Users";
    default:
      return "Welcome";
  }
};

// AppBar Content Component with Search
const AppBarContent = ({ open, handleDrawerToggle, name, handleLogout }) => {
  const { searchQuery, setSearchQuery } = useAdminSearch();

  return (
    <Toolbar>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerToggle}
        edge="start"
        sx={{ marginRight: 5, ...open }}
      >
        {open ? <MenuOpenIcon /> : <MenuIcon />}
      </IconButton>
      <Typography
        variant="h6"
        noWrap
        component="div"
        sx={{
          flexGrow: 1,
          fontFamily: '"Share Tech Mono", monospace',
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          color: "#00ff00",
          textShadow: "0 0 10px rgba(0, 255, 0, 0.5)"
        }}
      >
        Welcome, {name}
      </Typography>
      {/* Search */}
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          inputProps={{ "aria-label": "search" }}
        />
      </Search>
      <Button
        variant="outlined"
        onClick={handleLogout}
        sx={{
          fontFamily: '"Share Tech Mono", monospace',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          fontWeight: 600,
          borderWidth: '1px',
          borderStyle: 'solid',
          borderRadius: '2px',
          transition: 'all 0.18s ease',
          borderColor: '#00cc00',
          color: '#00cc00',
          '&:hover': {
            backgroundColor: 'rgba(0, 255, 0, 0.1)',
            borderColor: '#00ff00',
            color: '#00ff88',
          },
        }}
      >
        Logout
      </Button>
    </Toolbar>
  );
};

const DashLayout = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const name =
    location.state?.firstName || localStorage.getItem("firstName") || "User";
  const userType = location.state?.type || localStorage.getItem("type");
  const pageTitle = getPageTitle(location.pathname);
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <ThemeProvider theme={hackerTheme}>
      <AdminSearchProvider>
        <Box className="admin-panel-container" sx={{ display: "flex", minHeight: "100vh" }}>
          <CssBaseline />
          {/* App Bar */}
          <AppBar position="fixed">
            <AppBarContent
              open={open}
              handleDrawerToggle={handleDrawerToggle}
              name={name}
              handleLogout={handleLogout}
            />
          </AppBar>
        {/* Drawer */}
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          {/* Drawer List */}
          <List>
            <ListItem disablePadding sx={{ display: "block" }}>
              <ListItemButton
                component={Link}
                to="/dashboard/dash-articles"
                selected={location.pathname === "/dashboard/dash-articles"}
                sx={{
                  borderRadius: "4px",
                  margin: "4px 8px",
                  "&:hover": {
                    backgroundColor: "rgba(0, 255, 0, 0.1)",
                  },
                  "&.Mui-selected": {
                    backgroundColor: "rgba(0, 255, 0, 0.15)",
                    border: "1px solid #00ff00",
                    "&:hover": {
                      backgroundColor: "rgba(0, 255, 0, 0.2)",
                    },
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: "#00ff00",
                  }}
                >
                  <ArticleIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Intel"
                  sx={{
                    "& .MuiTypography-root": {
                      fontFamily: '"Share Tech Mono", monospace',
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      color: "#00ff00",
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
            {/* <>
              <ListItem disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  component={Link}
                  to="/dashboard/users"
                  selected={location.pathname === "/dashboard/users"}
                >
                  <ListItemIcon>
                    <PeopleIcon />
                  </ListItemIcon>
                  <ListItemText primary="Users" />
                </ListItemButton>
              </ListItem>
            </> */}
            {userType === "admin" && (
              <>
                <ListItem disablePadding sx={{ display: "block" }}>
                  <ListItemButton
                    component={Link}
                    to="/dashboard/users"
                    selected={location.pathname === "/dashboard/users"}
                    sx={{
                      borderRadius: "4px",
                      margin: "4px 8px",
                      "&:hover": {
                        backgroundColor: "rgba(0, 255, 0, 0.1)",
                      },
                      "&.Mui-selected": {
                        backgroundColor: "rgba(0, 255, 0, 0.15)",
                        border: "1px solid #00ff00",
                        "&:hover": {
                          backgroundColor: "rgba(0, 255, 0, 0.2)",
                        },
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color: "#00ff00",
                      }}
                    >
                      <PeopleIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Users"
                      sx={{
                        "& .MuiTypography-root": {
                          fontFamily: '"Share Tech Mono", monospace',
                          textTransform: "uppercase",
                          letterSpacing: "0.1em",
                          color: "#00ff00",
                        },
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              </>
            )}
          </List>
        </Drawer>
        <Box component="main" className="admin-main-content" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          {/* Content */}
          <Outlet />
        </Box>
      </Box>
      </AdminSearchProvider>
    </ThemeProvider>
  );
};

export default DashLayout;
