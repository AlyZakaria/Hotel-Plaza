import * as React from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
export default function BasicSpeedDial() {
  return (
    <Box
      sx={{
        height: 100,
        transform: "translateZ(0px)",
        flexGrow: 1,
      }}
    >
      <SpeedDial
        onClick={(event) => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        ariaLabel="anchor"
        sx={{
          position: "absolute",
          bottom: 16,
          right: 16,
        }}
        icon={<KeyboardArrowUpIcon />}
      ></SpeedDial>
    </Box>
  );
}
