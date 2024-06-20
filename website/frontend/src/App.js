import "./App.css";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import router from "../src/routes/router";
import GlobalTheme from "../src/themes/GlobalTheme";
import { ToastContainer } from "react-toastify";
import { DateContext } from "./contexts/Date";
import { CustomerContext } from "./contexts/Customer";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import useGetCustomer from "./hooks/useGetCustomer";

import dayjs from "dayjs";
import { ClickContext } from "./contexts/ButtonClick";

function App() {
  const [customer, setCustomer] = useState({});
  const now = dayjs();
  const [date, setDate] = useState({
    checkIn: now,
    checkOut: now.add(1, "day"),
  });
  const [click, setClick] = useState(false);
  useGetCustomer(setCustomer);

  return (
    <div className="App">
      <ThemeProvider theme={GlobalTheme}>
        <CustomerContext.Provider value={{ customer, setCustomer }}>
          <DateContext.Provider value={{ date, setDate }}>
            <ClickContext.Provider value={{ click, setClick }}>
              <RouterProvider router={router} />
            </ClickContext.Provider>
          </DateContext.Provider>
        </CustomerContext.Provider>
      </ThemeProvider>

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
    </div>
  );
}

export default App;
