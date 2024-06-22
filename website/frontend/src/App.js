import "./App.css";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import router from "../src/routes/router";
import GlobalTheme from "../src/themes/GlobalTheme";
import { ToastContainer } from "react-toastify";
import { DateContext } from "./contexts/Date";
import { CustomerContext } from "./contexts/Customer";
import { selectedRoomsContext } from "./contexts/selectedRooms";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import useGetCustomer from "./hooks/useGetCustomer";
import dayjs from "dayjs";
import { ClickContext } from "./contexts/ButtonClick";
import { RoomsContext } from "./contexts/Rooms";
function App() {
  const [customer, setCustomer] = useState({});
  const [selectedRooms, setSelectedRooms] = useState([]);
  const now = dayjs();
  const [date, setDate] = useState({
    checkIn: now,
    checkOut: now.add(1, "day"),
  });
  const [click, setClick] = useState(false);
  const [rooms, setRooms] = useState([]);
  useGetCustomer(customer, setCustomer);

  return (
    <div className="App">
      <ThemeProvider theme={GlobalTheme}>
        <CustomerContext.Provider value={{ customer, setCustomer }}>
          <RoomsContext.Provider value={{ rooms, setRooms }}>
            <DateContext.Provider value={{ date, setDate }}>
              <ClickContext.Provider value={{ click, setClick }}>
                <selectedRoomsContext.Provider
                  value={{ selectedRooms, setSelectedRooms }}
                >
                  <RouterProvider router={router} />
                </selectedRoomsContext.Provider>
              </ClickContext.Provider>
            </DateContext.Provider>
          </RoomsContext.Provider>
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
