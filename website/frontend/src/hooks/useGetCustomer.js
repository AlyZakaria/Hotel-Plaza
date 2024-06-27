import { useEffect } from "react";

const useGetCustomer = (customer, setCustomer) => {
  function handleCustomer() {
    if (localStorage.getItem("logout")) {
      setCustomer({});
      localStorage.removeItem("customer");
      localStorage.removeItem("token");
      sessionStorage.removeItem("customer");
      sessionStorage.removeItem("token");
      return;
    }
    let tempCustomer = JSON.parse(sessionStorage.getItem("customer"));
    let remember = false;
    if (localStorage.getItem("customer") && localStorage.getItem("token")) {
      tempCustomer = JSON.parse(localStorage.getItem("customer"));
    }
    if (tempCustomer) {
      if (localStorage.getItem("customer")) {
        sessionStorage.setItem("customer", JSON.stringify(tempCustomer));
        let token = localStorage.getItem("token").replace(/"/g, "");
        sessionStorage.setItem("token", JSON.stringify(token));
        remember = true;
      }
    }

    setCustomer({ ...tempCustomer, remember: remember });
  }
  useEffect(() => {
    handleCustomer();
  }, []);
};
export default useGetCustomer;
