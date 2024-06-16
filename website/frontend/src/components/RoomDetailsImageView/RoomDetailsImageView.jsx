import React from "react";
import Grid from "@mui/material/Grid";

const RoomDetailsImageView = (details) => {
  return (
    <Grid container>
      <Grid
        item
        xs={12}
        sx={{ height: { xs: "350px", sm: "450px", md: "600px" } }}
      >
        <img
          src="https://www.gentinghotel.co.uk/_next/image?url=https%3A%2F%2Fs3.eu-west-2.amazonaws.com%2Fstaticgh.gentinghotel.co.uk%2Fuploads%2Fcarousel%2FGenting-Hotel-42.jpg&w=3840&q=75"
          alt="Room"
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </Grid>
    </Grid>
  );
};

export default RoomDetailsImageView;
