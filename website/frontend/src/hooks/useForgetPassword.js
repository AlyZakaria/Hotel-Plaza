import { useEffect } from "react";
import axios from "../Apis/axios";
import URLs from "../Apis/URLS.json";
import { useNavigate } from "react-router-dom";
const useForgetPassword = (email, submit, setSubmit) => {
  const navigate = useNavigate();
  const login = async () => {
    try {
      const response = await axios.post(URLs.forgetPassword, email);

      if (response.status == 200) {
        //
        sessionStorage.setItem("emailOtp", email.email);
        navigate("/otp");
      }
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
      login();
    }
  }, [submit]);
};
export default useForgetPassword;
