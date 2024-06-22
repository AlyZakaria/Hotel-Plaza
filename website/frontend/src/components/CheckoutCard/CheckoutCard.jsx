import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { DateContext } from "../../contexts/Date";
import { useState, useContext } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { selectedRoomsContext } from "../../contexts/selectedRooms";
const CheckoutCard = ({ room }) => {
  let { date, setDate } = useContext(DateContext);
  let { selectedRooms, setSelectedRooms } = useContext(selectedRoomsContext);
  console.log(room);

  const deleteRoom = () => {
    let newRooms = selectedRooms.filter(
      (r) => r.roomtypeId !== room.roomtypeId
    );
    setSelectedRooms(newRooms);
  };

  return (
    <Box
      sx={{
        paddingBottom: "10px",
      }}
    >
      <Grid
        container
        sx={{
          height: { xs: "200px", sm: "200px", md: "200px" },
          border: "1px solid #D3D3D3",
          borderRadius: "6px",
        }}
      >
        <Grid
          item
          md={3}
          sx={{
            backgroundImage: `url(data:${room.images2[0].type};base64,${room.images2[0].imageURL})`,
            backgroundSize: "cover",
            borderRadius: "5px 0 0 5px",
            display: { xs: "none", sm: "none", md: "block" },
          }}
        ></Grid>
        <Grid xs={0} sm={0} md={0.01} sx={{ bgcolor: "#D3D3D3" }}></Grid>
        <Grid xs={12} sm={12} md={8.48}>
          <Box sx={{ height: "20%", textAlign: "left" }}>
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", paddingLeft: "2%" }}
            >
              {room.roomtype}
            </Typography>
          </Box>
          <Box
            sx={{
              height: "39%",
              textAlign: "left",
              display: { xs: "none", sm: "none", md: "flex" },
            }}
          >
            <Typography
              sx={{
                paddingLeft: "2%",
                paddingRight: "2%",
                overflow: "hidden",
                whiteSpace: "wrap",
                textOverflow: "ellipsis",
              }}
            >
              {room.description}
            </Typography>
          </Box>
          <Box
            sx={{
              height: "1px",
              bgcolor: "#D3D3D3",
              display: { xs: "none", sm: "none", md: "flex" },
            }}
          ></Box>

          <Grid
            container
            sx={{
              height: { xs: "80%", sm: "80%", md: "40%" },
              alignContent: "center",
              textAlign: "left",
              paddingLeft: "10px",
            }}
          >
            <Grid item xs={12} sm={12} md={6}>
              <Grid container sx={{ justifyContent: "space-around" }}>
                <Grid item md={6}>
                  <Typography sx={{ fontWeight: "bold" }}>
                    Check-in Date:
                  </Typography>
                  <Typography sx={{ fontWeight: "bold" }}>
                    Check-out Date:
                  </Typography>
                </Grid>
                <Grid item md={6}>
                  <Typography>{date.checkIn.format("DD MMM YYYY")}</Typography>
                  <Typography>{date.checkOut.format("DD MMM YYYY")}</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Grid container sx={{ justifyContent: "space-around" }}>
                <Grid item md={6}>
                  <Typography sx={{ fontWeight: "bold" }}>
                    Price Per Night:
                  </Typography>
                  <Typography sx={{ fontWeight: "bold", color: "#CC0000" }}>
                    Total Price:
                  </Typography>
                </Grid>
                <Grid item md={6}>
                  <Typography>
                    <strong>
                      {room.price} {""}
                    </strong>
                    EGP
                  </Typography>
                  <Typography>
                    <strong>{room.sum} </strong>
                    {""}
                    EGP
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          md={0.01}
          sx={{ bgcolor: "#D3D3D3", height: { xs: "0px", md: "100%" } }}
        ></Grid>

        <Grid item xs={12} sm={12} md={0.5}>
          <Box
            sx={{
              height: { xs: "100%", sm: "100%", md: "100%" },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center ",
            }}
          >
            <Button
              sx={{
                "&:hover": {
                  backgroundColor: "#FFF",
                },
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: 0,
                padding: 0,
                minWidth: 0,
              }}
              startIcon={<DeleteIcon />}
              onClick={deleteRoom}
            ></Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CheckoutCard;
