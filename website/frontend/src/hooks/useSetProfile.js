import { useEffect } from "react";
import { toast } from "react-toastify";
import axios from "../Apis/axios";
import urls from "../Apis/URLS.json";
import { useNavigate } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const useSetprofile = (upload, setUpload, customer, setCustomer, profile) => {
  const navigate = useNavigate();
  const uploadProfile = async () => {
    try {
      let data = new FormData();
      data.append("files", profile, profile.name);

      // set token
      let token = JSON.parse(sessionStorage.getItem("token"));
      console.log(token);
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }
      const response = await axios.put(
        `${urls.uploadProfile}/${customer.id}`,
        data,

        {
          headers: {
            "Content-Type": data.type,
          },
        }
      );
      if (response.status === 200) {
        setCustomer({
          ...customer,
          image: response.data.image,
          imageType: response.data.imageType,
        });
        sessionStorage.setItem("customer", JSON.stringify(response.data));
        toast("Profile uploaded successfully", {
          icon: <CheckCircleIcon sx={{ color: "green" }} />,
          theme: "light",
          hideProgressBar: true,
        });
        console.log("Profile uploaded successfully");
      } else {
        console.log("Error uploading profile");
      }
    } catch (err) {
      console.log("Error uploading profile");
      console.log(err);
    } finally {
      setUpload(false);
    }
  };
  useEffect(() => {
    if (!sessionStorage.getItem("customer")) {
      console.log("No customer");
      navigate("/");
    }

    if (upload) {
      uploadProfile();
    }
  }, [upload]);
};

export default useSetprofile;
