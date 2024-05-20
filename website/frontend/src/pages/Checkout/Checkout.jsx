import React from "react";
import CheckoutCard from "../../components/CheckoutCard/CheckoutCard";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";

const Checkout = () => {
  return (
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
        <CheckoutCard></CheckoutCard>
        <CheckoutCard></CheckoutCard>
        <CheckoutCard></CheckoutCard>
        <Button sx={{ width: "100%", bgcolor: "blue" }}>
          <Typography sx={{ textTransform: "capitalize", color: "white" }}>
            Pay Now
          </Typography>
        </Button>
      </Box>
    </Container>
  );
};

export default Checkout;
