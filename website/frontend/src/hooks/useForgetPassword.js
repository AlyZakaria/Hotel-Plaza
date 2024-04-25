import { useEffect } from "react";
import axios from "../Apis/axios";
import URLs from "../Apis/URLS.json";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const useForgetPassword = (user, submit, setSubmit) => {
  const navigate = useNavigate();
  const login = async () => {
    try {
      const response = await axios.post(URLs.forgetPassword, {
        id: user.id,
        email: user.email,
      });

      if (response.status === 200) {
        toast(`Email sent successfully to ${user.email}`, {
          icon: <CheckCircleIcon sx={{ color: "green" }} />,
          theme: "light",
          hideProgressBar: true,
        });
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
