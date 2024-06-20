import { useEffect } from "react";
import axios from "../Apis/axios";
import URLs from "../Apis/URLS.json";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DangerousIcon from "@mui/icons-material/Dangerous";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
const useLogin = (userData, setCustomer, submit, setSubmit) => {
  const navigate = useNavigate();
  const login = async () => {
    try {
      const response = await axios.post(URLs.login, userData);
      if (response.status === 200) {
        setCustomer({ ...response.data, remember: userData.remember });
        // check if already customer in session storage as maybe
        // I logged out from other tab and still this tab save old customer
        // in session storage

        if (
          sessionStorage.getItem("token") ||
          sessionStorage.getItem("customer")
        ) {
          sessionStorage.removeItem("token");
          sessionStorage.removeItem("customer");
        }
        // set new customer in storage
        sessionStorage.setItem("token", JSON.stringify(response.data.token));
        sessionStorage.setItem("customer", JSON.stringify(response.data));
        if (userData.remember) {
          localStorage.setItem("token", JSON.stringify(response.data.token));
          localStorage.setItem("customer", JSON.stringify(response.data));
          localStorage.setItem("remember", JSON.stringify(true));
        }

        if (localStorage.getItem("logout")) {
          localStorage.removeItem("logout");
        }

        toast.success("Login Successfull", {
          icon: <CheckCircleIcon sx={{ color: "green" }} />,
          hideProgressBar: true,
          autoClose: 1000,
          theme: "light",
        });
        navigate("/");
      }
      console.log(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Invalid email or password", {
        icon: <DangerousIcon />,
        theme: "light",
      });
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
