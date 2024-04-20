import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import countries from "./countries";

const CountrySelect = () => {
  return (
    <Autocomplete
      id="country-customized-option-demo"
      options={countries}
      disableCloseOnSelect
      getOptionLabel={(option) => `${option.label} `}
      renderInput={(params) => (
        <TextField {...params} label="Choose a country" />
      )}
    />
  );
};

export default CountrySelect;
