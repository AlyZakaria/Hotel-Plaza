import { useEffect } from "react";
import axios from "../Apis/axios";
import URLs from "../Apis/URLS.json";

const useLoadImages = (id, setRoomImages, imageClick) => {
  async function loadImages() {
    // load room images
    try {
      const response = await axios.get(`${URLs.roomTypeImages}/${id}`);
      if (response.status === 200) {
        console.log("here");
        console.log(response.data);
        setRoomImages(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (imageClick) loadImages();
  }, [imageClick]);
};

export default useLoadImages;
