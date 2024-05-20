import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";

const NameForm = ({ customer, setCustomer }) => {
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
        display: "flex",
        justifyContent: "center",
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          hiddenLabel
          id="filled-hidden-label-small"
          placeholder="First Name"
          variant="standard"
          size="small"
          sx={{
            bgcolor: "white !important",
          }}
          onChange={(e) => setCustomer({ ...customer, fname: e.target.value })}
        />
        <TextField
          hiddenLabel
          id="filled-hidden-label-small"
          placeholder="Second Name"
          variant="standard"
          size="small"
          sx={{
            bgcolor: "white",
          }}
          onChange={(e) => setCustomer({ ...customer, lname: e.target.value })}
        />
      </div>
    </Box>
  );
};

export default NameForm;
