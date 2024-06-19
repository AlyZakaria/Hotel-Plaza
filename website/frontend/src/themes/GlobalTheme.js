import { createTheme } from "@mui/material/styles";

const GlobalTheme = createTheme({
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
      fontFamily: "Lato",
    },
    h2: {
      fontFamily: "Lato",
    },
    h3: {
      fontFamily: "Lato",
    },
    h4: {
      fontFamily: "Lato",
    },
    h5: {
      fontFamily: "Lato",
    },
    h6: {
      fontWeight: "bold",
    },
  },
  // Add more customizations here
});

export default GlobalTheme;
