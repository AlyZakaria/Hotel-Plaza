import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import countries from "./countries";

const CountrySelect = ({ customer, setCustomer }) => {
  return (
    // <Autocomplete
    //   id="country-customized-option-demo"
    //   options={countries}
    //   disableCloseOnSelect
    //   getOptionLabel={(option) => `${option.label} `}
    //   renderInput={(params) => (
    //     <TextField
    //       {...params}
    //       label="Choose a country"
    //       onChange={(e) => {
    //         console.log(e.target.value);
    //         setCustomer({ ...customer, country: e.target.value });
    //       }}
    //     />
    //   )}
    // />
    <Autocomplete
      id="country-customized-option-demo"
      options={countries}
      disableCloseOnSelect
      getOptionLabel={(option) => `${option.label} `}
      onChange={(event, newValue) => {
        if (newValue) {
          console.log(newValue.label);
          setCustomer({ ...customer, country: newValue.label });
        } else {
          setCustomer({ ...customer, country: "" });
        }
      }}
      renderInput={(params) => (
        <TextField {...params} label="Choose a country" />
      )}
    />
  );
};

export default CountrySelect;
