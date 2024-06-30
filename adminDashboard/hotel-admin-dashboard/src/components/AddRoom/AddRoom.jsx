// src/AddRoom.js
import React, { useState, useContext } from "react";
import {
  Paper,
  Typography,
  TextField,
  Button,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
} from "@mui/material";
import useGetRoomTypes from "../../hooks/useGetRoomTypes";
import { ActiveContext } from "../../contexts/active";
import useAddRoom from "../../hooks/useAddRoom";

const AddRoom = () => {
  const [roomTypes, setRoomTypes] = useState([]);
  const [roomNumber, setRoomNumber] = useState("");
  const [roomType, setRoomType] = useState("");
  const [status, setStatus] = useState("active");
  let { active, setActive } = useContext(ActiveContext);
  const [add, setAdd] = useState(false);

  useGetRoomTypes(setRoomTypes);

  useAddRoom(add, setAdd, roomNumber, roomTypes, roomType, status, setActive);
  return (
    <Paper elevation={2} style={{ padding: "16px", marginBottom: "16px" }}>
      <Typography variant="h5">Add New Room</Typography>
      <form>
        <TextField
          label="Room Number"
          variant="outlined"
          fullWidth
          margin="normal"
          value={roomNumber}
          onChange={(e) => setRoomNumber(e.target.value)}
          required
        />
        <FormControl variant="outlined" fullWidth margin="normal" required>
          <InputLabel id="room-type-label">Room Type</InputLabel>
          <Select
            labelId="room-type-label"
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
            label="Room Type"
          >
            {roomTypes.map((type) => (
              <MenuItem key={type.id} value={type.id}>
                {type.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="outlined" fullWidth margin="normal" required>
          <InputLabel id="status-label">Status</InputLabel>
          <Select
            labelId="status-label"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            label="Status"
          >
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="locked">Locked</MenuItem>
          </Select>
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          onClick={() => setAdd(true)}
        >
          Add Room
        </Button>
      </form>
    </Paper>
  );
};

export default AddRoom;
