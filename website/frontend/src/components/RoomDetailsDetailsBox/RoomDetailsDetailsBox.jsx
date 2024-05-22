import React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useMediaQuery } from "@mui/material";
import Stack from "@mui/material/Stack";

const RoomDetailsDetailsBox = () => {
  const isSmallScreen = useMediaQuery("(max-width:1000px)");
  const [selected, setSelected] = React.useState(false);
  const onSelect = () => {
    setSelected(true);
  };
  return (
    <Box
      bgcolor={"#143c5c"}
      sx={{
        height: { xs: "350px", sm: "450px", md: "100%" },
        border: "1px solid #e6e6e6",
        borderRadius: "10px",
      }}
    >
      <Stack
        height={"10%"}
        sx={{
          display: "flex",
          justifyContent: "center",
          height: { xs: "20%", sm: "20%", md: "10%" },
        }}
      >
        <Typography sx={{ fontWeight: "bold", fontSize: 25, color: "white" }}>
          Room Details
        </Typography>
      </Stack>

      <Stack
        height={"90%"}
        sx={{
          bgcolor: "white",
          display: "flex",
          justifyContent: "space-around",
          height: { xs: "80%", sm: "80%", md: "90%" },
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
        <Button
          size="large"
          sx={{ bgcolor: "#143c5c", color: "white" }}
          onClick={onSelect}
        >
          Check Price
        </Button>
      </Stack>
    </Box>
  );
};

export default RoomDetailsDetailsBox;
