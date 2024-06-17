import { useEffect } from "react";
import axios from "../Apis/axios";
import URLs from "../Apis/URLS.json";

const useGetRoomsWithCapacity = (setRoomsTypes, setCapacity) => {
  async function getRoomsWithCapacity() {
    try {
      const response = await axios.get(`${URLs.roomTypesWithCapacity}`);
      if (response.status === 200) {
        setRoomsTypes(response.data.map((room) => room.name));
        const capacities = [
          ...new Set(response.data.map((room) => room.capacity)),
        ];
        // sort capacity
        capacities.sort((a, b) => a - b);

        setCapacity([...capacities]);
        // I want the capacity to be array of numbers and unique
      }
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getRoomsWithCapacity();
  }, []);
};
export default useGetRoomsWithCapacity;
