import { useEffect } from "react";
import axios from "../Apis/axios";
import URLs from "../Apis/URLS.json";
import { useNavigate } from "react-router-dom";
const useForgetPassword = (email, submit, setSubmit) => {
  const navigate = useNavigate();
  const login = async () => {
    try {
      console.log(email);
      const response = await axios.post(URLs.reset, email);
      console.log(response.status);
      if (response.status == 200) {
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
