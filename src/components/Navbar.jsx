import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Box,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";

import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Products", path: "/products" },
    { label: "Login", path: "/login" },
    { label: "Register", path: "/register" },
  ];

  const toggleDrawer = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor: "#FFFFFF",
          borderBottom: "1px solid #EDEDED",
          color: "#111215",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            disableGutters
            sx={{
              minHeight: "76px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {/* Logo */}
            <Typography
              component={Link}
              to="/"
              sx={{
                textDecoration: "none",
                color: "#111215",
                fontSize: "1.7rem",
                fontWeight: 800,
                letterSpacing: "-0.04em",
              }}
            >
              Tech<span style={{ color: "#C85A32" }}>Hive</span>
            </Typography>

            {/* Desktop Navigation */}
            <Box
              sx={{
                display: {
                  xs: "none",
                  md: "flex",
                },
                alignItems: "center",
                gap: 1,
              }}
            >
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;

                return (
                  <Button
                    key={item.path}
                    component={Link}
                    to={item.path}
                    sx={{
                      color: isActive ? "#C85A32" : "#111215",
                      fontWeight: isActive ? 700 : 500,
                      textTransform: "none",
                      fontSize: "0.95rem",
                      px: 1.5,
                      position: "relative",

                      "&:hover": {
                        backgroundColor: "transparent",
                        color: "#C85A32",
                      },

                      "&::after": isActive
                        ? {
                            content: '""',
                            position: "absolute",
                            bottom: "4px",
                            left: "20%",
                            width: "60%",
                            height: "2px",
                            backgroundColor: "#C85A32",
                          }
                        : {},
                    }}
                  >
                    {item.label}
                  </Button>
                );
              })}

              {/* Cart */}
              <IconButton
                component={Link}
                to="/cart"
                sx={{
                  ml: 1,
                  color:
                    location.pathname === "/cart"
                      ? "#C85A32"
                      : "#111215",

                  "&:hover": {
                    backgroundColor: "#F8F9FA",
                    color: "#C85A32",
                  },
                }}
              >
                <Badge
                  badgeContent={0}
                  sx={{
                    "& .MuiBadge-badge": {
                      backgroundColor: "#C85A32",
                      color: "#FFFFFF",
                    },
                  }}
                >
                  <ShoppingCartOutlinedIcon />
                </Badge>
              </IconButton>
            </Box>

            {/* Mobile Buttons */}
            <Box
              sx={{
                display: {
                  xs: "flex",
                  md: "none",
                },
                alignItems: "center",
              }}
            >
              <IconButton
                component={Link}
                to="/cart"
                sx={{
                  color: "#111215",
                  mr: 1,
                }}
              >
                <ShoppingCartOutlinedIcon />
              </IconButton>

              <IconButton
                onClick={toggleDrawer}
                sx={{
                  color: "#111215",
                }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Navigation Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={toggleDrawer}
        PaperProps={{
          sx: {
            width: "280px",
            backgroundColor: "#FFFFFF",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 3,
            py: 2,
            borderBottom: "1px solid #EDEDED",
          }}
        >
          <Typography
            sx={{
              fontSize: "1.4rem",
              fontWeight: 800,
              color: "#111215",
            }}
          >
            Tech<span style={{ color: "#C85A32" }}>Hive</span>
          </Typography>

          <IconButton onClick={toggleDrawer}>
            <CloseIcon />
          </IconButton>
        </Box>

        <List sx={{ px: 2, pt: 2 }}>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <ListItem key={item.path} disablePadding>
                <ListItemButton
                  component={Link}
                  to={item.path}
                  onClick={toggleDrawer}
                  sx={{
                    mb: 1,
                    borderLeft: isActive
                      ? "3px solid #C85A32"
                      : "3px solid transparent",

                    backgroundColor: isActive
                      ? "#F8F9FA"
                      : "transparent",

                    "&:hover": {
                      backgroundColor: "#F8F9FA",
                    },
                  }}
                >
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontWeight: isActive ? 700 : 500,
                      color: isActive ? "#C85A32" : "#111215",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Drawer>
    </>
  );
}

export default Navbar;