import { useEffect } from "react";
import axios from "../Apis/axios";
import URLs from "../Apis/URLS.json";
import { toast } from "react-toastify";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const useReceiveOffer = (email, name, submit, setSubmit) => {
  const receive = async () => {
    try {
      const response = await axios.post(URLs.receiveOffer, {
        email: email,
        name: name,
      });
      if (response.status === 200) {
        toast("Subscribed successfully", {
          icon: <CheckCircleIcon sx={{ color: "#0e7a06" }} />,
          theme: "light",
          autoClose: 2000,
          hideProgressBar: true,
        });
      }
      console.log(response);
    } catch (error) {
      toast("Already Subscribed", {
        icon: <CheckCircleIcon sx={{ color: "#0e7a06" }} />,
        theme: "light",
        autoClose: 2000,
        hideProgressBar: true,
      });
      console.error(error);
    } finally {
      setSubmit(false);
    }
  };
  useEffect(() => {
    console.log("Inside useEffect");
    if (submit) {
      console.log("Inside if");
      receive();
    }
  }, [submit]);
};
export default useReceiveOffer;
