import { useEffect } from "react";
import axios from "../Apis/axios";
import URLs from "../Apis/URLS.json";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
const useResetPassword = (passwords, submit, setSubmit) => {
  const navigate = useNavigate();
  const reset = async () => {
    try {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + sessionStorage.getItem("otpToken");
      const response = await axios.post(URLs.resetPassword, passwords);
      if (response.status === 200) {
        toast("Password reset successful", {
          icon: <CheckCircleIcon sx={{ color: "#0e7a06" }} />,
          theme: "light",
          autoClose: 2000,
          hideProgressBar: true,
        });
        navigate("/");
        sessionStorage.removeItem("emailOtp");
        sessionStorage.removeItem("otpToken");
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submit]);
};
export default useResetPassword;
