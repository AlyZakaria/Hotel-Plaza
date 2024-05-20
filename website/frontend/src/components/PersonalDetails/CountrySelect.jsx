import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import countries from "./countries";

const CountrySelect = ({ customer, setCustomer }) => {
  return (
    <Autocomplete
      id="country-customized-option-demo"
      options={countries}
      disableCloseOnSelect
      getOptionLabel={(option) => `${option.label} `}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Choose a country"
          onChange={(e) =>
            setCustomer({ ...customer, country: e.target.value })
          }
        />
      )}
    />
  );
};

export default CountrySelect;
