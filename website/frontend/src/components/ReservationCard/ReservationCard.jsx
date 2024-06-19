import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

const ReservationCard = ({ reservation }) => {
  return (
    <Card
      sx={{ display: "flex", mb: 2, backgroundColor: "white", boxShadow: 3 }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography
            variant="h6"
            component="div"
            sx={{ color: "primary.main" }}
          >
            Reservation ID: {reservation.id}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Check-In: {new Date(reservation.checkin).toLocaleDateString()}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Check-Out: {new Date(reservation.checkout).toLocaleDateString()}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Total Amount: ${reservation.bill.totalAmount}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Status: {reservation.bill.status}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
};

export default ReservationCard;
