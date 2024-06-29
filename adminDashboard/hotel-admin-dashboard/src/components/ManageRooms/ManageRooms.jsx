// src/ManageRooms.js
import React from "react";
import { Paper, Typography, Button } from "@mui/material";
import { useState } from "react";
import useGetRooms from "../../hooks/useGetRooms";
const ManageRooms = () => {
  const [rooms, setRooms] = useState([]);
  // let rooms = [
  //   {
  //     name: "Room 101",
  //     type: "Single Room",
  //   },
  //   {
  //     name: "Room 102",
  //     type: "Double Room",
  //   },
  //   {
  //     name: "Room 103",
  //     type: "Triple Room",
  //   },
  //   {
  //     name: "Room 104",
  //     type: "Quad Room",
  //   },
  // ];
  useGetRooms(setRooms);
  return (
    <div>
      <Typography variant="h5">Manage Rooms</Typography>
      {rooms.map((room, index) => (
        <Paper
          key={index}
          elevation={2}
          style={{ padding: "16px", marginBottom: "16px" }}
        >
          <Typography variant="h6">Room {room.room_id}</Typography>

          <Typography color="textSecondary">{room.roomType.name}</Typography>
          <Button
            variant="outlined"
            color="primary"
            style={{ marginRight: "8px" }}
          >
            Edit
          </Button>
          <Button variant="outlined" color="secondary">
            Lock
          </Button>
        </Paper>
      ))}
    </div>
  );
};

export default ManageRooms;
