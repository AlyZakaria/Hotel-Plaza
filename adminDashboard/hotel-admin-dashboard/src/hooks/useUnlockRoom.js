import { useEffect } from "react";
import axios from "../Apis/axios";
import URLS from "../Apis/URLS.json";

const useUnlockRoom = (room, setRoom, unlock, setUnlock) => {
  const unlockRoom = async () => {
    try {
      const response = await axios.post(URLS.unlockRoom, {
        room_id: room.room_id,
      });
      if (response.status === 200) {
        console.log(response.data);
        alert("Room Unlocked Successfully");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setUnlock(false);
      setRoom({});
    }
  };

  useEffect(() => {
    if (unlock) unlockRoom();
  }, [unlock]);
};

export default useUnlockRoom;
