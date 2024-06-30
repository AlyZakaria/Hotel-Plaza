import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import { styled } from "@mui/material/styles";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  IconButton,
} from "@mui/material";
const AddOffer = () => {
  const [types, setType] = React.useState([]);
  const [images, setImages] = React.useState([]);
  const [formData, setFormData] = React.useState({
    name: "",
    typeId: "",
    startDate: "",
    endDate: "",
    percentage: "",
    status: "",
    description: "",
    images: [],
  });
  const [errors, setErrors] = React.useState({
    name: "",
    typeId: "",
    startDate: "",
    endDate: "",
    percentage: "",
    status: "",
    description: "",
    images: [],
  });
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

  const handleAddImage = (event) => {
    try {
      let file = event.target.files[0];

      if (file) {
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
        setFormData({ ...formData, images: images });
      }
    } catch (error) {
      console.log("Error uploading image:", error);
    }
  };

  const handleDeleteImage = async (image, index) => {
    // Prevent multiple clicks by disabling the button
    const updatedImages = [...images];
    updatedImages[index] = { ...updatedImages[index], deleting: true };
    setImages(updatedImages);

    const filteredImages = images.filter((_, i) => i !== index);
    setImages(filteredImages);
    setFormData({ ...formData, images: filteredImages });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Reset validation error message when input changes
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let errorFields = {};

    // Validation logic
    if (!formData.name.trim()) {
      errorFields.name = "Name is required";
    }
    if (!formData.typeId) {
      errorFields.typeId = "Type Room is required";
    }
    if (!formData.startDate) {
      errorFields.startDate = "Start Date is required";
    }
    if (!formData.endDate) {
      errorFields.endDate = "End Date is required";
    }
    if (!formData.percentage.trim()) {
      errorFields.percentage = "Percentage is required";
    } else if (
      isNaN(formData.percentage) ||
      formData.percentage < 0 ||
      formData.percentage > 100
    ) {
      errorFields.percentage = "Percentage must be a number between 0 and 100";
    }
    if (!formData.status) {
      errorFields.status = "Status is required";
    }

    if (formData.startDate > formData.endDate) {
      errorFields.startDate = "Start Date should be before End Date";
    }
    if (!formData.description.trim()) {
      errorFields.description = "Description is required";
    }
    if (!formData.images.length) {
      alert("At least one image is required");
      errorFields.images = {
        message: "At least one image is required",
      };
    }

    if (Object.keys(errorFields).length > 0) {
      setErrors(errorFields);
      return;
    }

    axios
      .post("http://localhost:5000/api/offer", formData, {
        headers: {
          "content-type": "application/json",
        },
      })
      .then((response) => {
        console.log("Post successful:", response.data);
        alert("Offer added successfully");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error posting data:", error);
      });
  };

  React.useEffect(() => {
    axios
      .get("http://localhost:5000/api/room-types")
      .then((res) => {
        setType(res.data.map((item) => ({ value: item.id, label: item.name })));
      })
      .catch((err) => {
        setType([]);
      });
  }, []);

  return (
    <Box
      width="100%"
      my={4}
      display="flex"
      alignItems="center"
      justifyContent="center"
      gap={4}
      sx={{ border: "2px solid grey", padding: "20px" }}
    >
      <Stack component="form" onSubmit={handleSubmit}>
        <Typography
          variant="h4"
          sx={{
            margin: "auto",
            color: "red",
            marginBottom: "16px",
          }}
        >
          Add New Offer
        </Typography>
        <InputLabel size="small">Name</InputLabel>
        <TextField
          variant="outlined"
          margin="normal"
          required
          size="small"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={!!errors.name}
          helperText={errors.name}
          autoComplete="off"
        />
        <InputLabel id="demo-simple-select-label">Type Room</InputLabel>
        <Select
          margin="normal"
          required
          size="small"
          name="typeId"
          value={formData.typeId}
          onChange={handleChange}
          error={!!errors.typeId}
          autoComplete="off"
        >
          {types.map((type) => (
            <MenuItem key={type.value} value={type.value}>
              {type.label}
            </MenuItem>
          ))}
        </Select>
        <InputLabel size="small">Percentage</InputLabel>
        <TextField
          variant="outlined"
          margin="normal"
          required
          size="small"
          inputProps={{ type: "number" }}
          name="percentage"
          value={formData.percentage}
          onChange={handleChange}
          error={!!errors.percentage}
          helperText={errors.percentage}
          autoComplete="off"
        />
        <InputLabel id="demo-simple-select-label">Status</InputLabel>
        <Select
          margin="normal"
          required
          size="small"
          name="status"
          value={formData.status}
          onChange={handleChange}
          error={!!errors.status}
        >
          <MenuItem value={"active"}>Active</MenuItem>
          <MenuItem value={"inactive"}>Inactive</MenuItem>
        </Select>
        <Box display="flex" gap={2} marginTop={1}>
          <Box flex={1}>
            <InputLabel id="demo-simple-select-label" size="small">
              Start Date
            </InputLabel>
            <TextField
              variant="outlined"
              margin="normal"
              required
              inputProps={{ type: "date" }}
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              error={!!errors.startDate}
              helperText={errors.startDate}
            />
          </Box>
          <Box flex={1}>
            <InputLabel id="demo-simple-select-label" size="small">
              End Date
            </InputLabel>
            <TextField
              variant="outlined"
              margin="normal"
              required
              inputProps={{ type: "date" }}
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              error={!!errors.endDate}
              helperText={errors.endDate}
            />
          </Box>
        </Box>
        <Box flex={1}>
          <InputLabel
            id="demo-simple-select-label"
            size="small"
            sx={{ marginBottom: "20px" }}
          >
            description
          </InputLabel>
          <TextField
            fullWidth
            multiline
            minRows={5}
            name="description"
            variant="outlined"
            required
            value={formData.description}
            onChange={handleChange}
            style={{ marginBottom: "16px" }}
          />
        </Box>

        <Box>
          <InputLabel
            id="demo-simple-select-label"
            size="small"
            sx={{ marginBottom: "20px" }}
          >
            Images
          </InputLabel>
          <Grid container>
            {formData.images.map((image, index) => (
              <Grid item key={index}>
                <div style={{ position: "relative" }}>
                  <img
                    src={`data:${image.imageURL.type};base64,${image.imageURL.blob}`}
                    alt={`Room Type ${index}`}
                    style={{
                      width: "150px",
                      height: "100px",
                      objectFit: "cover",
                    }}
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
                  <AddCircleOutlineIcon
                    style={{ fontSize: 40, color: "green" }}
                  />
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
        </Box>
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </Stack>
    </Box>
  );
};

export default AddOffer;
