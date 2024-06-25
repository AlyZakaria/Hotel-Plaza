import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  Toolbar,
} from "@mui/material";
import "./styles.css";
import useGetRoomTypes from "../../hooks/useGetRoomTypes";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#0288d1",
    },
  },
});

const RoomCard = ({ room }) => {
  const navigate = useNavigate();
  console.log(room);
  const navigateTo = () => {
    navigate(`/room-details?id=${room.id}&book=false`);
  };
  return (
    <Card className="room-card" onClick={navigateTo}>
      <div
        className="room-image"
        style={{
          backgroundImage: `url( 
               data:${room.imageUrl.type};base64,${room.imageUrl.blob}`,
        }}
      >
        <div className="room-overlay">
          <Typography variant="h6" className="room-title">
            {room.name}
          </Typography>
          {/* dont show the all description */}

          <Typography variant="body2" className="room-description">
            {room.description && room.description.length > 100}
          </Typography>
          <Typography variant="body2" className="room-price">
            ${room.pricepernight} per night
          </Typography>
        </div>
      </div>
      <Typography variant="h6" className="room-title-initial">
        {room.name}
      </Typography>
    </Card>
  );
};

const RoomTypesCarousel = () => {
  const [roomTypes, setRoomTypes] = useState([]);
  useGetRoomTypes(setRoomTypes);
  return (
    <ThemeProvider theme={theme}>
      {/* <Container> */}
      <Box>
        <Toolbar>
          <Typography
            variant="h5"
            sx={{
              margin: "100px auto 20px auto",
              color: "#444",
              fontWeight: "700",
            }}
          >
            OUR FAVORITE ROOMS
          </Typography>
        </Toolbar>
      </Box>
      <Grid container spacing={0}>
        {roomTypes.map((room, index) => (
          <Grid item xs={12} sm={6} md={12 / roomTypes.length} key={index}>
            <RoomCard room={room} />
          </Grid>
        ))}
      </Grid>
      {/* </Container> */}
    </ThemeProvider>
  );
};

export default RoomTypesCarousel;
