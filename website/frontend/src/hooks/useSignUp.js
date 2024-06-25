import { useEffect } from "react";
import axios from "../Apis/axios";
import URLs from "../Apis/URLS.json";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const useSignUp = (userData, customer, setCustomer, submit, setSubmit) => {
  const navigate = useNavigate();
  const signUp = async () => {
    try {
      const response = await axios.post(URLs.SignUp, userData);
      if (response.status === 201) {
        navigate("/login");
        toast.success(`The user ${userData.email} has been created`);
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
      signUp();
    }
  }, [submit]);
};
export default useSignUp;
