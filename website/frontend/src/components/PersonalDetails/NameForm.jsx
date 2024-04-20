import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

const NameForm = () => {
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
        />
      </div>
    </Box>
  );
};

export default NameForm;
