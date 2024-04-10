import React from "react";
import AddRoom from "../../components/AddRoom/AddRoom";
import AddRoomType from "../../components/AddRoomType/AddRoomType";
import { Grid } from "@mui/material";

const Home = () => {
  return (
    <Grid container spacing={1}>
      <Grid item md={6} xs={12}>
        <AddRoom></AddRoom>
      </Grid>
      <Grid item md={6} xs={12}>
        <AddRoomType></AddRoomType>
      </Grid>
    </Grid>
  );
};

export default Home;
