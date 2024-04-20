import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import { CustomerContext } from "../../contexts/Customer";
import dayjs from "dayjs";

const Birthdate = () => {
  let { customer, setCustomer } = React.useContext(CustomerContext);
  const [value, setValue] = React.useState(dayjs("2022-04-17"));

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateField
        defaultValue={customer.birthdate}
        label="Birthdate"
        value={value}
        onChange={(newValue) => setValue(newValue)}
      />
    </LocalizationProvider>
  );
};

export default Birthdate;
