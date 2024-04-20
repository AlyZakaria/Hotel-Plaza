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
      console.log(userData);
      const response = await axios.post(URLs.login, userData);
      if (response.status === 200) {
        console.log("Login Successfull");
        setCustomer({ ...response.data });
        sessionStorage.setItem("token", JSON.stringify(response.data.token));
        sessionStorage.setItem("customer", JSON.stringify(response.data));
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
