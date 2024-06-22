import ProductHero from "../../components/ProductHero/ProductHero.jsx.jsx";
import CheckAvailability from "../../components/CheckAvalibilty/CheckAvailability.jsx";
import RoomAvailable from "../../components/RoomAvailable/RoomAvailable.jsx";
import { Container } from "@mui/material";
import { Grid } from "@mui/material";
import useGetAvailableRooms from "../../hooks/useGetAvailableRooms.js";
import { useState, useContext } from "react";
import { Box } from "@mui/material";
import { DateContext } from "../../contexts/Date.js";
import SelectedRooms from "../../components/SelectedRooms/SelectedRooms.jsx";
import FilterPanel from "../../components/FilterPanel/FilterPanel.jsx";
import { ClickContext } from "../../contexts/ButtonClick.js";
import { selectedRoomsContext } from "../../contexts/selectedRooms.js";
import { RoomsContext } from "../../contexts/Rooms.js";
const RoomsAvailable = () => {
  // Contexts
  let { date, setDate } = useContext(DateContext);
  let { click, setClick } = useContext(ClickContext);
  let { selectedRooms, setSelectedRooms } = useContext(selectedRoomsContext);
  let tempDate = date;
  const { rooms, setRooms } = useContext(RoomsContext);
  const [roomsTemp, setRoomsTemp] = useState([]);
  const [roomFilter, setRoomFilter] = useState([]);
  const [capacityFilter, setCapacityFilter] = useState([]);
  const nights = date.checkOut.diff(date.checkIn, "day");
  const [isInitialRender, setIsInitialRender] = useState(true);

  useGetAvailableRooms(
    setRooms,
    date,
    setDate,
    setRoomsTemp,
    setSelectedRooms,
    click,
    setClick,
    isInitialRender,
    setIsInitialRender
  );

  return (
    <Box>
      <ProductHero></ProductHero>
      <CheckAvailability></CheckAvailability>
      <Container sx={{ marginTop: "100px", marginBottom: "100px" }}>
        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Grid
            item
            md={7.5}
            xs={12}
            sx={{
              bgcolor: "white",
              height: "100vh",
              overflowY: "auto",
              scrollBehavior: "smooth",
              scrollbarWidth: "none",
            }}
          >
            {roomsTemp &&
              roomsTemp.map((room) => {
                return (
                  <RoomAvailable
                    key={room.roomtypeId}
                    roomType={room}
                    roomImage={room.images2}
                  ></RoomAvailable>
                );
              })}
          </Grid>
          <Grid item md={4} xs={12}>
            <FilterPanel
              roomFilter={roomFilter}
              setRoomFilter={setRoomFilter}
              setRoomsTemp={setRoomsTemp}
              capacityFilter={capacityFilter}
              setCapacityFilter={setCapacityFilter}
            ></FilterPanel>
            <br></br>
            <SelectedRooms nights={nights} date={date} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
export default RoomsAvailable;
