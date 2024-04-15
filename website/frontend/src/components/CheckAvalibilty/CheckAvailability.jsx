import * as React from "react";
import { Container } from "@mui/material";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import { useEffect } from "react";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";

import Grid from "@mui/material/Grid";
import "./styles.css";

const CheckAvailability = () => {
  const [checkIn, setCheckIn] = React.useState(dayjs("2024-04-17"));
  const [checkOut, setCheckOut] = React.useState(dayjs("2024-04-18"));

  useEffect(() => {
    // This effect runs after every render

    if (checkOut <= checkIn) {
      alert("Check-out date must be after check-in date");
      setCheckOut(checkIn.add(1, "day"));
    }
  }, [checkOut]); // Only re-run the effect if checkOut changes

  return (
    <Container className="checkAvailability">
      <Grid container spacing={2}>
        <Grid item md={3} xs={12}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Check-in"
              value={checkIn}
              onChange={(newValue) => setCheckIn(newValue)}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item md={3} xs={12}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              aria-describedby="id"
              label="Check-out"
              value={checkOut}
              onChange={(newValue) => setCheckOut(newValue)}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item md={3} xs={12}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Autocomplete
              disablePortal
              // id="combo-box-demo"
              options={[
                { label: "1" },
                { label: "2" },
                { label: "3" },
                { label: "4" },
              ]}
              sx={{ width: 200 }}
              renderInput={(params) => <TextField {...params} label="Guests" />}
            />
          </div>
        </Grid>
        <Grid
          item
          md={2}
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ color: "#143c5c" }}>
            <Button variant="contained">Check Available</Button>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};
export default CheckAvailability;
