import { useEffect } from "react";
import axios from "../Apis/axios";
import URLS from "../Apis/URLS.json";

const useMakeRoomOffline = (room, setRoom, makeOffline, setMakeOffline) => {
  const makeRoomOffline = async () => {
    try {
      const response = await axios.post(URLS.makeRoomOffline, {
        room_id: room.room_id,
      });
      if (response.status === 200) {
        console.log(response.data);
        alert("Room is now offline accessible");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setMakeOffline(false);
      setRoom({});
    }
  };
  useEffect(() => {
    if (makeOffline) makeRoomOffline();
  }, [makeOffline]);
};

export default useMakeRoomOffline;
