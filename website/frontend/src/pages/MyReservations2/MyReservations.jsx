import React from "react";
import { Container, Typography, Grid, Box } from "@mui/material";
import ReservationCard from "../../components/RoomCard/ReservationCard";
import RoomCard from "../../components/RoomReserved/RoomReserved";
import CheckAvailability from "../../components/CheckAvalibilty/CheckAvailability.jsx";
import ProductHero from "../../components/ProductHero/ProductHero.jsx";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import useGetReservations from "../../hooks/useGetReservations";
import { useNavigate } from "react-router-dom";

const ReservationsPage = () => {
  const [reservations, setReservations] = React.useState([]);
  const navigate = useNavigate();

  useGetReservations(setReservations);
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
  React.useEffect(() => {
    if (!sessionStorage.getItem("customer")) {
      navigate("/login");
    }
  });
  return (
    <Box>
      <ProductHero />
      <CheckAvailability />
      <ThemeProvider theme={theme}>
        <Container sx={{ mt: 4, backgroundColor: "#f0f8f9", padding: 4 }}>
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
                    <ReservationCard
                      reservations={reservations}
                      setReservation={setReservations}
                      reservation={reservation}
                    />
                  </Grid>
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
    </Box>
  );
};

export default ReservationsPage;
