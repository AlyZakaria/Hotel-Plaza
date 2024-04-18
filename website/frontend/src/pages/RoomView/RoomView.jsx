import React from "react";
import AppBar from "../../components/AppBar/AppBar";
import Box from "@mui/material/Box";

import Grid from "@mui/material/Grid";
import RoomDetailsImageView from "../../components/RoomDetailsImageView/RoomDetailsImageView";
import RoomDetailsDetailsBox from "../../components/RoomDetailsDetailsBox/RoomDetailsDetailsBox";
const RoomView = () => {
  return (
    <div>
      <AppBar></AppBar>
      <Box height="100vh" width="100%" bgcolor={"darkgrey"}>
        <Box
          bgcolor={"beige"}
          display="flex"
          justifyContent={"center"}
          alignContent={"center"}
          sx={{ height: { xs: "inherit", sm: "inherit", md: "fit-content" } }}
        >
          <Grid container sx={{ width: "90%" }} height="100%" margin="auto">
            <Grid item xs={12} md={8.5}>
              <RoomDetailsImageView></RoomDetailsImageView>
            </Grid>
            <Grid
              item
              xs={12}
              md={0.5}
              bgcolor={"cyan"}
              sx={{ display: { xs: "none", md: "flex" } }}
            ></Grid>
            <Grid item xs={12} md={3}>
              <RoomDetailsDetailsBox></RoomDetailsDetailsBox>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </div>
  );
};

export default RoomView;
