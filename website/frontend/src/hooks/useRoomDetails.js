import { useEffect, useRef } from "react";
import axios from "../Apis/axios";
import URLs from "../Apis/URLS.json";

const useRoomDetails = (setRoomDetails, setRender, id, rendered) => {
  const requested = useRef(false);

  const getRoomDetails = async () => {
    try {
      const response = await axios.get(`${URLs.roomDetails}id=${id}`);
      if (response.status === 200) {
        requested.current = true;
        setRoomDetails(response.data);
        setRender(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!requested.current) {
      console.log(requested.current);
      getRoomDetails();
    }
  }, []);
};

export default useRoomDetails;
