import { createTheme } from "@mui/material/styles";

const FooterTheme = createTheme({
  palette: {
    primary: {
      main: "#ff5722",
    },
    secondary: {
      main: "#009688",
    },
  },
  typography: {
    h1: {
      fontSize: "2rem",
      fontWeight: "bold",
    },
    h6: {
      fontWeight: "bold",
      color: "white",
    },
  },
  // Add more customizations here
});

export default FooterTheme;
