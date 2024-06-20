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
} from "@mui/material";

const RoomCard = ({ room }) => {
  const { roomType } = room.room;
  const review = roomType.review || {};
  const [rating, setRating] = useState(review?.rating || 0);
  const [comment, setComment] = useState(review?.comment || "");
  const [submitted, setSubmitted] = useState(false);
  const [editMode, setEditMode] = useState(false); 

  const handleSubmit = () => {
    
    console.log("Rating:", rating);
    console.log("Comment:", comment);
    setSubmitted(true);
    setEditMode(false); 
  };

  const handleEdit = () => {
    setEditMode(true); 
  };

  return (
    <Card sx={{ mb: 2, backgroundColor: "white", boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6" component="div" sx={{ color: "primary.main" }}>
          {roomType.name}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1" color="text.secondary">
              Total: ${roomType.pricepernight}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1" color="text.secondary">
              Status: {room.status}
            </Typography>
          </Grid>
        </Grid>
        {(room.status === "checked_out" &&
          Object.keys(review).length &&
          !editMode && (
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
          )) ||
          (room.status === "checked_out" &&
            !Object.keys(review).length &&
            !submitted && (
              <Box sx={{ mt: 2 }}>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ color: "primary.main" }}
                >
                  Leave a Review
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
                  Submit
                </Button>
              </Box>
            ))}
        {editMode && (
          <Box sx={{ mt: 2 }}>
            <Typography
              variant="h6"
              component="div"
              sx={{ color: "primary.main" }}
            >
              Edit Review
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
              Update
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default RoomCard;
