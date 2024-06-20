import { useEffect } from "react";
import axios from "../Apis/axios";
import urls from "../Apis/URLS";
import dayjs from "dayjs";
const useSavePersonalDetails = (
  save,
  setSave,
  tempCustomer,
  setTempCustomer,
  customer,
  setCustomer
) => {
  const savePersonalDetails = async () => {
    try {
      console.log(tempCustomer);
      const minDate = dayjs("1900-01-01");
      const maxDate = dayjs().subtract(21, "year");
      if (
        !dayjs(tempCustomer.dob).isValid() ||
        dayjs(tempCustomer.dob).isBefore(minDate) ||
        dayjs(tempCustomer.dob).isAfter(maxDate)
      ) {
        setTempCustomer({ ...tempCustomer, dob: customer.dob });
        alert("Invalid date");
        return;
      }

      // set token
      let token = JSON.parse(sessionStorage.getItem("token"));
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      let response = await axios.put(urls.updateCustomer, {
        id: tempCustomer.id,
        fname: tempCustomer.fname,
        lname: tempCustomer.lname,
        email: tempCustomer.email,
        phone: tempCustomer.phone,
        address: tempCustomer.address,
        dob: tempCustomer.dob,
        provenance: tempCustomer.provenance,
        country: tempCustomer.country,
      });
      if (response.status === 200) {
        console.log(response.data);
        setCustomer({ ...tempCustomer });
        sessionStorage.setItem("customer", JSON.stringify(tempCustomer));
        if (customer.remember) {
          localStorage.setItem("customer", JSON.stringify(tempCustomer));
        }
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
