import { useEffect } from "react";
import urls from "../Apis/URLS.json";
import axios from "../Apis/axios.js";

const useGetAvailableRooms = (setRooms, date, setRoomsTemp) => {
  const availableRooms = async () => {
    try {
      const response = await axios.post(urls.availableRooms, {
        checkin: date.checkIn,
        checkout: date.checkOut,
      });
      if (response.status === 200) {
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
