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
import Footer from "../../components/Footer/Footer.jsx";
import FilterPanel from "../../components/FilterPanel/FilterPanel.jsx";
const RoomsAvailable = () => {
  let { date } = useContext(DateContext);
  const [rooms, setRooms] = useState([]);
  const [roomsTemp, setRoomsTemp] = useState([]);
  const [roomFilter, setRoomFilter] = useState([]);
  const [capacityFilter, setCapacityFilter] = useState([]);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const nights = date.checkOut.diff(date.checkIn, "day");

  useGetAvailableRooms(setRooms, date, setRoomsTemp);

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
                    selectedRooms={selectedRooms}
                    setSelectedRooms={setSelectedRooms}
                    key={room.roomtypeId}
                    roomType={room}
                    roomImage={room.images2}
                  ></RoomAvailable>
                );
              })}
          </Grid>
          <Grid item md={4} xs={12}>
            <FilterPanel
              rooms={rooms}
              roomFilter={roomFilter}
              setRoomFilter={setRoomFilter}
              setRoomsTemp={setRoomsTemp}
              capacityFilter={capacityFilter}
              setCapacityFilter={setCapacityFilter}
            ></FilterPanel>
            <br></br>
            <SelectedRooms
              rooms={rooms}
              selectedRooms={selectedRooms}
              setSelectedRooms={setSelectedRooms}
              nights={nights}
              date={date}
            />
          </Grid>
        </Grid>
      </Container>
      {/* <Footer></Footer> */}
    </Box>
  );
};
export default RoomsAvailable;
