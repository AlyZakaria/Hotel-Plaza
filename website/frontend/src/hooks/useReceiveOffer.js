import { useEffect } from "react";
import axios from "../Apis/axios";
import URLs from "../Apis/URLS.json";
const useReceiveOffer = (email, submit, setSubmit) => {
  const receive = async () => {
    try {
      const response = await axios.post(URLs.receiveOffer, email);
      console.log(response);
    } catch (error) {
      console.error(error);
    } finally {
      setSubmit(false);
    }
  };
  useEffect(() => {
    console.log("Inside useEffect");
    if (submit) {
      console.log("Inside if");
      receive();
    }
  }, [submit]);
};
export default useReceiveOffer;
