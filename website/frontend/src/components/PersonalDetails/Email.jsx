import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

const Email = () => {
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
          label="Email"
          id="outlined-size-small"
          size="small"
          placeholder="Email"
        />
      </div>
    </Box>
  );
};

export default Email;
