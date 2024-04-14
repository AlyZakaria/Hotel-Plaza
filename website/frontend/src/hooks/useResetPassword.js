import { useEffect } from "react";
import axios from "../Apis/axios";
import URLs from "../Apis/URLS.json";
import { useNavigate } from "react-router-dom";
const useResetPassword = (passwords, submit, setSubmit) => {
  const navigate = useNavigate();
  const reset = async () => {
    try {
      const response = await axios.post(URLs.resetPassword, passwords);

      if (response.status == 200) {
        navigate("/");
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
      reset();
    }
  }, [submit]);
};
export default useResetPassword;
