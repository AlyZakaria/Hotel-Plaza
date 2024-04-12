import { createTheme } from "@mui/material/styles";

const customTheme = createTheme({
  typography: {
    fontFamily: "'Roboto Condensed', sans-serif",
    fontSize: 15,
    h5: {
      fontWeight: "bold",
      color: "#FFFFFF",
      fontFamily: "'Roboto Condensed', sans-serif",
      backgroundColor: "#594730",
      padding: "10px",
    },
    p: {
      color: "#061023",
    },
    button: {
      fontWeight: "bold",
      fontFamily: "'Roboto condensed', sans-serif",
    },
  },
});

export default customTheme;
