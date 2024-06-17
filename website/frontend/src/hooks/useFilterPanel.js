import { useEffect } from "react";

const useFilterPanel = (roomFilter, capacityFilter, rooms, setRoomsTemp) => {
  useEffect(() => {
    if (roomFilter.length === 0 && capacityFilter.length === 0) {
      setRoomsTemp(rooms);
    } else if (roomFilter.length === 0 && capacityFilter.length !== 0) {
      setRoomsTemp(
        rooms.filter((room) =>
          capacityFilter.includes(room.capacity.toString())
        )
      );
    } else if (roomFilter.length && !capacityFilter.length) {
      setRoomsTemp(rooms.filter((room) => roomFilter.includes(room.roomtype)));
    } else if (roomFilter.length !== 0 && capacityFilter.length !== 0) {
      // Filter rooms based on room type and capacity
      let roomsArray = [];
      roomsArray = rooms.filter((room) => roomFilter.includes(room.roomtype));
      roomsArray = roomsArray.filter((room) =>
        capacityFilter.includes(room.capacity.toString())
      );
      setRoomsTemp([...roomsArray]);
    } else {
      setRoomsTemp(rooms.filter((room) => roomFilter.includes(room.roomtype)));
    }
  }, [roomFilter, capacityFilter]);
};
export default useFilterPanel;
