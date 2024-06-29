// src/RoomTypesList.js
import React from "react";
import {
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  IconButton,
} from "@mui/material";
import useGetRoomTypes from "../../hooks/useGetRoomTypes";
import { useState, useContext } from "react";
import { ActiveContext } from "../../contexts/active";
import { RoomTypeContext } from "../../contexts/roomType";
import DeleteIcon from "@mui/icons-material/Delete";
import useDeleteRoomType from "../../hooks/useDeleteRoomType";
const RoomTypesList = () => {
  const [roomTypes, setRoomTypes] = useState([]);
  const [deleteBtn, setDeleteBtn] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(0);
  let { active, setActive } = useContext(ActiveContext);
  let { roomType, setRoomType } = useContext(RoomTypeContext);

  useGetRoomTypes(setRoomTypes);
  useDeleteRoomType(
    deleteBtn,
    setDeleteBtn,
    roomTypes,
    setRoomTypes,
    deleteIndex
  );
  return (
    <div>
      <Typography variant="h5">Room Types</Typography>
      {roomTypes.map((type, index) => (
        <Paper
          key={index}
          elevation={2}
          style={{ padding: "16px", marginBottom: "16px" }}
        >
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item xs={8}>
              <Typography variant="h6" color="secondary">
                {type.name}
              </Typography>
              {/* the description show only one line */}
              <Typography
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  maxWidth: "600px", // Adjust as needed
                }}
              >
                {type.description}
              </Typography>
            </Grid>
            <Grid item sx={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setRoomType(type);
                  setActive(3);
                }}
                // onClick={() => navigate(`/room-type/${type.id}`)}
              >
                View Details
              </Button>
            </Grid>
            <Grid item xs={1}>
              <IconButton
                onClick={() => {
                  // Implement delete logic
                  setDeleteBtn(true);
                  setDeleteIndex(index);
                  console.log("Delete room type:", type.id);
                }}
              >
                <DeleteIcon sx={{ color: "red" }} />
              </IconButton>
            </Grid>
          </Grid>
        </Paper>
      ))}
    </div>
  );
};

export default RoomTypesList;
