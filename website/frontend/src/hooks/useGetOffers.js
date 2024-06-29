import axios from "../Apis/axios";
import URL from "../Apis/URLS.json";
import { useEffect } from "react";
const useGetOffers = (setOffers) => {
  const getOffers = async () => {
    try {
      const response = await axios.get(URL.offers);
      if (response.status === 200) {
        setOffers(response.data);
      } else {
        setOffers([]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getOffers();
  }, []);
};

export default useGetOffers;
