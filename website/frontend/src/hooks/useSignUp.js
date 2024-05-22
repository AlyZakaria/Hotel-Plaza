import { useEffect } from "react";
import axios from "../Apis/axios";
import URLs from "../Apis/URLS.json";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const useSignUp = (userData, customer, setCustomer, submit, setSubmit) => {
  const navigate = useNavigate();
  const signUp = async () => {
    try {
      console.log(userData);
      const response = await axios.post(URLs.SignUp, userData);
      if (response.status === 201) {
        setCustomer({ ...response.data });
        navigate("/");
        console.log("Sign Up Successfull");
      }
      console.log(response.data);
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
      signUp();
    }
  }, [submit]);
};
export default useSignUp;
