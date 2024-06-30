import { useEffect } from "react";
import axios from "../Apis/axios";
import URLS from "../Apis/URLS.json";

const useLockRoom = (room, setRoom, lock, setLock) => {
  const lockRoom = async () => {
    try {
      const response = await axios.post(URLS.lockRoom, {
        room_id: room.room_id,
      });
      if (response.status === 200) {
        console.log(response.data);
        alert("Room Locked Successfully");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLock(false);
      setRoom({});
    }
  };

  useEffect(() => {
    if (lock) {
      lockRoom();
    }
  }, [lock]);
};

export default useLockRoom;
