import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Box from "@mui/material/Box";
import RoomTypeCard from "../RoomTypeCard/RoomTypeCard";
const RoomTypesCarousel = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <div>
      <Box margin="auto" width="70%">
        <Carousel
          draggable={false}
          responsive={responsive}
          itemClass="carousel-item-padding-40-px"
        >
          <RoomTypeCard></RoomTypeCard>
          <RoomTypeCard></RoomTypeCard>
          <RoomTypeCard></RoomTypeCard>
          <RoomTypeCard></RoomTypeCard>
          <RoomTypeCard></RoomTypeCard>
          <RoomTypeCard></RoomTypeCard>
          <RoomTypeCard></RoomTypeCard>
        </Carousel>
      </Box>
    </div>
  );
};

export default RoomTypesCarousel;
