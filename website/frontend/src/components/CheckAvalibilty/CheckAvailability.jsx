import * as React from "react";
import { Container } from "@mui/material";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Grid from "@mui/material/Grid";
import { DateContext } from "../../contexts/Date";
import ErrorIcon from "@mui/icons-material/Error";
import "./styles.css";

const CheckAvailability = () => {
  let { date, setDate } = useContext(DateContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (date.checkOut <= date.checkIn) {
      setDate({ ...{ date, checkOut: date.checkIn.add(1, "day") } });
      toast("Check-out date must be after check-in date", {
        icon: <ErrorIcon sx={{ color: "yellow" }} />,
        theme: "light",
        autoClose: 2000,
        hideProgressBar: true,
      });
    } else if (date.checkIn >= date.checkOut) {
      setDate({ ...{ date, checkIn: date.checkOut.subtract(1, "day") } });
      toast("Check-In date must be before check-in date", {
        icon: <ErrorIcon sx={{ color: "yellow" }} />,
        theme: "light",
        autoClose: 2000,
        progress: undefined,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date.checkOut, date.checkIn]);

  function navigateTo() {
    navigate("/available-rooms");
  }

  return (
    <Container className="checkAvailability">
      <Grid container spacing={2}>
        <Grid item md={3} xs={12}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Check-in"
              value={date.checkIn}
              onChange={(newValue) => setDate({ ...date, checkIn: newValue })}
              sx={{ width: "auto" }}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item md={3} xs={12}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              aria-describedby="id"
              label="Check-out"
              value={date.checkOut}
              onChange={(newValue) => setDate({ ...date, checkOut: newValue })}
              sx={{ width: "auto" }}
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
              sx={{ width: 250 }}
              renderInput={(params) => <TextField {...params} label="Guests" />}
            />
          </div>
        </Grid>
        <Grid
          item
          md={3}
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ color: "#143c5c" }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigateTo()}
              sx={{ width: { xs: 250, sm: 250, md: 220 } }}
            >
              Check Availability
            </Button>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};
export default CheckAvailability;
