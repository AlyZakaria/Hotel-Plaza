import { useEffect } from "react";
import axios from "../Apis/axios";
import URLs from "../Apis/URLS.json";

const useGetRoomDetailBox = (setRoomDetails) => {
  const getRoomDetail = async () => {
    try {
      const response = await axios.get(URLs.roomDetails);

      setRoomDetails(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getRoomDetail();
    //eslint-disable-next-line
  }, []);
};

export default useGetRoomDetailBox;
