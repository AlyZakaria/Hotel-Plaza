import { useEffect } from "react";
import axios from "../Apis/axios";
import URLs from "../Apis/URLS.json";

const useRoomDetails = (setRoomDetails, setRender, id) => {
  const getRoomDetails = async () => {
    try {
      const response = await axios.get(`${URLs.roomDetails}id=${id}`);
      if (response.status === 200) {
        setRoomDetails(response.data);
        setRender(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getRoomDetails();
  }, []);
};

export default useRoomDetails;
