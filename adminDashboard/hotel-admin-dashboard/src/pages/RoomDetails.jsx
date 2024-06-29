// src/App.js
import React, { useState } from "react";
import { Container, Grid, Paper, Typography, Button } from "@mui/material";

import RoomTypeDetails from "../components/RoomTypeDetails/RoomTypeDetails";

let menu = ["Add Room Type", "Manage Rooms", "Show All Room Types"];
const RoomDetails = () => {
  let [active, setActive] = useState(0);

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        {/* Header */}
        <Grid item xs={12}>
          <Paper elevation={3} style={{ padding: "16px" }}>
            <Typography variant="h4">Hotel Admin Dashboard</Typography>
          </Paper>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={3}>
          <Paper elevation={3} style={{ padding: "16px" }}>
            <Typography variant="h6">Menu</Typography>
            {menu.map((item, index) => {
              return (
                <Button
                  key={index}
                  fullWidth
                  variant="contained"
                  color={index % 2 == 0 ? "primary" : "secondary"}
                  style={{ marginBottom: "8px" }}
                  onClick={() => setActive(index)}
                >
                  {item}
                </Button>
              );
            })}
          </Paper>
        </Grid>

        {/* Main Content */}
        <Grid item xs={9}>
          <Paper elevation={3} style={{ padding: "16px" }}>
            <RoomTypeDetails></RoomTypeDetails>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default RoomDetails;
