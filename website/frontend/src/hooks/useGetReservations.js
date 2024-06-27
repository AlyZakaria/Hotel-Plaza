import { useEffect } from "react";
import axios from "../Apis/axios";
import URLS from "../Apis/URLS.json";
const useGetReservations = (setReservations) => {
  useEffect(() => {
    const getReservations = async () => {
      try {
        // set token
        let token = JSON.parse(sessionStorage.getItem("token"));
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const response = await axios.get(`${URLS.myReservations}`);
        // sort the reservations by status as start by reserved, checked_in, checked_out, cancelled
        response.data.sort((a, b) => {
          if (a.rooms[0].status === "reserved") return -1;
          if (
            a.rooms[0].status === "checked_in" &&
            b.rooms[0].status !== "reserved"
          )
            return -1;
          if (
            a.rooms[0].status === "checked_out" &&
            b.rooms[0].status !== "reserved"
          )
            return -1;
          if (
            a.rooms[0].status === "cancelled" &&
            b.rooms[0].status !== "reserved"
          )
            return -1;
          return 1;
        });
        if (response.status === 200) setReservations(response.data);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };
    getReservations();
  }, []);
};

export default useGetReservations;
