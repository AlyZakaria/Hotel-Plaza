import ProductHero from "../../components/ProductHero/ProductHero.jsx.jsx";
import CheckAvailability from "../../components/CheckAvalibilty/CheckAvailability.jsx";
import RoomAvailable from "../../components/RoomAvailable/RoomAvailable.jsx";
import { Container, Typography } from "@mui/material";
import { Grid } from "@mui/material";
import useGetRoomTypes from "../../hooks/useGetRoomTypes.js";
import { useState, useContext } from "react";
import { Box } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Button from "@mui/material/Button";
import { DateContext } from "../../contexts/Date.js";

const RoomsAvailable = () => {
  let { date } = useContext(DateContext);
  const [rooms, setRooms] = useState([]);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const nights = date.checkOut.diff(date.checkIn, "day");
  useGetRoomTypes(setRooms);

  console.log(selectedRooms);
  const sum = selectedRooms.reduce((acc, room) => {
    return acc + Number(room.pricepernight) * nights;
  }, 0);

  return (
    <div>
      <ProductHero></ProductHero>
      <CheckAvailability></CheckAvailability>
      <Container sx={{ marginTop: "100px" }}>
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
            {rooms.map((room) => {
              return (
                <RoomAvailable
                  selectedRooms={selectedRooms}
                  setSelectedRooms={setSelectedRooms}
                  key={room.id}
                  roomType={room}
                  roomPrice={room.pricepernight}
                  roomImage={room.imageUrl}
                ></RoomAvailable>
              );
            })}
          </Grid>
          <Grid
            item
            md={4}
            xs={12}
            sx={{
              bgcolor: "white",
              border: "2px solid #c6ceda",
              borderRadius: "5px",
              height: "fit-content",
            }}
          >
            {
              <div>
                <Typography
                  variant="h6"
                  component="h6"
                  sx={{
                    textAlign: "left",
                    padding: "20px",
                    fontWeight: "bold",
                  }}
                >
                  EGY {sum} total
                </Typography>
                <Box
                  sx={{
                    paddingTop: "10px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    variant="p"
                    component="p"
                    sx={{
                      textAlign: "left",
                      padding: "20px",
                      fontFamily: "sans-serif",
                    }}
                  >
                    {date.checkIn.format("DD MMM YYYY")} -{" "}
                    {date.checkOut.format("DD MMM YYYY")}
                  </Typography>
                  <Typography
                    variant="p"
                    component="p"
                    sx={{ padding: "20px", textAlign: "right" }}
                  >
                    {nights} nights
                  </Typography>
                </Box>
                <Typography
                  variant="p"
                  component="p"
                  sx={{
                    textAlign: "left",
                    margin: "0px 20px",
                    padding: "10px 0px",
                    fontFamily: "sans-serif",
                    borderBottom: "1px solid #c6ceda",
                  }}
                >
                  {selectedRooms.length}{" "}
                  {selectedRooms.length > 1 ? "rooms" : "room"} selected
                </Typography>

                {selectedRooms &&
                  selectedRooms.map((room) => {
                    return (
                      <Box>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography
                            variant="p"
                            component="p"
                            sx={{
                              textAlign: "left",
                              fontWeight: "bold",
                              padding: "10px 20px",
                              color: "#333",
                              marginBottom: "20px",
                            }}
                          >
                            {room.name}
                            {" - Summer Special"}
                          </Typography>
                          <DeleteOutlineIcon
                            onClick={() => {
                              setSelectedRooms((prev) =>
                                prev.filter(
                                  (prevRoom) => prevRoom.id !== room.id
                                )
                              );
                            }}
                            sx={{ cursor: "pointer", padding: "10px 20px" }}
                          />
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            borderBottom: "1px solid #c6ceda",
                            margin: "0px 20px",
                          }}
                        >
                          <Typography
                            sx={{
                              textAlign: "left",
                              paddingLeft: "0px",
                              fontSize: "1em",
                              color: "#717171",
                            }}
                          >
                            {room.capacity} guests, {nights}{" "}
                            {nights > 1 ? "nights" : "night"}
                          </Typography>
                          <Typography
                            sx={{
                              padding: "0px 20px",
                            }}
                          >
                            EGY {room.pricepernight * nights}
                          </Typography>
                        </Box>
                      </Box>
                    );
                  })}
              </div>
            }
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                margin: "0px 20px",
              }}
            >
              <Typography
                variant="p"
                component="p"
                sx={{
                  textAlign: "left",
                  padding: "10px 0px",
                  color: "#333",
                  fontWeight: "bold",
                  fontSize: "1.3em",
                }}
              >
                Total
              </Typography>
              <Typography
                sx={{
                  padding: "10px 20px",
                  fontSize: "1.3em",
                  color: "#333",
                  fontWeight: "bold",
                  paddingLeft: "0px",
                }}
              >
                EGY {sum}
              </Typography>
            </Box>
            <Box>
              <Typography
                sx={{
                  textAlign: "left",
                  padding: "0px 20px",
                  color: "#717171",
                  marginBottom: "20px",
                  fontSize: "0.8em",
                }}
              >
                Included Taxes + Fees
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                padding: "20px",
              }}
            >
              <Button
                sx={{ cursor: "pointer" }}
                variant="contained"
                size="large"
                disabled={selectedRooms.length === 0}
              >
                Book
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};
export default RoomsAvailable;
