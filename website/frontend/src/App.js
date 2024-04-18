import "./App.css";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import router from "../src/routes/router";
import customTheme from "../src/themes/customTheme";
import { ToastContainer } from "react-toastify";
import { DateContext } from "./contexts/Date";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import dayjs from "dayjs";

function App() {
  const [date, setDate] = useState({
    checkIn: dayjs("2024-04-17"),
    checkOut: dayjs("2024-04-18"),
  });

  return (
    <div className="App">
      <ThemeProvider theme={customTheme}>
        <DateContext.Provider value={{ date, setDate }}>
          <RouterProvider router={router} />
        </DateContext.Provider>
        <ToastContainer
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          type="warning"
        />
      </ThemeProvider>
    </div>
  );
}

export default App;
