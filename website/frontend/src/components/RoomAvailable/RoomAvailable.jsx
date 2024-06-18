import { Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { Box } from "@mui/material";
import "./styles.css";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import useLoadImages from "../../hooks/useLoadImages";

const RoomAvailable = ({
  selectedRooms,
  setSelectedRooms,
  key,
  roomType,
  roomImage,
}) => {
  const [wrap, setWrap] = useState(true);
  const [text, setText] = useState("Show more");
  const [imageClick, setImageClick] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const [roomImages, setRoomImages] = useState([
    {
      imageURL: {
        type: roomImage[0].type,
        blob: roomImage[0].imageURL,
      },
    },
  ]);
  useLoadImages(roomType.roomtypeId, setRoomImages, imageClick);

  const openModal = (index) => {
    setSelectedImageIndex(index);
  };

  const closeModal = () => {
    setImageClick(false);
    setSelectedImageIndex(0);
  };

  const prevImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : roomImages.length - 1
    );
  };

  const nextImage = () => {
    setSelectedImageIndex((prevIndex) =>
      prevIndex < roomImages.length - 1 ? prevIndex + 1 : 0
    );
  };

  function setRoom() {
    // want to change the count of the room
    const index = selectedRooms.findIndex(
      (selectedRoom) => selectedRoom.roomtypeId === roomType.roomtypeId
    );
    if (index !== -1) {
      const newSelectedRooms = [...selectedRooms];
      newSelectedRooms[index].count += 1;
      // change the price
      if (newSelectedRooms[index].hasOwnProperty("totalAfterDiscount"))
        newSelectedRooms[index].totalAfterDiscount *=
          newSelectedRooms[index].count;
      else {
        newSelectedRooms[index].total =
          newSelectedRooms[index].total * newSelectedRooms[index].count;
      }
      setSelectedRooms([...newSelectedRooms]);
    } else setSelectedRooms([...selectedRooms, { ...roomType, count: 1 }]);
  }

  const navigate = useNavigate();
  const handleNavigation = () => {
    const dynamicData = { id: roomType.roomtypeId }; // Data you want to fetch later
    const queryParams = new URLSearchParams(dynamicData).toString();
    navigate(`/room-details?${queryParams}`);
  };

  return (
    <>
      {imageClick && (
        <div className="image-gallery">
          {selectedImageIndex !== null && (
            <div className="modal">
              <div className="overlay" onClick={closeModal}></div>
              <Button>
                <ArrowBackIosIcon onClick={prevImage}></ArrowBackIosIcon>
              </Button>
              <img
                width={1000}
                src={`data:${roomImages[selectedImageIndex].imageURL.type};base64,${roomImages[selectedImageIndex].imageURL.blob}`}
                alt={`Image ${selectedImageIndex}`}
              />
              <Button>
                <ArrowForwardIosIcon onClick={nextImage}></ArrowForwardIosIcon>
              </Button>
            </div>
          )}
        </div>
      )}

      <div
        className="RoomAvailable"
        style={{ marginBottom: 20, border: "1px solid #c6ceda" }}
      >
        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "space-between",
            zIndex: 2,
          }}
        >
          <Grid
            item
            sm={5.5}
            xs={12}
            style={{ marginBottom: 40, cursor: "pointer" }}
          >
            <Box>
              <img
                onClick={() => setImageClick(true)}
                alt={`${roomType.roomtype}`}
                width="100%"
                src={
                  roomImage.length
                    ? `data:${roomImage[0].type};base64,${roomImage[0].imageURL}`
                    : ""
                }
                style={{ borderRadius: "5px 0px 0px 0px" }}
              ></img>
            </Box>
          </Grid>
          <Grid item sm={6.3} xs={12} sx={{ padding: "1px" }}>
            <p
              style={{
                textAlign: "left",
                fontWeight: "bold",
                fontSize: "20px",
                cursor: "pointer",
              }}
              onClick={handleNavigation}
            >
              {roomType.roomtype}
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <PersonIcon></PersonIcon>
              <Typography
                variant="p"
                component="p"
                sx={{ textAlign: "left", fontSize: "12px" }}
              >
                Sleeps {roomType.capacity}
              </Typography>
            </div>
            <div>
              <Typography
                variant="p"
                component="p"
                sx={{ textAlign: "left", color: "#56595e", fontSize: "12px" }}
              >
                {roomType.size}m²• {roomType.view}• Non-smoking• Wireless
                Internet• Toaster• Stove top• Mini Fridge• Television• Bath•
                Room Service• Hairdryer• Clock Radio• Daily Room Service• Air
                conditioned
              </Typography>
            </div>
            <div style={{ marginTop: "20px" }}>
              <Typography
                noWrap={wrap}
                variant="p"
                component="p"
                sx={{ textAlign: "left", color: "#56595e", fontSize: "12px" }}
              >
                {roomType.description}
              </Typography>
            </div>
            <div>
              <Typography
                variant="p"
                component="p"
                align="left"
                sx={{
                  fontSize: "10px",
                  color: "#143c5c",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
                onClick={() => {
                  setWrap(!wrap);
                  setText(wrap ? "Show less" : "Show more");
                }}
              >
                {text}
              </Typography>
            </div>
          </Grid>
        </Grid>

        <Box
          sx={{
            border: roomType.hasOwnProperty("totalAfterDiscount")
              ? "2px solid hsla(207.79999999999995, 59.3%, 22.2% )"
              : "1px solid hsla(207.79999999999995, 59.3%, 22.2% )",
            padding: "0px",
            borderRadius: "0px 0px 5px 5px",
          }}
        >
          <Box>
            {roomType.hasOwnProperty("totalAfterDiscount") && (
              <>
                <Typography
                  variant="p"
                  component="p"
                  sx={{
                    background: "hsla(207.79999999999995, 59.3%, 22.2% )",
                    textAlign: "left",
                    padding: 1,
                    width: "80px",
                    color: "white",
                    fontSize: "15px",
                    borderRadius: "0px 0px 5px",
                  }}
                >
                  save {roomType.saved} %
                </Typography>

                <Typography
                  variant="p"
                  component="p"
                  sx={{
                    textAlign: "left",
                    paddingLeft: 1,
                    marginBottom: "5px",
                    fontSize: "1em",
                    fontWeight: "bold",
                    lineHeight: "1.5",
                    color: "#383b3e",
                  }}
                >
                  {roomType.offerName} Offer
                </Typography>
              </>
            )}
            <Box sx={{ display: "flex", paddingLeft: 1 }}>
              <TaskAltIcon sx={{ color: "#0e7a06", width: "0.7em" }} />
              <Typography
                sx={{
                  textAlign: "left",
                  paddingLeft: 1,
                  margin: "0px",
                  fontSize: "1em",
                  color: "#0e7a06",
                }}
              >
                Free cancellation!
              </Typography>
            </Box>
            <Box sx={{ display: "flex", paddingLeft: 1 }}>
              <ErrorOutlineIcon sx={{ width: "0.7em" }} />
              <Typography
                variant="p"
                component="p"
                sx={{
                  textAlign: "left",
                  paddingLeft: 1,
                  margin: "0px",
                  fontSize: "1em",
                  color: "#383b3e",
                }}
              >
                Pay Today
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row-reverse" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row-reverse",
                margin: "5PX 20PX 20PX 0px",
              }}
            >
              <Button size="meduim" variant="contained" onClick={setRoom}>
                Select
              </Button>
            </Box>
            <Box sx={{ paddingTop: "7px" }}>
              <Typography
                variant="p"
                component="p"
                data-v-e7c45ce0
                sx={{
                  textAlign: "right",
                  paddingRight: "40px",
                  color: "#143c5c",
                  fontSize: "11px",
                }}
                className="cut-line"
              >
                {roomType.hasOwnProperty("totalAfterDiscount") && (
                  <del data-v-e7c45ce0="" aria-hidden="true">
                    EGY&nbsp;{roomType.total}
                  </del>
                )}
              </Typography>
              <Typography
                variant="h4"
                component="h4"
                sx={{
                  fontWeight: "bold",
                  fontSize: "1rem",
                  textAlign: "right",
                  paddingRight: "30px",
                  color: "#333",
                  margin: "0px",
                }}
              >
                EGY {roomType.totalAfterDiscount || roomType.total}
              </Typography>
            </Box>
          </Box>
        </Box>
      </div>
    </>
  );
};

export default RoomAvailable;
