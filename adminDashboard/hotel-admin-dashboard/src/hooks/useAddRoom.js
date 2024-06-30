import { useEffect } from "react";
import axios from "../Apis/axios";
import URLS from "../Apis/URLS.json";
const useAddRoom = (
  add,
  setAdd,
  roomNumber,
  roomTypes,
  roomType,
  status,
  setActive
) => {
  const addNewRoom = async () => {
    try {
      let newRoomType = roomTypes.find((type) => type.id === roomType);
      console.log("roomType", newRoomType);
      const response = await axios.post(`${URLS.addRoom}`, {
        room_id: roomNumber,
        typeId: newRoomType.id,
      });
      if (response.status === 201) {
        console.log("Room added successfully:", response.data);
        setActive(1);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setAdd(false);
    }
  };
  useEffect(() => {
    if (add) addNewRoom();
  }, [add]);
};

export default useAddRoom;
