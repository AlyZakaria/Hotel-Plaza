import { useEffect } from "react";
import axios from "../Apis/axios";
import URLs from "../Apis/URLS.json";
const useSignUp = (userData, submit, setSubmit) => {
  const signUp = async () => {
    try {
      console.log(userData);
      const response = await axios.post(URLs.SignUp, userData);
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
