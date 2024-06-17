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
import Link from "@mui/material/Link";
import { useNavigate } from "react-router-dom";
import { CustomerContext } from "../../contexts/Customer";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountMenu from "../AccountMenu/AccountMenu";

const pages = ["Availability", "About", "Contact", "Policies"];
const links = ["/available-rooms", "/about", "/contact", "/policies"];

function ResponsiveAppBar() {
  let { customer, setCustomer } = React.useContext(CustomerContext);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const navigate = useNavigate();

  const navigateTo = (event, link) => {
    navigate(link);
  };

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
              fontSize: { xs: 20, md: 30 },
            }}
          >
            <Link href="/" sx={{ textDecoration: "none", color: "White" }}>
              Plaza Hotel
            </Link>
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
              {pages.map((page, index) => (
                <MenuItem
                  key={page}
                  onClick={(e) => navigateTo(e, links[index])}
                >
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
            <Link href="/" sx={{ textDecoration: "none", color: "White" }}>
              Plaza Hotel
            </Link>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page, index) => (
              <Button
                key={page}
                onClick={(e) => navigateTo(e, links[index])}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  fontFamily: "'Roboto Condensed', sans-serif",
                  fontWeight: "bold",
                }}
              >
                {page}
              </Button>
            ))}
          </Box>
          {Object.keys(customer).length ? (
            <AccountMenu />
          ) : (
            <>
              <Box
                sx={{
                  flexGrow: 0,
                  display: { xs: "none", sm: "none", md: "flex" },
                }}
              >
                <MenuItem onClick={handleCloseNavMenu}>
                  <Link href="/login">
                    <Typography
                      textAlign="center"
                      sx={{
                        color: "white",
                        textTransform: "uppercase",
                        fontWeight: "bold",
                        textDecoration: "none",
                      }}
                    >
                      Sign In
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
                  <Link href="/signup">
                    <Typography
                      textAlign="center"
                      sx={{
                        color: "red",
                        textTransform: "uppercase",
                        fontWeight: "bold",
                        textDecoration: "none",
                      }}
                    >
                      Sign up
                    </Typography>
                  </Link>
                </MenuItem>
              </Box>
              <Link href="/login">
                <LoginIcon
                  sx={{
                    color: "white",
                    flexGrow: 0,
                    display: { xs: "flex", sm: "flex", md: "none" },
                  }}
                ></LoginIcon>
              </Link>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
