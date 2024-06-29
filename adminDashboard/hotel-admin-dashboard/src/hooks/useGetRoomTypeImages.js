import { useEffect } from "react";
import axios from "../Apis/axios";
import URLS from "../Apis/URLS.json";

const useGetRoomTypeImages = (roomTypeId, setImages) => {
  const getRoomTypeImages = async () => {
    try {
      let response = await axios.get(`${URLS.roomTypeImages}?id=${roomTypeId}`);
      if (response.status === 200) setImages(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRoomTypeImages();
  }, []);
};

export default useGetRoomTypeImages;
