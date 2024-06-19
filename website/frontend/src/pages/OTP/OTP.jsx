import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "../../components/Button/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { MuiOtpInput } from "mui-one-time-password-input";
import useOTP from "../../hooks/useOTP";
import AppBar from "../../components/AppBar/AppBar";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="/">
        Plaza Hotel
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

// otp
let otpObject = {};

export default function OTP() {
  const [otp, setOtp] = React.useState("");
  const [submit, setSubmit] = React.useState(false);
  useOTP(otp, submit, setSubmit); // hook called
  const handleChange = (newValue) => {
    setOtp(newValue);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    otpObject = {
      otp: data.get("otp"),
    };
    setSubmit(true);
  };

  const [timer, setTimer] = React.useState(59);
  setTimeout(() => {
    if (timer > 0) {
      setTimer(timer - 1);
    }
  }, 1000);

  return (
    <ThemeProvider theme={defaultTheme}>
      <AppBar></AppBar>
      <Container component="main" maxWidth="xs" sx={{ paddingBottom: 10 }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <MarkEmailReadIcon />
          </Avatar>
          <Typography
            component="h1"
            variant="h5"
            sx={{ paddingBottom: "10%", fontSize: "21px" }}
          >
            Verify Email 0:{timer}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <MuiOtpInput value={otp} onChange={handleChange} />
            </Grid>
          </Grid>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ width: "100%" }}
          >
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Verify
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
