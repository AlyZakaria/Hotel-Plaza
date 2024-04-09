import * as React from "react";
import "./Landing.css";
import Container from "@mui/material/Container";
import image from "../../assets/bgImage.jpg";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import AppBar from "../AppBar/AppBar";
export default function Landing() {
  return (
    <div>
      <AppBar></AppBar>
      <Container
        maxWidth="xl"
        sx={{
          bgcolor: "red",
          height: "40vh",
        }}
      >
        <img src={image} alt="" width="100%" height="100%" />
      </Container>
      <Container
        sx={{ display: "flex", justifyContent: "center", marginTop: -3 }}
      >
        <Grid
          container
          rowSpacing={0}
          columnSpacing={2}
          direction="row"
          alignItems="center"
          justifyContent="center"
          display="flex"
          sx={{
            width: "80%",
            bgcolor: "white",
            borderRadius: 2,
            borderWidth: 2,
            border: "2px solid black",
            padding: 1,
          }}
        >
          <Grid item xs={4}>
            <TextField label="Outlined" variant="outlined"></TextField>
          </Grid>
          <Grid item xs={4}>
            <TextField label="Outlined" variant="outlined"></TextField>
          </Grid>
          <Grid item xs={4}>
            <Typography>Have a promo code?</Typography>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
