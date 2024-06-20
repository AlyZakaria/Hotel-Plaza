import * as React from "react";
import { Container } from "@mui/material";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Grid from "@mui/material/Grid";
import { DateContext } from "../../contexts/Date";
import { ClickContext } from "../../contexts/ButtonClick";
import ErrorIcon from "@mui/icons-material/Error";
import dayjs from "dayjs"; // Using dayjs for date manipulation, ensure it is installed
import "./styles.css";

const CheckAvailability = () => {
  let { date, setDate } = useContext(DateContext);
  let { click, setClick } = useContext(ClickContext);
  const navigate = useNavigate();

  useEffect(() => {
    function check() {
      const checkIn = dayjs(date.checkIn);
      const checkOut = dayjs(date.checkOut);
      // get the date now
      const now = dayjs();

      if (dayjs(date.checkOut).isBefore(dayjs(date.checkIn))) {
        const newCheckOut = checkIn.add(1, "day");
        console.log(newCheckOut);
        setDate((prevDate) => ({ ...prevDate, checkOut: newCheckOut }));
        console.log(date);
        toast("Check-out date must be after check-in date", {
          icon: <ErrorIcon sx={{ color: "yellow" }} />,
          theme: "light",
          autoClose: 2000,
          hideProgressBar: true,
        });
      } else if (dayjs(date.checkIn).isAfter(dayjs(date.checkOut))) {
        setDate({
          ...date,
          checkIn: checkOut.subtract(1, "day").toDate(),
        });
        toast("Check-In date must be before check-in date", {
          icon: <ErrorIcon sx={{ color: "yellow" }} />,
          theme: "light",
          autoClose: 2000,
          progress: undefined,
        });
      }
      // setClick(false);
    }
    check();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date.checkIn, date.checkOut]);

  function navigateTo() {
    const checkIn = dayjs(date.checkIn);
    const checkOut = dayjs(date.checkOut);
    // get the date now
    const now = dayjs();
    // validate the date not before the date now but ignore the time
    if (dayjs(date.checkIn).isBefore(now.startOf("day"))) {
      setDate({
        ...date,
        checkIn: now,
        checkOut: now.add(1, "day"),
      });
    }

    if (dayjs(date.checkOut).isBefore(dayjs(date.checkIn))) {
      const newCheckOut = checkIn.add(1, "day");
      setDate((prevDate) => ({ ...prevDate, checkOut: newCheckOut }));
      toast("Check-out date must be after check-in date", {
        icon: <ErrorIcon sx={{ color: "yellow" }} />,
        theme: "light",
        autoClose: 2000,
        hideProgressBar: true,
      });
    } else if (dayjs(date.checkIn).isAfter(dayjs(date.checkOut))) {
      setDate({
        ...date,
        checkIn: checkOut.subtract(1, "day").toDate(),
      });
      toast("Check-In date must be before check-in date", {
        icon: <ErrorIcon sx={{ color: "yellow" }} />,
        theme: "light",
        autoClose: 2000,
        progress: undefined,
      });
    }
    setClick(true);
    navigate("/available-rooms");
  }

  return (
    <Container className="checkAvailability">
      <Grid
        container
        spacing={2}
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Grid item md={3} xs={12}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Check-In"
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
              label="Check-Out"
              value={date.checkOut}
              onChange={(newValue) => setDate({ ...date, checkOut: newValue })}
              sx={{ width: "auto" }}
            />
          </LocalizationProvider>
        </Grid>
        {/* <Grid item md={3} xs={12}></Grid> */}
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
