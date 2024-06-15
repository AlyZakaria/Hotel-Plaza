import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import dayjs from "dayjs";

const Birthdate = ({ customer, setCustomer }) => {
  const [value, setValue] = React.useState(
    dayjs(customer.dob).format("YYYY-MM-DD")
  );
  const minDate = dayjs("1900-01-01");
  const maxDate = dayjs().subtract(21, "year");
  if (!dayjs(customer.dob).isValid()) {
    alert("Invalid date");
  } else if (dayjs(customer.dob).isBefore(minDate)) {
    alert("Invalid date");
  } else if (dayjs(customer.dob).isAfter(maxDate)) {
    alert("Invalid date");
  }

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
