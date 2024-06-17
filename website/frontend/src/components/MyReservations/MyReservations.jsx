import "./styles.css";
import { Container } from "@mui/material";
import { Grid } from "@mui/material";

const MyReservations = () => {
  return (
    <Container sx={{ marginTop: "100px" }}>
      <Grid
        sx={{
          margin: "auto",
        }}
      >
        <main class="main-content">
          <div class="reservation-list">
            <Grid item xs={12}>
              <div class="reservation-card">
                <img src="room1.jpg" alt="Room Type 1" class="room-image" />
                <div class="reservation-details">
                  <h2>Room Type 1</h2>
                  <p>
                    <strong>Check-In:</strong> 06/17/2024
                  </p>
                  <p>
                    <strong>Check-Out:</strong> 06/18/2024
                  </p>
                  <p>
                    <strong>Total Nights:</strong> 1
                  </p>
                  <p>
                    <strong>Total Price:</strong> $100
                  </p>
                </div>
              </div>
            </Grid>
            <Grid item xs={12}>
              <div class="reservation-card">
                <img src="room2.jpg" alt="Room Type 2" class="room-image" />
                <div class="reservation-details">
                  <h2>Room Type 2</h2>
                  <p>
                    <strong>Check-In:</strong> 07/01/2024
                  </p>
                  <p>
                    <strong>Check-Out:</strong> 07/05/2024
                  </p>
                  <p>
                    <strong>Total Nights:</strong> 4
                  </p>
                  <p>
                    <strong>Total Price:</strong> $400
                  </p>
                </div>
              </div>
            </Grid>
          </div>
        </main>
      </Grid>
    </Container>
  );
};

export default MyReservations;
