import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  TextField,
  Button,
  Rating,
  Grid,
  Fade,
} from "@mui/material";

const RoomCard = ({ room }) => {
  // Ensure that all hooks are called unconditionally at the beginning of the component
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [editMode, setEditMode] = useState(false);

  if (!room || !room.room || !room.room.roomType) {
    return null; // Handle case where room data is missing
  }

  const { roomType, review } = room.room;

  const handleSubmit = () => {
    // Here you would typically send the review to the backend
    console.log("Rating:", rating);
    console.log("Comment:", comment);
    setSubmitted(true);
    // Reset edit mode after submission
    setEditMode(false);
  };

  const handleEdit = () => {
    setEditMode(true); // Activate edit mode
  };

  return (
    <Fade in={true} timeout={500}>
      <Card sx={{ mb: 2, backgroundColor: "white", boxShadow: 3 }}>
        <CardMedia
          component="img"
          height="140"
          image={roomType?.imageURL || ""}
          alt={roomType?.name || ""}
        />
        <CardContent>
          <Typography
            variant="h6"
            component="div"
            sx={{ color: "primary.main" }}
          >
            {roomType?.name || ""}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1" color="text.secondary">
                Price per Night: ${roomType?.pricepernight || ""}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Capacity: {roomType?.capacity || ""}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                View: {roomType?.view || ""}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1" color="text.secondary">
                Bed Type: {roomType?.bed || ""}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Size: {roomType?.size} sqm
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Status: {room?.status || ""}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {roomType?.description || ""}
              </Typography>
            </Grid>
          </Grid>
          {room?.status === "checked_out" && review && !editMode && (
            <Box sx={{ mt: 2 }}>
              <Typography
                variant="h6"
                component="div"
                sx={{ color: "primary.main" }}
              >
                Your Review
              </Typography>
              <Rating value={review.rating} readOnly />
              <Typography variant="body2" color="text.secondary">
                {review.comment}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={handleEdit}
                sx={{ mt: 2 }}
              >
                Edit Review
              </Button>
            </Box>
          )}
          {(room?.status === "checked_out" && !review) || editMode ? (
            <Box sx={{ mt: 2 }}>
              <Typography
                variant="h6"
                component="div"
                sx={{ color: "primary.main" }}
              >
                {editMode ? "Edit Review" : "Leave a Review"}
              </Typography>
              <Rating
                value={rating}
                onChange={(event, newValue) => {
                  setRating(newValue);
                }}
              />
              <TextField
                fullWidth
                label="Comment"
                multiline
                rows={4}
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                sx={{ mt: 2 }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                sx={{ mt: 2 }}
              >
                {editMode ? "Update" : "Submit"}
              </Button>
            </Box>
          ) : null}
        </CardContent>
      </Card>
    </Fade>
  );
};

export default RoomCard;
