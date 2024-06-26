// src/components/OfferCard.js

import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
} from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import { DateContext } from "../../contexts/Date";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const OfferCard = ({ offer }) => {
  let { date, setDate } = React.useContext(DateContext);
  const Navigate = useNavigate();
  console.log(offer);
  const getOffer = () => {
    setDate({
      checkIn: dayjs(offer.startDate),
      checkOut: dayjs(offer.endDate),
    });
    Navigate("/available-rooms");
  };
  return (
    <Card
      sx={{ width: 345, margin: "1rem", borderRadius: "16px", boxShadow: 3 }}
    >
      <CardMedia
        component="img"
        height="200"
        image={`data:image/${offer.imageType};base64,${offer.image}`}
        alt={offer.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {offer.name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ marginBottom: "1rem" }}
        >
          {offer.description}
        </Typography>
        <Box
          sx={{ display: "flex", alignItems: "center", marginBottom: "0.5rem" }}
        >
          <EventIcon sx={{ marginRight: "0.5rem" }} />
          <Typography variant="body2" color="text.secondary">
            {/* change the format of date to mm-dd-yyyy */}

            {`Start Date: ${offer.startDate.split("T")[0]}`}
          </Typography>
        </Box>
        <Box
          sx={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}
        >
          <EventIcon sx={{ marginRight: "0.5rem" }} />
          <Typography variant="body2" color="text.secondary">
            {`End Date: ${offer.endDate.split("T")[0]}`}
          </Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={getOffer}
        >
          Get Offer
        </Button>
      </CardContent>
    </Card>
  );
};

export default OfferCard;
