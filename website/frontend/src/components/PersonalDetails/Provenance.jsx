import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

const Provenance = ({ customer, setCustomer }) => {
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
          label="Provenance"
          id="outlined-size-small"
          size="small"
          placeholder="Provenance"
          onChange={(e) =>
            setCustomer({ ...customer, provenance: e.target.value })
          }
        />
      </div>
    </Box>
  );
};
export default Provenance;
