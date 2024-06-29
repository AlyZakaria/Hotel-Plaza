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
import { RoomTypeContext } from "../../contexts/roomType";
import DeleteIcon from "@mui/icons-material/Delete";
import Autocomplete from "@mui/material/Autocomplete";
import useGetRoomTypeImages from "../../hooks/useGetRoomTypeImages";
import useSaveRoomTypeDetails from "../../hooks/useSaveRoomTypeDetails";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { ActiveContext } from "../../contexts/active";
import axios from "../../Apis/axios";
import URLS from "../../Apis/URLS.json";

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

const RoomTypeDetails = () => {
  const { roomType, setRoomType } = useContext(RoomTypeContext);
  let { active, setActive } = useContext(ActiveContext);
  const [name, setName] = useState(roomType.name);
  const [description, setDescription] = useState(roomType.description);
  const [price, setPrice] = useState(roomType.pricepernight);
  const [capacity, setCapacity] = useState(roomType.capacity);
  const [images, setImages] = useState(roomType.images || []);
  const [view, setView] = useState(roomType.view);
  const [bed, setBed] = useState(roomType.bed);
  const [area, setArea] = useState(roomType.size);
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

  const handleSave = () => {
    // Implement save logic
  };
  useSaveRoomTypeDetails(
    roomType.id,
    name,
    description,
    price,
    capacity,
    view,
    bed,
    area,
    save,
    setSave,
    setRoomType,
    setActive
  );

  const handleDeleteImage = async (image, index) => {
    // Prevent multiple clicks by disabling the button
    const updatedImages = [...images];
    updatedImages[index] = { ...updatedImages[index], deleting: true };
    setImages(updatedImages);

    try {
      const response = await axios.delete(
        `${URLS.deleteImage}?roomId=${roomType.id}&imageId=${image.imageId}`
      );
      if (response.status === 200) {
        const filteredImages = images.filter((_, i) => i !== index);
        setImages(filteredImages);
      }
    } catch (error) {
      console.log("Error deleting image:", error);
    }
  };

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
        uploadImage(roomType.id, file);

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

  useGetRoomTypeImages(roomType.id, setImages);

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
                onClick={() => handleDeleteImage(image, index)}
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

export default RoomTypeDetails;
