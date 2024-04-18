import { Button, Grid } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { Box } from "@mui/material";
import "./styles.css";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const RoomAvailable = ({
  selectedRooms,
  setSelectedRooms,
  key,
  roomType,
  roomPrice,
  roomImage,
}) => {
  const [wrap, setWrap] = useState(true);
  const [text, setText] = useState("Show more");

  console.log(roomType);
  return (
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
        <Grid item sm={5.5} xs={12} style={{ marginBottom: 40 }}>
          <div className="image-container">
            <img
              alt={`${roomType.name}`}
              src={`data:${roomImage.type};base64,${roomImage.blob}`}
            ></img>
          </div>
        </Grid>
        <Grid item sm={6.3} xs={12} sx={{ padding: "1px" }}>
          <h3 style={{ textAlign: "left" }}>{roomType.name} </h3>
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
              30m²• {roomType.view}• Non-smoking• Wireless Internet• Toaster•
              Stove top• Mini Fridge• Television• Bath• Room Service• Hairdryer•
              Clock Radio• Daily Room Service• Air conditioned
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
          border: "2px solid hsla(207.79999999999995, 59.3%, 22.2% )",
          padding: "0px",
          borderRadius: "0px 0px 5px 5px",
        }}
      >
        <Box>
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
            Save 50%
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
            Summer Special
          </Typography>
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
            <Button
              size="meduim"
              variant="contained"
              onClick={() => setSelectedRooms([...selectedRooms, roomType])}
            >
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
              <del data-v-e7c45ce0="" aria-hidden="true">
                EGY&nbsp;200
              </del>
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
              EGY 100
            </Typography>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default RoomAvailable;
