import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "../../components/Button/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AppBar from "../../components/AppBar/AppBar";
import useForgetPassword from "../../hooks/useForgetPassword";
import { ForgetPasswordSchema } from "../../Validations/ForgetPassword";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

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

const defaultTheme = createTheme();

let user = {};

export default function ForgetPassword() {
  const [submit, setSubmit] = React.useState(false);

  useForgetPassword(user, submit, setSubmit);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    user = {
      email: data.get("email"),
    };
    const isValid = ForgetPasswordSchema.isValidSync(user);
    console.log(isValid);
    if (isValid == false) {
      toast.error("Invalid Email Format \n Example: email@email.com");
      return;
    }
    console.log(user);
    setSubmit(true);
  };

  const navigate = useNavigate();
  React.useEffect(() => {
    if (sessionStorage.getItem("customer")) {
      navigate("/");
    }
  });

  return (
    <ThemeProvider theme={defaultTheme}>
      <AppBar></AppBar>
      <Container component="main" maxWidth="xs" sx={{ paddingBottom: 10 }}>
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Reset Password
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3, width: "100%" }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Reset
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
