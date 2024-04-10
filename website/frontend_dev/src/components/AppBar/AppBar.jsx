import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Rating from "@mui/material/Rating";
import LoginIcon from "@mui/icons-material/Login";
import { Link } from "react-router-dom";

const pages = ["Availability", "About", "Contact", "Policies"];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" sx={{ bgcolor: "#143c5c" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ paddingLeft: "5%", paddingRight: "5%" }}>
          <style>
            @import
            url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&display=swap')
          </style>
          <Typography
            variant="h6"
            component="a"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "Dancing Script",
              fontSize: 25,
            }}
          >
            Plaza Hotel
          </Typography>
          <Rating
            name="rating"
            value={5}
            precision={0.5}
            readOnly
            sx={{
              fontSize: "15px",
              color: "white",
              paddingRight: 5,
              display: { xs: "none", md: "flex" },
            }}
          />

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Typography
            noWrap
            component="a"
            sx={{
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "Dancing Script",
              fontSize: 30,
            }}
          >
            Plaza Hotel
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box
            sx={{
              flexGrow: 0,
              display: { xs: "none", sm: "none", md: "flex" },
            }}
          >
            <MenuItem onClick={handleCloseNavMenu}>
              <Link to="/login">
                <Typography
                  textAlign="center"
                  sx={{ color: "white", textDecoration: "none" }}
                >
                  Login
                </Typography>
              </Link>
            </MenuItem>
          </Box>
          <Box
            sx={{
              flexGrow: 0,
              display: { xs: "none", sm: "none", md: "flex" },
            }}
          >
            <MenuItem onClick={handleCloseNavMenu}>
              <Link to="/signup">
                <Typography
                  textAlign="center"
                  sx={{ color: "white", textDecoration: "none" }}
                >
                  Sign up
                </Typography>
              </Link>
            </MenuItem>
          </Box>
          <Link to="/login">
            <LoginIcon
              sx={{
                color: "white",
                flexGrow: 0,
                display: { xs: "flex", sm: "flex", md: "none" },
              }}
            ></LoginIcon>
          </Link>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
