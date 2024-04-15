import * as React from "react";
import Button from "@mui/material/Button";
import KeyIcon from "@mui/icons-material/Key";
import AppBar from "../../components/AppBar/AppBar";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import Box from "@mui/material/Box";

export default function userSettings() {
  return (
    <div>
      <AppBar></AppBar>
      <Box
        sx={{
          width: "100%",
          height: "90vh",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          component="section"
          sx={{
            width: "20%",
            p: 2,
            border: "1px dashed grey",
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Button
            variant="outlined"
            sx={{ width: "90%" }}
            startIcon={<KeyIcon />}
          >
            Change Password
          </Button>
          <Button
            variant="outlined"
            sx={{ width: "90%" }}
            startIcon={<DriveFileRenameOutlineIcon />}
          >
            Change Name
          </Button>
          <Button
            variant="outlined"
            sx={{ width: "90%" }}
            startIcon={<LocalPhoneIcon />}
          >
            Change Phone Number
          </Button>
        </Box>
      </Box>
    </div>
  );
}
