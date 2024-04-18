import { useEffect } from "react";
import axios from "../Apis/axios";
import URLs from "../Apis/URLS.json";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DangerousIcon from "@mui/icons-material/Dangerous";
const useOTP = (otp, submit, setSubmit) => {
  const navigate = useNavigate();
  const verifyOTP = async () => {
    try {
      let email = sessionStorage.getItem("emailOtp");
      const response = await axios.post(URLs.otp, { email: email, otp: otp });
      if (response.status === 200) {
        sessionStorage.setItem("otpToken", response.data);
        navigate("/reset-Password");
      } else {
      }
      console.log("token => " + response.data);
    } catch (error) {
      toast("Invalid OTP", {
        icon: <DangerousIcon sx={{ color: "red" }} />,
        theme: "light",
        autoClose: 2000,
        hideProgressBar: true,
      });
      console.error(error);
    } finally {
      setSubmit(false);
    }
  };
  useEffect(() => {
    if (submit) {
      verifyOTP();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submit]);
};
export default useOTP;
