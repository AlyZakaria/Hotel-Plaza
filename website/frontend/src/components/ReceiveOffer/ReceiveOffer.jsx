import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
// import Typography from "../components/Typography";
import TextField from "../TextField/TextField";
import Button from "../Button/Button";
import Typography from "@mui/material/Typography";
import backgroundImage from "../../assets/productCTAImageDots.png";
import useReceiveOffer from "../../hooks/useReceiveOffer";
import { ToastContainer, toast } from "react-toastify";
import { OfferSchema } from "../../Validations/ReceiveOffer";

let email;
let name;
function ProductCTA() {
  const [submit, setSubmit] = React.useState(false);
  useReceiveOffer(email, name, submit, setSubmit); // hook called

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    email = data.get("email");
    name = data.get("name");
    const user = {
      email: email,
      name: name,
    };
    const isValid = OfferSchema.isValidSync(user);
    console.log(isValid);
    if (!isValid) {
      toast.error("Enter a valid Email");
      return;
    }

    setSubmit(true);
  };

  return (
    <Container component="section" sx={{ mt: 10, display: "flex" }}>
      <Grid container>
        <Grid item xs={12} md={6} sx={{ zIndex: 1 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              bgcolor: "warning.main",
              py: 8,
              px: 3,
            }}
          >
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ maxWidth: 400 }}
            >
              <Typography
                variant="h2"
                component="h2"
                gutterBottom
                sx={{
                  textTransform: "uppercase",
                  fontFamily: "'Roboto Condensed', sans-serif",
                  fontWeight: "bold",
                  fontSize: "45px",
                }}
              >
                Receive offers
              </Typography>
              <Typography variant="h5">Subscribe to our Newsletter</Typography>
              <TextField
                name="email"
                noBorder
                placeholder="Your email"
                variant="standard"
                sx={{ width: "100%", mt: 3, mb: 2 }}
              />
              <TextField
                name="name"
                noBorder
                placeholder="Your name"
                variant="standard"
                sx={{ width: "100%", mt: 3, mb: 2 }}
              />
              <Button
                type="submit"
                color="primary"
                variant="contained"
                sx={{ width: "100%" }}
              >
                Keep me updated
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{ display: { md: "block", xs: "none" }, position: "relative" }}
        >
          <Box
            sx={{
              position: "absolute",
              top: -67,
              left: -67,
              right: 0,
              bottom: 0,
              width: "100%",
              background: backgroundImage,
            }}
          />
          <Box
            component="img"
            src="https://images.unsplash.com/photo-1527853787696-f7be74f2e39a?auto=format&fit=crop&w=750"
            alt="call to action"
            sx={{
              position: "absolute",
              top: -28,
              left: -28,
              right: 0,
              bottom: 0,
              width: "100%",
              maxWidth: 600,
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default ProductCTA;
