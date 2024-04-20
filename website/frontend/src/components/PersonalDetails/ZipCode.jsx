import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

const ZipCode = () => {
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
          label="zip code"
          id="outlined-size-small"
          size="small"
          placeholder="zip code"
        />
      </div>
    </Box>
  );
};
export default ZipCode;
