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
import { MuiTelInput } from "mui-tel-input";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import AppBar from "../../components/AppBar/AppBar";
import useSignUp from "../../hooks/useSignUp";
import { useContext } from "react";
import { CustomerContext } from "../../contexts/Customer";
import { AddUserSchema } from "../../Validations/AddUser";
import { ToastContainer, toast } from "react-toastify";
import LoadingButton from "@mui/lab/LoadingButton";

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

let user = {};

export default function SignUp() {
  const [state, setState] = React.useState(false);
  let { customer, setCustomer } = useContext(CustomerContext);
  const [phoneNumber, setPhoneNumber] = React.useState("+20");
  const [error, setError] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [submit, setSubmit] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  useSignUp(user, customer, setCustomer, submit, setSubmit);

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    user = {
      email: data.get("email"),
      password: data.get("password"),
      fname: data.get("firstName"),
      lname: data.get("lastName"),
      phone: phoneNumber,
      gender: data.get("gender"),
    };
    const isValid = AddUserSchema.isValidSync(user);
    if (!isValid) {
      toast.error("Invalid data format and/or empty field(s)");
      return;
    }
    setLoading(true);
    setSubmit(true);
  };
  const handlePhoneNumberChange = (newValue) => {
    setPhoneNumber(newValue);
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
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
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
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <MuiTelInput
                  fullWidth
                  id="phone-number"
                  name="phone-number"
                  label="Phone Number"
                  error={state}
                  helperText={error}
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                ></MuiTelInput>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="gender">Gender</InputLabel>
                  <Select
                    labelId="gender"
                    id="gender"
                    value={gender}
                    label="Gender"
                    name="gender"
                    onChange={handleGenderChange}
                    error={state}
                    helperText={error}
                  >
                    <MenuItem value={"male"}>Male</MenuItem>
                    <MenuItem value={"female"}>Female</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              loading={loading}
            >
              Sign Up
            </LoadingButton>
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
