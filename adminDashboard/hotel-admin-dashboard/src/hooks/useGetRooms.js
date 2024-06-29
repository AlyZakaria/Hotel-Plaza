import { useEffect, useState } from "react";
import axios from "../Apis/axios";
import URLS from "../Apis/URLS.json";

const useGetRooms = (setRooms) => {
  const getRooms = async () => {
    try {
      let response = await axios.get(URLS.allRooms);
      if (response.status === 200) {
        console.log(response.data);
        setRooms(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getRooms();
  }, []);
};

export default useGetRooms;
