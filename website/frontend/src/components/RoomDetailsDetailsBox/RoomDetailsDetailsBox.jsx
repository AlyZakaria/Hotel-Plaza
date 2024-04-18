import React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useMediaQuery } from "@mui/material";
import Stack from "@mui/material/Stack";

const RoomDetailsDetailsBox = () => {
  const isSmallScreen = useMediaQuery("(max-width:1000px)");
  return (
    <Box
      bgcolor={"red"}
      sx={{
        height: "100%",
      }}
    >
      <Stack
        height={"10%"}
        sx={{
          display: "flex",
          justifyContent: "center",
          height: { sm: "20%", md: "10%" },
        }}
      >
        <Typography sx={{ fontWeight: "bold", fontSize: 25 }}>
          Room Details
        </Typography>
      </Stack>

      <Stack
        height={"90%"}
        sx={{
          bgcolor: "white",
          display: "flex",
          justifyContent: "space-around",
          height: { sm: "80%", md: "90%" },
          padding: "0 10%",
        }}
      >
        <Typography sx={{ fontSize: isSmallScreen ? "14px" : "16px" }}>
          Capacity: 2 adults
        </Typography>
        <Typography sx={{ fontSize: isSmallScreen ? "14px" : "16px" }}>
          View: Sea View
        </Typography>
        <Typography sx={{ fontSize: isSmallScreen ? "14px" : "16px" }}>
          Starts at: 1000EGP/Night{" "}
        </Typography>
        <TextField label="Check In" size="small"></TextField>
        <TextField label="Check Out" size="small"></TextField>

        <Button size="small" sx={{ bgcolor: "blue", color: "white" }}>
          Check Price
        </Button>
      </Stack>
    </Box>
  );
};

export default RoomDetailsDetailsBox;
