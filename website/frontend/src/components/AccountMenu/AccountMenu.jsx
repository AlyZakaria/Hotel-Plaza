import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import { CustomerContext } from "../../contexts/Customer";
import BookOnlineOutlinedIcon from "@mui/icons-material/BookOnlineOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  let { customer, setCustomer } = React.useContext(CustomerContext);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logOut = () => {
    handleClose();
    sessionStorage.removeItem("customer");
    sessionStorage.removeItem("token");
    if (localStorage.getItem("customer") && localStorage.getItem("token")) {
      localStorage.removeItem("customer");
      localStorage.removeItem("token");
      localStorage.removeItem("remember");
    }
    localStorage.setItem("logout", Date.now());
    setCustomer({});
  };
  const ToMyReservations = () => {
    handleClose();
    navigate("/my-reservations");
  };
  const ToManageAccount = () => {
    handleClose();
    navigate("/settings");
  };
  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            {Object.keys(customer).length ? (
              <Avatar
                alt={`${customer.fname}`}
                src={
                  customer.image
                    ? `data:image/${customer.imageType};base64,${customer.image}`
                    : customer.fname
                }
                sx={{ width: 40, height: 40 }}
              />
            ) : (
              <AccountCircleIcon
                sx={{
                  color: "white",
                  fontSize: "30px",
                }}
              />
            )}

            <Typography
              sx={{
                display: { xs: "none", sm: "flex" },
                ml: 2,
                color: "white",
              }}
            >
              {customer.fname} {customer.lname}
            </Typography>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={ToManageAccount} sx={{ fontSize: "15px" }}>
          <ManageAccountsOutlinedIcon
            sx={{ fontSize: "20px ", marginRight: "10px" }}
          />
          Manage account
        </MenuItem>

        <MenuItem onClick={ToMyReservations} sx={{ fontSize: "15px" }}>
          <BookOnlineOutlinedIcon
            sx={{ fontSize: "20px ", marginRight: "10px" }}
          />
          My reservations
        </MenuItem>
        <Divider />

        <MenuItem onClick={() => logOut()}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
