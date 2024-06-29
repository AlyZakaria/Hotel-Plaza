import { useEffect } from "react";
import axios from "../Apis/axios";
import URLS from "../Apis/URLS.json";
const useGetRoomTypes = (setRoomTypes) => {
  const getRoomTypes = async () => {
    try {
      let response = await axios.get(URLS.allRoomTypes);
      if (response.status === 200) setRoomTypes(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getRoomTypes();
  }, []);
};
export default useGetRoomTypes;
