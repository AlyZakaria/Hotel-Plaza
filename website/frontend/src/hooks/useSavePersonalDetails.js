import { useEffect } from "react";
import axios from "../Apis/axios";
import urls from "../Apis/URLS";

const useSavePersonalDetails = (save, setSave, tempCustomer, setCustomer) => {
  const savePersonalDetails = async () => {
    try {
      console.log(tempCustomer);
      let response = await axios.put(urls.updateCustomer, tempCustomer);
      if (response.status === 200) {
        console.log(response.data);
        setCustomer({ ...tempCustomer });
        sessionStorage.setItem("customer",  JSON.stringify(tempCustomer));
        setSave(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSave(false);
    }
  };
  useEffect(() => {
    console.log("Inside useEffect");
    if (save) {
      console.log("Inside if");
      savePersonalDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [save]);
};

export default useSavePersonalDetails;
