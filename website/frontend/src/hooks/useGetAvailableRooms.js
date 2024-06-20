import { useEffect } from "react";
import urls from "../Apis/URLS.json";
import axios from "../Apis/axios.js";
import "react-toastify/dist/ReactToastify.css";
import dayjs from "dayjs"; // Using dayjs for date manipulation, ensure it is installed

function check(date, setDate) {
  const checkIn = dayjs(date.checkIn);
  const checkOut = dayjs(date.checkOut);
  // get the date now
  const now = dayjs();

  if (dayjs(date.checkOut).isBefore(dayjs(date.checkIn))) {
    const newCheckOut = checkIn.add(1, "day");
    setDate((prevDate) => ({ ...prevDate, checkOut: newCheckOut }));

    return false;
  } else if (dayjs(date.checkIn).isAfter(dayjs(date.checkOut))) {
    setDate({
      ...date,
      checkIn: checkOut.subtract(1, "day").toDate(),
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
  setSelectedRooms,
  click,
  setClick,
  isInitialRender,
  setIsInitialRender
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
        if (!isInitialRender) {
          setSelectedRooms([]);
        }
        setIsInitialRender(false);
        setRooms(response.data);
        setRoomsTemp(response.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setClick(false);
    }
  };
  useEffect(() => {
    availableRooms();
    console.log("Here");
  }, [date.checkIn, date.checkOut]);
};

export default useGetAvailableRooms;
