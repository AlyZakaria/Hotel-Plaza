import React from "react";
import { Card, CardContent, Typography, Box, Grid } from "@mui/material";
import RoomCard from "../../components/RoomReserved/RoomReserved";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import EventIcon from "@mui/icons-material/Event";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const ReservationCard = ({ reservations, setReservations, reservation }) => {
  return (
    <Card sx={{ mb: 4, backgroundColor: "white", boxShadow: 3 }}>
      <CardContent>
        <Typography
          variant="h6"
          component="div"
          sx={{ color: "primary.main", mb: 2 }}
        >
          <strong>Reservation ID:</strong> {reservation.id}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1" color="text.secondary">
              <EventIcon sx={{ verticalAlign: "middle", mr: 1 }} />
              {new Date(reservation.checkin).toLocaleDateString()} -{" "}
              {new Date(reservation.checkout).toLocaleDateString()}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1" color="text.secondary">
              <AttachMoneyIcon sx={{ verticalAlign: "middle", mr: 1 }} />
              {reservation.bill.totalAmount}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" color="text.secondary">
              {reservation.bill.status === "complete" ? (
                <CheckCircleOutlineIcon
                  sx={{ verticalAlign: "middle", mr: 1, color: "#4caf50" }}
                />
              ) : (
                <ErrorOutlineIcon
                  sx={{ verticalAlign: "middle", mr: 1, color: "#f44336" }}
                />
              )}
              {reservation.bill.status}
            </Typography>
          </Grid>
        </Grid>

        <Box sx={{ mt: 2 }}>
          <Typography
            variant="h6"
            component="div"
            sx={{ color: "primary.main", mb: 2 }}
          >
            <strong>Room Details</strong>
          </Typography>
          <Grid container spacing={2}>
            {reservation.rooms.map((room, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <RoomCard
                  room={room}
                  reservations={reservations}
                  setReservation={setReservations}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ReservationCard;
