import React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useMediaQuery } from "@mui/material";
import Stack from "@mui/material/Stack";
import useGetRoomDetailBox from "../../hooks/useGetRoomDetailBox";

const RoomDetailsDetailsBox = ({ details }) => {
  // State to hold room details
  const [roomDetails, setRoomDetails] = React.useState();
  useGetRoomDetailBox(setRoomDetails);
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
          textAlign: "left",
          height: { xs: "80%", sm: "80%", md: "90%" },
          padding: "0 10%",
          borderRadius: "0 0 9px 9px",
        }}
      >
        <Typography sx={{ fontSize: isSmallScreen ? "14px" : "16px" }}>
          Room Name: {details.name}
        </Typography>
        <Typography sx={{ fontSize: isSmallScreen ? "14px" : "16px" }}>
          Capacity: {details.capacity}
        </Typography>
        <Typography sx={{ fontSize: isSmallScreen ? "14px" : "16px" }}>
          View: {details.view}
        </Typography>
        <Typography sx={{ fontSize: isSmallScreen ? "14px" : "16px" }}>
          Bed Type: {details.bed}
        </Typography>
        <Typography sx={{ fontSize: isSmallScreen ? "14px" : "16px" }}>
          Room Size: {details.size}m²
        </Typography>
        <Typography sx={{ fontSize: isSmallScreen ? "14px" : "16px" }}>
          Starts at: {details.pricepernight}EGP/night
        </Typography>
        <Button
          size="large"
          sx={{ bgcolor: "#143c5c", color: "white" }}
          onClick={onSelect}
        >
          Book
        </Button>
      </Stack>
    </Box>
  );
};

export default RoomDetailsDetailsBox;
