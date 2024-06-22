import React from "react";
import CheckoutCard from "../../components/CheckoutCard/CheckoutCard";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import AppBar from "../../components/AppBar/AppBar";
import Footer from "../../components/Footer/Footer";
import { selectedRoomsContext } from "../../contexts/selectedRooms.js";
import { useState, useContext } from "react";

const Checkout = () => {
  let { selectedRooms, setSelectedRooms } = useContext(selectedRoomsContext);
  return (
    <>
      <AppBar></AppBar>
      <Container>
        <Box sx={{ padding: "2% 0 2% 0" }}>
          <Typography
            variant="h4"
            sx={{
              textAlign: "left",
              paddingBottom: "2%",
              fontSize: { xs: "25px", md: "35px" },
            }}
          >
            Review Your Reservation(s):
          </Typography>
          {selectedRooms.map((selectedRoom) => {
            return <CheckoutCard room={selectedRoom}></CheckoutCard>;
          })}

          <Button
            sx={{
              width: { xs: "90%", sm: "50%", md: "20%" },
            }}
            variant="contained"
          >
            Pay Now
          </Button>
        </Box>
      </Container>
      <Footer></Footer>
    </>
  );
};

export default Checkout;
