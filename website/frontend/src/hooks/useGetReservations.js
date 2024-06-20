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
        if (response.status === 200) setReservations(response.data);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };
    getReservations();
  }, []);
};

export default useGetReservations;
