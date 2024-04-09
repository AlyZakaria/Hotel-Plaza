import { createTheme } from "@mui/material/styles";

const customTheme = createTheme({
  //   palette: {
  //     background: {
  //       paper: "#DDDCD9",
  //       mode: "dark",
  //       default: "#fff",
  //     },
  //     primary: {
  //       main: "#594730",
  //     },
  //     secondary: {
  //       main: "#a38444",
  //     },
  //   },
  typography: {
    fontFamily: "Helvetica",
    fontSize: 13,
    h5: {
      fontWeight: 400,
      color: "#FFFFFF",
      fontFamily: "Black Ops One",
      backgroundColor: "#594730",
      padding: "10px",
    },
    p: {
      color: "#061023",
    },
  },
});

export default customTheme;
