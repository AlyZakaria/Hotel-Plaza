import { useEffect } from "react";
import axios from "../Apis/axios.js";
const usePay = (selectedRooms, pay, setPay, date) => {
  const payNow = async () => {
    try {
      selectedRooms = selectedRooms.map((room) => {
        // return all expect images2
        const { images2, ...rest } = room;
        return rest;
      });
      // set Token
      let token = JSON.parse(sessionStorage.getItem("token"));
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      
      const response = await axios.post("/api/book", {
        date: {
          checkin: date.checkIn,
          checkout: date.checkOut,
        },
        rooms: selectedRooms,
      });
      if (response.status === 200) {
        console.log("Payment Successful");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setPay(false);
    }
  };
  useEffect(() => {
    if (pay) {
      payNow();
    }
  }, [pay]);
};

export default usePay;
