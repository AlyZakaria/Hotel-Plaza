import { useEffect } from "react";
import axios from "../Apis/axios";
import URLs from "../Apis/URLS.json";

const useRoomDetails = (setRoomTypes) => {
  const getRoomDetails = async () => {
    try {
      const response = await axios.get(URLs.getRoomTypes);

      setRoomTypes(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getRoomDetails();
    //eslint-disable-next-line
  }, []);
};

export default useRoomDetails;
