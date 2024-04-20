import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

const Address = () => {
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
          label="Address"
          id="outlined-size-small"
          size="small"
          placeholder="Address"
        />
      </div>
    </Box>
  );
};

export default Address;
