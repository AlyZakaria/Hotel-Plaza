import "./App.css";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import router from "../src/routes/router";
import customTheme from "../src/themes/customTheme";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={customTheme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </div>
  );
}

export default App;
