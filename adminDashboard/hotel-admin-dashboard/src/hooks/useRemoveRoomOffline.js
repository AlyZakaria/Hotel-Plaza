import { useEffect } from "react";
import axios from "../Apis/axios";
import URLS from "../Apis/URLS.json";

const useRemoveRoomOffline = (
  room,
  setRoom,
  removeOffline,
  setRemoveOffline
) => {
  const removeRoomOffline = async () => {
    try {
      const response = await axios.post(URLS.removeRoomOffline, {
        room_id: room.room_id,
      });
      if (response.status === 200) {
        console.log(response.data);
        alert("Room is now not offline accessible");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setRemoveOffline(false);
      setRoom({});
    }
  };

  useEffect(() => {
    if (removeOffline) removeRoomOffline();
  }, [removeOffline]);
};

export default useRemoveRoomOffline;
