import { useEffect } from "react";
import urls from "../Apis/URLS.json";
import axios from "../Apis/axios.js";
import * as React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorIcon from "@mui/icons-material/Error";
import dayjs from "dayjs"; // Using dayjs for date manipulation, ensure it is installed

function check(date, setDate) {
  const checkIn = dayjs(date.checkIn);
  const checkOut = dayjs(date.checkOut);
  // get the date now
  const now = dayjs();
  if (checkIn < now || checkOut < now) {
    setDate({
      ...date,
      checkIn: now,
      checkOut: now.add(1, "day"),
    });

    return false;
  }
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
    return false;
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
    return false;
  }
  return true;
}

const useGetAvailableRooms = (
  setRooms,
  date,
  setDate,
  setRoomsTemp,
  setSelectedRooms
) => {
  const availableRooms = async () => {
    try {
      let flag = check(date, setDate);
      if (!flag) return;
      const response = await axios.post(urls.availableRooms, {
        checkin: date.checkIn,
        checkout: date.checkOut,
      });
      if (response.status === 200) {
        setSelectedRooms([]);
        setRooms(response.data);
        setRoomsTemp(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    availableRooms();
  }, [date]);
};

export default useGetAvailableRooms;
