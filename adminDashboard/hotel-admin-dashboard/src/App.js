// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container, Grid, Paper, Typography, Button } from "@mui/material";
import RoomTypeForm from "./components/RoomTypeForm/RoomTypeForm";
import ManageRooms from "./components/ManageRooms/ManageRooms";
import RoomTypesList from "./components/RoomTypeList/RoomTypeList";
import RoomTypeDetails from "./components/RoomTypeDetails/RoomTypeDetails";
import { ActiveContext } from "./contexts/active";
import { RoomTypeContext } from "./contexts/roomType";
import { ToastContainer } from "react-toastify";

let components = [
  <RoomTypeForm />,
  <ManageRooms />,
  <RoomTypesList />,
  <RoomTypeDetails />,
];
let menu = ["Add Room Type", "Manage Rooms", "Show All Room Types"];
// let routes = ["/add-room-type", "/manage-rooms", "/show-all-room-types"];
const App = () => {
  let [active, setActive] = useState(0);
  let [roomType, setRoomType] = useState({});

  let currentComponent = components[active];
  return (
    <>
      <ActiveContext.Provider value={{ active, setActive }}>
        <RoomTypeContext.Provider value={{ roomType, setRoomType }}>
          <Container maxWidth="lg">
            <Grid container spacing={3}>
              {/* Header */}
              <Grid item xs={12}>
                <Paper elevation={3} style={{ padding: "16px" }}>
                  <Typography variant="h4">Hotel Admin Dashboard</Typography>
                </Paper>
              </Grid>

              {/* Sidebar */}
              <Grid item xs={3}>
                <Paper elevation={3} style={{ padding: "16px" }}>
                  <Typography variant="h6">Menu</Typography>
                  {menu.map((item, index) => {
                    return (
                      <Button
                        key={index}
                        fullWidth
                        variant="contained"
                        color={index % 2 == 0 ? "primary" : "secondary"}
                        style={{ marginBottom: "8px" }}
                        onClick={() => setActive(index)}
                        to={`/`}
                      >
                        {item}
                      </Button>
                    );
                  })}
                </Paper>
              </Grid>

              {/* Main Content */}

              <Grid item xs={9}>
                <Paper elevation={3} style={{ padding: "16px" }}>
                  {currentComponent}
                </Paper>
              </Grid>
            </Grid>
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
          </Container>
        </RoomTypeContext.Provider>
      </ActiveContext.Provider>
    </>
  );
};

export default App;
