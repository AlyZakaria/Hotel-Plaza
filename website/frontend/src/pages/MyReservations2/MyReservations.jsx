import React from "react";
import { Container, Typography, Grid, Box } from "@mui/material";
import ReservationCard from "../../components/ReservationCard/ReservationCard";
import RoomCard from "../../components/RoomReserved/RoomReserved";
import CheckAvailability from "../../components/CheckAvalibilty/CheckAvailability.jsx";
import ProductHero from "../../components/ProductHero/ProductHero.jsx";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";

const reservations = [
  {
    id: 1,
    customerId: 1,
    date: "2024-06-16T19:56:26.139Z",
    checkin: "2024-05-31T22:00:00.000Z",
    checkout: "2024-06-05T22:00:00.000Z",
    rooms: [
      {
        reservationId: 1,
        roomId: 1,
        receptionistId: null,
        status: "cancelled",
        room: {
          room_id: 1,
          typeId: 1,
          roomType: {
            id: 1,
            count: 5,
            pricepernight: "110",
            capacity: 3,
            view: "garden",
            name: "RoomType1",
            bed: "double",
            size: "25",
            description: "Description for RoomType1",
            imageURL: "https://via.placeholder.com/150", // Replace with actual image URL
          },
        },
      },
      {
        reservationId: 1,
        roomId: 2,
        receptionistId: null,
        status: "checked_in",
        room: {
          room_id: 2,
          typeId: 2,
          roomType: {
            id: 2,
            count: 10,
            pricepernight: "120",
            capacity: 4,
            view: "pool",
            name: "RoomType2",
            bed: "king",
            size: "30",
            description: "Description for RoomType2",
            imageURL: "https://via.placeholder.com/150", // Replace with actual image URL
          },
        },
      },
    ],
    bill: {
      number: 1,
      reservationId: 1,
      totalAmount: "250",
      time: "2024-06-16T19:56:26.166Z",
      status: "incomplete",
    },
  },
  {
    id: 2,
    customerId: 1,
    date: "2024-07-16T19:56:26.139Z",
    checkin: "2024-07-10T22:00:00.000Z",
    checkout: "2024-07-15T22:00:00.000Z",
    rooms: [
      {
        reservationId: 2,
        roomId: 3,
        receptionistId: null,
        status: "reserved",
        room: {
          room_id: 3,
          typeId: 3,
          roomType: {
            id: 3,
            count: 7,
            pricepernight: "150",
            capacity: 2,
            view: "sea",
            name: "RoomType3",
            bed: "queen",
            size: "35",
            description: "Description for RoomType3",
            imageURL: "https://via.placeholder.com/150", // Replace with actual image URL
          },
        },
      },
    ],
    bill: {
      number: 2,
      reservationId: 2,
      totalAmount: "750",
      time: "2024-07-16T19:56:26.166Z",
      status: "complete",
    },
  },
  {
    id: 3,
    customerId: 1,
    date: "2024-08-10T19:56:26.139Z",
    checkin: "2024-08-20T22:00:00.000Z",
    checkout: "2024-08-25T22:00:00.000Z",
    rooms: [
      {
        reservationId: 3,
        roomId: 4,
        receptionistId: null,
        status: "checked_out",
        room: {
          room_id: 4,
          typeId: 4,
          roomType: {
            id: 4,
            count: 3,
            pricepernight: "200",
            capacity: 5,
            view: "garden",
            name: "RoomType4",
            bed: "king",
            size: "40",
            description: "Description for RoomType4",
            imageURL: "https://via.placeholder.com/150", // Replace with actual image URL
            review: {
              rating: 4,
              comment: "Great room with beautiful view.",
            },
          },
        },
      },
      {
        reservationId: 3,
        roomId: 5,
        receptionistId: null,
        status: "checked_out",
        room: {
          room_id: 5,
          typeId: 5,
          roomType: {
            id: 5,
            count: 8,
            pricepernight: "180",
            capacity: 3,
            view: "pool",
            name: "RoomType5",
            bed: "double",
            size: "28",
            description: "Description for RoomType5",
            imageURL: "https://via.placeholder.com/150", // Replace with actual image URL
          },
        },
      },
    ],
    bill: {
      number: 3,
      reservationId: 3,
      totalAmount: "1500",
      time: "2024-08-26T19:56:26.166Z",
      status: "complete",
    },
  },
];

const ReservationsPage = () => {
  const currentReservations = reservations.filter(
    (reservation) => new Date(reservation.checkout) >= new Date()
  );
  const pastReservations = reservations.filter(
    (reservation) => new Date(reservation.checkout) < new Date()
  );
  const theme = createTheme({
    palette: {
      primary: {
        main: "#1e88e5",
      },
      background: {
        default: "#f0f4f8",
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <ProductHero></ProductHero>
      <CheckAvailability></CheckAvailability>
      <Container sx={{ mt: 4, backgroundColor: "#f0f4f8", padding: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ color: "primary.main" }}
        >
          Reservations
        </Typography>

        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h5"
            component="h2"
            gutterBottom
            sx={{ color: "primary.main" }}
          >
            Current Reservations
          </Typography>
          {currentReservations.length > 0 ? (
            currentReservations.map((reservation) => (
              <Grid container spacing={2} key={reservation.id} sx={{ mb: 4 }}>
                <Grid item xs={12}>
                  <ReservationCard reservation={reservation} />
                </Grid>
                {reservation.rooms.map((room, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <RoomCard room={room} />
                  </Grid>
                ))}
              </Grid>
            ))
          ) : (
            <Typography variant="body1" color="text.secondary">
              No current reservations.
            </Typography>
          )}
        </Box>

        <Box>
          <Typography
            variant="h5"
            component="h2"
            gutterBottom
            sx={{ color: "primary.main" }}
          >
            Past Reservations
          </Typography>
          {pastReservations.length > 0 ? (
            pastReservations.map((reservation) => (
              <Grid container spacing={2} key={reservation.id} sx={{ mb: 4 }}>
                <Grid item xs={12}>
                  <ReservationCard reservation={reservation} />
                </Grid>
                {reservation.rooms.map((room, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <RoomCard room={room} />
                  </Grid>
                ))}
              </Grid>
            ))
          ) : (
            <Typography variant="body1" color="text.secondary">
              No past reservations.
            </Typography>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default ReservationsPage;
