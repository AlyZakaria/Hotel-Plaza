import { useEffect } from "react";

const useGetCustomer = (setCustomer) => {
  useEffect(() => {
    
    let customer = JSON.parse(sessionStorage.getItem("customer"));
    if (customer) {
      setCustomer({ ...customer });
    }
  }, []);
};
export default useGetCustomer;
