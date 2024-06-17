import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import dayjs from "dayjs";

const Birthdate = ({ customer, setCustomer }) => {
  const [value, setValue] = React.useState(
    dayjs(customer.dob).format("YYYY-MM-DD")
  );
 

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateField
        label="Birthdate"
        onChange={(newValue) => {
          const formattedDate = newValue
            ? dayjs(newValue).format("YYYY-MM-DD")
            : "";
          setValue(newValue);
          setCustomer({ ...customer, dob: formattedDate });
        }}
      />
    </LocalizationProvider>
  );
};

export default Birthdate;
