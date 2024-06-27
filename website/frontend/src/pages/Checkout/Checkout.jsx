import React, { useState, useContext, useEffect } from "react";
import CheckoutCard from "../../components/CheckoutCard/CheckoutCard";
import Typography from "@mui/material/Typography";
import { Container, Box, Button } from "@mui/material";
import AppBar from "../../components/AppBar/AppBar";
import Footer from "../../components/Footer/Footer";
import { selectedRoomsContext } from "../../contexts/selectedRooms";
import { DateContext } from "../../contexts/Date";
import usePay from "../../hooks/usePay";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  let { selectedRooms } = useContext(selectedRoomsContext);

  let { date } = useContext(DateContext);
  const navigate = useNavigate();
  const [pay, setPay] = useState(false);

  usePay(selectedRooms, pay, setPay, date);

  useEffect(() => {
    // reload the page if the customer is not logged in

    if (!sessionStorage.getItem("customer")) {
      navigate("/login");
    }
  }, [navigate]);

  // Calculate total price
  let totalPrice = 0;
  selectedRooms.forEach((room) => {
    totalPrice += room.sum;
  });

  return (
    <>
      <AppBar />
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
          {selectedRooms.length === 0 && (
            <Typography
              variant="h6"
              sx={{ textAlign: "center", paddingBottom: "2%" }}
            >
              No Rooms Selected
            </Typography>
          )}
          {selectedRooms.length !== 0 &&
            selectedRooms.map((room, index) => (
              <CheckoutCard room={room} key={index} />
            ))}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "2% 0",
              borderTop: "1px solid #ccc",
              marginTop: "2%",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Total Price: {totalPrice} EGP
            </Typography>
            <Button
              sx={{
                width: { xs: "90%", sm: "50%", md: "20%" },
              }}
              variant="contained"
              onClick={() => {
                setPay(true);
              }}
            >
              Pay Now
            </Button>
          </Box>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default Checkout;
