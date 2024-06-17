import { useEffect } from "react";

const useGetCustomer = (setCustomer) => {
  function handleCustomer() {
    if (localStorage.getItem("logout")) {
      setCustomer({});
      return;
    }
    let customer = JSON.parse(sessionStorage.getItem("customer"));
    if (localStorage.getItem("customer") && localStorage.getItem("token")) {
      console.log("localStorage");
      customer = JSON.parse(localStorage.getItem("customer"));
    }
    if (customer) {
      if (localStorage.getItem("customer")) {
        sessionStorage.setItem("customer", JSON.stringify(customer));
        sessionStorage.setItem("token", JSON.stringify(customer.token));
      }
      
      setCustomer({ ...customer });
    }
  }
  useEffect(() => {
    handleCustomer();
  }, []);
};
export default useGetCustomer;
