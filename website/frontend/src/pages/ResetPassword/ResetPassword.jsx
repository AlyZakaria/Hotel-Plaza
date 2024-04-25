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
import useResetPassword from "../../hooks/useResetPassword";

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

let passwords = {};

export default function ResetPassword() {
  const [submit, setSubmit] = React.useState(false);

  useResetPassword(passwords, submit, setSubmit);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get("new-password") !== data.get("new-password-confirm")) {
      alert("Passwords do not match");
      return;
    }
    passwords = {
      newPassword: data.get("new-password"),
    };
    console.log(passwords);
    setSubmit(true);
  };

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
                  id="newPassword"
                  label="New Password"
                  name="new-password"
                  autoComplete="New Password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="newPasswordConfirm"
                  label="Confirm New Password"
                  name="new-password-confirm"
                  autoComplete="Confirm New Password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Reset Password
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
