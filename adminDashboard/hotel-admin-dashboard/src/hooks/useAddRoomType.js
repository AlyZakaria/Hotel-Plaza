import { useEffect } from "react";
import axios from "../Apis/axios";
import URLS from "../Apis/URLS.json";
const useAddRoomType = (
  name,
  description,
  price,
  capacity,
  view,
  bed,
  area,
  images,
  save,
  setSave,
  setActive
) => {
  const addRoomType = async () => {
    try {
      //   const formData = new FormData();
      //   formData.append("files", images);

      const response = await axios.post(
        URLS.addRoomType,
        {
          name,
          description,
          pricepernight: price,
          capacity,
          view: view.value,
          bed: bed.value,
          size: area,
          images,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 201) {
        console.log("Room type added successfully:", response.data);
        setActive(3);
      }
    } catch (error) {
      console.log("Error adding room type:", error);
    } finally {
      setSave(false);
    }
  };
  useEffect(() => {
    if (save) {
      // Implement save logic
      addRoomType();
    }
  }, [save]);
};

export default useAddRoomType;
