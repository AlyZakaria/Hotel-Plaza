import { useEffect } from "react";
import axios from "../Apis/axios";
import URLS from "../Apis/URLS.json";
import { toast } from "react-toastify";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
const useSaveRoomTypeDetails = (
  id,
  name,
  description,
  price,
  capacity,
  view,
  bed,
  area,
  save,
  setSave,
  setRoomType,
  setActive
) => {
  const saveRoomTypeDetails = async () => {
    try {
      const response = await axios.put(`${URLS.updateRoomType}`, {
        id,
        name,
        description,
        pricepernight: price,
        capacity,
        view: view.value,
        bed,
        size: area,
      });
      if (response.status === 200) {
        setRoomType(response.data);
        setActive(2);

        console.log("Room type details updated successfully");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSave(false);
    }
  };
  useEffect(() => {
    if (save) saveRoomTypeDetails();
  }, [save]);
};

export default useSaveRoomTypeDetails;
