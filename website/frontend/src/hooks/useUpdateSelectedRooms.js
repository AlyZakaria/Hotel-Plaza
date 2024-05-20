import { useEffect } from "react";

const useUpdateSelectedRooms = (rooms, setSelectedRooms) => {
  useEffect(() => {
    // update the price of selected rooms
    setSelectedRooms((prev) =>
      prev.map((room) => {
        const selectedRoom = rooms.find(
          (availableRoom) => availableRoom.roomtypeId === room.roomtypeId
        );
        return selectedRoom ? selectedRoom : room;
      })
    );
  }, [rooms]);
};

export default useUpdateSelectedRooms;
