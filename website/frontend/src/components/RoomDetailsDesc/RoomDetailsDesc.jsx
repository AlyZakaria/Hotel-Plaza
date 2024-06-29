import React from "react";
import Box from "@mui/material/Box";

const RoomDetailsDesc = ({ details }) => {
  return (
    <Box
      sx={{
        width: { sm: "90%", md: "70%" },
        border: "1px solid #e6e6e6",
        borderRadius: "10px",
      }}
    >
      <h1>Room Description</h1>
      <Box
        sx={{
          padding: { md: "0% 5% 5% 5%" },
          textAlign: "left",
          lineHeight: "35px",
        }}
      >
        {details}
      </Box>
    </Box>
  );
};

export default RoomDetailsDesc;
