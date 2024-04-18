import { useEffect } from "react";
import axios from "../Apis/axios";
import URLs from "../Apis/URLS.json";
import { useNavigate } from "react-router-dom";
const useForgetPassword = (user, submit, setSubmit) => {
  const navigate = useNavigate();
  const login = async () => {
    try {
      const response = await axios.post(URLs.forgetPassword, user);

      if (response.status === 200) {
        //
        sessionStorage.setItem("emailOtp", user.email);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submit]);
};
export default useForgetPassword;
