import { useEffect } from "react";
import urls from "../Apis/URLS.json";
import axios from "../Apis/axios.js";

const useGetAvailableRooms = (setRooms, date) => {
  const availableRooms = async () => {
    try {
      console.log(date.checkIn, date.checkOut);
      const response = await axios.post(urls.availableRooms, {
        checkin: date.checkIn,
        checkout: date.checkOut,
      });
      if (response.status === 200) {
        console.log(response.data);
        setRooms(response.data);
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
