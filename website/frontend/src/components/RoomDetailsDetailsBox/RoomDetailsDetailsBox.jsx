import React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useMediaQuery } from "@mui/material";
import Stack from "@mui/material/Stack";
import useGetRoomDetailBox from "../../hooks/useGetRoomDetailBox";
import { useContext } from "react";
import { selectedRoomsContext } from "../../contexts/selectedRooms";
import { useNavigate } from "react-router-dom";
import { RoomsContext } from "../../contexts/Rooms.js";

const RoomDetailsDetailsBox = ({ details }) => {
  // State to hold room details
  const [roomDetails, setRoomDetails] = React.useState({});
  let { selectedRooms, setSelectedRooms } =
    React.useContext(selectedRoomsContext);
  const { rooms, setRooms } = useContext(RoomsContext);

  useGetRoomDetailBox(setRoomDetails);
  const isSmallScreen = useMediaQuery("(max-width:1000px)");
  const [selected, setSelected] = React.useState(false);
  const navigate = useNavigate();

  const onSelect = () => {
    console.log(details);
    // get the index of the roomId from the rooms array
    console.log(rooms);
    let index = rooms.findIndex((room) => room.roomtypeId === details.id);
    let roomType = rooms[index];
    index = selectedRooms.findIndex(
      (selectedRoom) => selectedRoom.roomtypeId === roomType.roomtypeId
    );
    if (index !== -1) {
      const newSelectedRooms = [...selectedRooms];
      newSelectedRooms[index].count += 1;
      // change the price
      if (newSelectedRooms[index].hasOwnProperty("totalAfterDiscount"))
        newSelectedRooms[index].sum =
          newSelectedRooms[index].totalAfterDiscount *
          newSelectedRooms[index].count;
      else {
        newSelectedRooms[index].sum =
          newSelectedRooms[index].total * newSelectedRooms[index].count;
      }
      setSelectedRooms([...newSelectedRooms]);
    } else
      setSelectedRooms([
        ...selectedRooms,
        {
          ...roomType,
          count: 1,
          sum: roomType.totalAfterDiscount || roomType.total,
        },
      ]);
    navigate("/available-rooms");
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
