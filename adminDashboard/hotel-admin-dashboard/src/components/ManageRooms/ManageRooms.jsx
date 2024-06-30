// src/ManageRooms.js
import React, { useState, useEffect } from "react";
import { Paper, Typography, Button, TextField, Box } from "@mui/material";
import useGetRooms from "../../hooks/useGetRooms";
import useLockRoom from "../../hooks/useLockRoom";
import useUnlockRoom from "../../hooks/useUnlockRoom";
import useMakeRoomOffline from "../../hooks/useMakeRoomOffline";
import useRemoveRoomOffline from "../../hooks/useRemoveRoomOffline";

const ManageRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [lock, setLock] = useState(false);
  const [unlock, setUnlock] = useState(false);
  const [makeOffline, setMakeOffline] = useState(false);
  const [removeOffline, setRemoveOffline] = useState(false);

  const [room, setRoom] = useState({});

  useGetRooms(setRooms);
  useLockRoom(room, setRoom, lock, setLock);
  useUnlockRoom(room, setRoom, unlock, setUnlock);

  useMakeRoomOffline(room, setRoom, makeOffline, setMakeOffline);
  useRemoveRoomOffline(room, setRoom, removeOffline, setRemoveOffline);
  useEffect(() => {
    setFilteredRooms(
      rooms.filter(
        (room) =>
          room.room_id
            .toString()
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          room.roomType.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, rooms]);

  return (
    <div>
      <Typography variant="h5">Manage Rooms</Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "16px",
        }}
      >
        <TextField
          label="Search Rooms"
          variant="outlined"
          margin="normal"
          value={searchTerm}
          width="400px"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>

      {filteredRooms.map((room, index) => (
        <Paper
          key={index}
          elevation={2}
          style={{ padding: "16px", marginBottom: "16px" }}
        >
          <Typography variant="h6">Room {room.room_id}</Typography>
          <Typography color="textSecondary">{room.roomType.name}</Typography>

          {room.access == "online_accessible" ? (
            <Button
              variant="outlined"
              color="primary"
              style={{ marginRight: "8px" }}
              onClick={() => {
                setRoom(room);
                setMakeOffline(true);
              }}
            >
              make offline accessible
            </Button>
          ) : (
            <Button
              variant="outlined"
              color="primary"
              style={{ marginRight: "8px" }}
              onClick={() => {
                setRoom(room);
                setRemoveOffline(true);
              }}
            >
              remove offline accessible
            </Button>
          )}

          {room.status == "in_service" ? (
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => {
                setRoom(room);
                setLock(true);
              }}
            >
              Lock Room
            </Button>
          ) : (
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => {
                setRoom(room);
                setUnlock(true);
              }}
            >
              Unlock Room
            </Button>
          )}
        </Paper>
      ))}
    </div>
  );
};

export default ManageRooms;
