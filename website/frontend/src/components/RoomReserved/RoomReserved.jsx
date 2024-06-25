import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  TextField,
  Button,
  Rating,
  Grid,
} from "@mui/material";
import KingBedIcon from "@mui/icons-material/KingBed";
import LandscapeIcon from "@mui/icons-material/Landscape";
import GroupIcon from "@mui/icons-material/Group";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import InfoIcon from "@mui/icons-material/Info";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import RateReviewIcon from "@mui/icons-material/RateReview";
import useAddReview from "../../hooks/useAddReview";
import useCancelReservation from "../../hooks/useCancelReservation";
const RoomCard = ({ room, reservations, setReservations }) => {
  const { roomType } = room.room;
  const [Cancel, setCancel] = useState(false);
  const review = roomType.reviews.length ? roomType.reviews[0] : {};
  const [rating, setRating] = useState(review?.rating || 0);
  const [comment, setComment] = useState(review?.comment || "");
  const [submitted, setSubmitted] = useState(false);
  const [editMode, setEditMode] = useState(false);


  console.log("Reservations:", reservations);
  const getStatusColor = (status) => {
    switch (status) {
      case "checked_in":
        return "#388e3c"; // Green for checked-in
      case "checked_out":
        return "#fbc02d"; // Yellow for checked-out
      case "reserved":
        return "#1976d2"; // Blue for reserved
      case "cancelled":
        return "#e53935"; // Red for cancelled
      default:
        return "inherit"; // Default color
    }
  };
  useAddReview(
    setSubmitted,
    submitted,
    room,
    reservations,
    setReservations,
    rating,
    comment,
    roomType.id
  );
  useCancelReservation(Cancel, setCancel, room, reservations, setReservations);

  const handleSubmit = () => {
    if (rating === 0 && comment === "") {
      alert("Please rate and comment");
      return;
    }

    console.log("Rating:", rating);
    console.log("Comment:", comment);
    setSubmitted(true);
    setEditMode(false);
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  return (
    <Card sx={{ mb: 2, boxShadow: 3, height: "100%" }}>
      <CardContent sx={{}}>
        <Typography variant="h6" component="div" sx={{ color: "primary.main" }}>
          {roomType.name}
        </Typography>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1" color="text.secondary">
              <LandscapeIcon sx={{ verticalAlign: "middle", mr: 1 }} />
              {roomType.view}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1" color="text.secondary">
              Status:{" "}
              <span style={{ color: getStatusColor(room.status) }}>
                {room.status}
              </span>
            </Typography>
          </Grid>
        </Grid>

        {room.status === "reserved" && (
          <Button
            onClick={() => setCancel(true)}
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Cancel
          </Button>
        )}

        {(room.status === "checked_out" &&
          Object.keys(review).length &&
          !editMode && (
            <Box sx={{ mt: 2 }}>
              <Typography
                variant="h6"
                component="div"
                sx={{ color: "primary.main" }}
              >
                <RateReviewIcon sx={{ verticalAlign: "middle", mr: 1 }} />
                <strong>Your Review</strong>
              </Typography>
              <Rating value={parseInt(review.rating)} readOnly />
              <Typography variant="body2" color="text.secondary">
                {review.comment}
              </Typography>
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
                  <RateReviewIcon sx={{ verticalAlign: "middle", mr: 1 }} />
                  <strong>Leave a Review</strong>
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
                  <SaveIcon sx={{ mr: 1 }} />
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
              <EditIcon sx={{ verticalAlign: "middle", mr: 1 }} />
              <strong>Edit Review</strong>
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
              <SaveIcon sx={{ mr: 1 }} />
              Update
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default RoomCard;
