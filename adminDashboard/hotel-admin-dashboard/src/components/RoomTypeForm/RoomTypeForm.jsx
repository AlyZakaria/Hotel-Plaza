// src/RoomTypeForm.js
import React, { useState, useContext } from "react";
import { styled } from "@mui/material/styles";
import {
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  IconButton,
} from "@mui/material";
import { ActiveContext } from "../../contexts/active";
import Autocomplete from "@mui/material/Autocomplete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import axios from "../../Apis/axios";
import URLS from "../../Apis/URLS.json";
import useAddRoomType from "../../hooks/useAddRoomType";
import DeleteIcon from "@mui/icons-material/Delete";

let views = [
  { label: "sea", value: "sea" },
  { label: "garden", value: "garden" },
  { label: "pool", value: "pool" },
];
let beds = [
  { label: "single", value: "single" },
  { label: "double", value: "double" },
  { label: "king", value: "king" },
  { label: "queen", value: "queen" },
];
const RoomTypeForm = ({ onSave, roomType }) => {
  let { active, setActive } = useContext(ActiveContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [capacity, setCapacity] = useState(0);
  const [images, setImages] = useState([]);
  const [view, setView] = useState("");
  const [bed, setBed] = useState("");
  const [area, setArea] = useState(0);
  const [save, setSave] = useState(false);
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const uploadImage = (id, file) => {
    const formData = new FormData();
    formData.append("files", file);

    axios
      .put(`${URLS.addImage}?id=${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Image upload successful:", response.data);
      })
      .catch((error) => {
        throw error;
      });
  };

  const handleAddImage = (event) => {
    try {
      let file = event.target.files[0];

      if (file) {
        // Upload image to backend
        // uploadImage(roomType.id, file);

        // Convert to base64 and update state with new image
        const reader = new FileReader();
        reader.onload = (e) => {
          const newImage = {
            imageURL: {
              type: file.type,
              blob: e.target.result.split(",")[1],
            },
          };
          setImages([...images, newImage]);
        };
        reader.readAsDataURL(file);
      }
    } catch (error) {
      console.log("Error uploading image:", error);
    }
  };

  useAddRoomType(
    name,
    description,
    price,
    capacity,
    view,
    bed,
    area,
    images,
    save,
    setSave,
    setActive
  );
  return (
    <Paper elevation={3} style={{ padding: "16px" }}>
      <Typography variant="h6" sx={{ marginBottom: "15px" }}>
        Room Type Details
      </Typography>
      <TextField
        fullWidth
        label="Room Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ marginBottom: "16px" }}
      />
      <TextField
        fullWidth
        label="Description"
        multiline
        minRows={5}
        variant="outlined"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ marginBottom: "16px" }}
      />
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="Price/Night"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            style={{ marginBottom: "16px" }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Capacity"
            type="number"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            style={{ marginBottom: "16px" }}
          />
        </Grid>
        <Grid item xs={6}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={views}
            sx={{ width: 300 }}
            defaultValue={view}
            onChange={(e, value) => setView(value)}
            renderInput={(params) => <TextField {...params} label="Views" />}
          />
        </Grid>
        <Grid item xs={6}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={beds}
            sx={{ width: 300 }}
            defaultValue={bed}
            onChange={(e, value) => setBed(value)}
            renderInput={(params) => <TextField {...params} label="Bed" />}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Area"
            type="number"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            style={{ marginBottom: "16px" }}
          />
        </Grid>
      </Grid>
      <Typography
        variant="h6"
        style={{ marginTop: "20px", marginBottom: "20px" }}
      >
        Images
      </Typography>
      <Grid container spacing={2}>
        {images.map((image, index) => (
          <Grid item key={index}>
            <div style={{ position: "relative" }}>
              <img
                src={`data:${image.imageURL.type};base64,${image.imageURL.blob}`}
                alt={`Room Type ${index}`}
                style={{ width: "150px", height: "100px", objectFit: "cover" }}
              />
              <IconButton
                style={{ position: "absolute", top: 0, right: 0 }}
                disabled={image.deleting} // Disable button while deleting
                onClick={() => {
                  let newImages = images.filter((img, i) => i !== index);
                  setImages(newImages);
                }}
              >
                <DeleteIcon sx={{ color: "red" }} />
              </IconButton>
            </div>
          </Grid>
        ))}
        <Grid
          item
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            component="label"
            role={undefined}
            variant=""
            tabIndex={-1}
            startIcon={
              <AddCircleOutlineIcon style={{ fontSize: 40, color: "green" }} />
            }
          >
            <VisuallyHiddenInput
              type="file"
              onChange={handleAddImage}
              accept="image/*"
            />
          </Button>
        </Grid>
      </Grid>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setSave(true)}
        style={{ margin: "16px" }}
        sx={{
          width: "100px",
        }}
      >
        Save
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => setActive(2)}
        style={{ margin: "16px" }}
        sx={{
          width: "100px",
        }}
      >
        Cancel
      </Button>
    </Paper>
  );
};

export default RoomTypeForm;
