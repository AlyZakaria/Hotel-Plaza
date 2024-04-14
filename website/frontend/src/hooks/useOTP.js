import { useEffect } from "react";
import axios from "../Apis/axios";
import URLs from "../Apis/URLS.json";
import { useNavigate } from "react-router-dom";
const useOTP = (otp, submit, setSubmit) => {
  const navigate = useNavigate();
  const verifyOTP = async () => {
    try {
      let email = sessionStorage.getItem("emailOtp");
      const response = await axios.post(URLs.otp, { email: email, otp: otp });
      if (response.status === 200) {
        sessionStorage.setItem("otpToken", response.data);
        navigate("/reset-Password");
      }
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
