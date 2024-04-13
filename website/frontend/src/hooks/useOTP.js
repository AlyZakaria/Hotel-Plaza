import { useEffect } from "react";
import axios from "../Apis/axios";
import URLs from "../Apis/URLS.json";
const useOTP = (otp, submit, setSubmit) => {
  const verifyOTP = async () => {
    try {
      let email = sessionStorage.getItem("emailOtp");
      const response = await axios.post(URLs.otp, { email: email , otp: otp });
      console.log("token => " + response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setSubmit(false);
    }
  };
  useEffect(() => {
    if (submit) {
      verifyOTP();
    }
  }, [submit]);
};
export default useOTP;
