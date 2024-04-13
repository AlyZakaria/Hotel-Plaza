import { useEffect } from "react";
import axios from "../Apis/axios";
import URLs from "../Apis/URLS.json";

const useGetRoomTypes = (setRoomTypes) => {
  const getRoomTypes = async () => {
    try {
      const response = await axios.get(URLs.getRoomTypes);

      setRoomTypes(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getRoomTypes();
    //eslint-disable-next-line
  }, []);
};

export default useGetRoomTypes;
