import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Grid from "@mui/material/Grid";

const RoomDetailsImageView = ({ images }) => {
  let image = images[0];
  console.log(image);
  return (
    <Grid container>
      <Carousel useKeyboardArrows={true}>
        {images.map((image, index) => (
          <div className="slide">
            <img
              alt="sample_file"
              src={`data:image${image.type};base64,${image.blob}`}
              key={index}
            />
          </div>
        ))}
      </Carousel>
      {/* <Grid
        item
        xs={12}
        sx={{ height: { xs: "350px", sm: "450px", md: "600px" } }}
      >
        <img
          src={`data:image${image.type};base64,${image.blob}`}
          alt="Room"
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </Grid> */}
    </Grid>
  );
};

export default RoomDetailsImageView;
