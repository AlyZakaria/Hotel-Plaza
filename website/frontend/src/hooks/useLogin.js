import { useEffect } from "react";
import axios from "../Apis/axios";
import URLs from "../Apis/URLS.json";
const useLogin = (userData, submit, setSubmit) => {
  const login = async () => {
    try {
      console.log(userData);
      const response = await axios.post(URLs.login, userData);
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
      login();
    }
  }, [submit]);
};
export default useLogin;
