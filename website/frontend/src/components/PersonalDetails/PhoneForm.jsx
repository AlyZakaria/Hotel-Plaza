import * as React from "react";
import Box from "@mui/material/Box";
import { MuiTelInput } from "mui-tel-input";

const PhoneForm = ({ customer, setCustomer }) => {
  const [phoneNumber, setPhoneNumber] = React.useState("+20");
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = React.useState("");
  // eslint-disable-next-line no-unused-vars
  const [state, setState] = React.useState(false);

  const handlePhoneNumberChange = (newValue) => {
    setPhoneNumber(newValue);
    setCustomer({ ...customer, phone: newValue });
  };
  return (
    <Box sx={{ marginTop: "5px" }}>
      <MuiTelInput
        fullWidth
        id="phone-number"
        name="phone-number"
        label="Phone Number"
        error={state}
        helperText={error}
        value={phoneNumber}
        onChange={handlePhoneNumberChange}
      ></MuiTelInput>
    </Box>
  );
};

export default PhoneForm;
