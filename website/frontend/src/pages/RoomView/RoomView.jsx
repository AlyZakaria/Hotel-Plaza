import React from "react";
import AppBar from "../../components/AppBar/AppBar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import RoomDetailsImageView from "../../components/RoomDetailsImageView/RoomDetailsImageView";
import RoomDetailsDetailsBox from "../../components/RoomDetailsDetailsBox/RoomDetailsDetailsBox";
import RoomDetailsDesc from "../../components/RoomDetailsDesc/RoomDetailsDesc";
import ReviewsCarousel from "../../components/ReviewsCarousel/ReviewsCarousel";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useRoomDetails from "../../hooks/useRoomDetails.js";

const RoomView = () => {
  const [roomDetails, setRoomDetails] = React.useState({});
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  useRoomDetails(setRoomDetails, id);

  return (
    <div>
      <AppBar></AppBar>
      <Box height="100vh" width="100%">
        <Box
          display="flex"
          justifyContent={"center"}
          alignContent={"center"}
          paddingTop="5%"
          paddingBottom="5%"
        >
          <Grid
            container
            sx={{ width: { sm: "90%", md: "70%" } }}
            height="100%"
            margin="auto"
          >
            <Grid item xs={12} md={8.5}>
              <RoomDetailsImageView></RoomDetailsImageView>
            </Grid>
            <Grid item xs={12} md={0.5}></Grid>
            <Grid
              item
              xs={12}
              md={3}
              sx={{ paddingTop: { xs: "5%", sm: "5%", md: "0%" } }}
            >
              <RoomDetailsDetailsBox></RoomDetailsDetailsBox>
            </Grid>
          </Grid>
        </Box>
        <Box display="flex" justifyContent={"center"} alignContent={"center"}>
          <RoomDetailsDesc></RoomDetailsDesc>
        </Box>
        <ReviewsCarousel></ReviewsCarousel>
      </Box>
    </div>
  );
};

export default RoomView;
