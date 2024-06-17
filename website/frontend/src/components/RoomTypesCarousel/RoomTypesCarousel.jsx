import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Box from "@mui/material/Box";
import RoomTypeCard from "../RoomTypeCard/RoomTypeCard";
import useGetRoomTypes from "../../hooks/useGetRoomTypes";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RoomTypesCarousel = () => {
  const [roomTypes, setRoomTypes] = useState([]);
  const navigate = useNavigate();

  useGetRoomTypes(setRoomTypes);
  const ToRoomDetails = (roomTypeId) => {
    navigate(`/room-details?id=${roomTypeId}`);
  };
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 3,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
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
    <div style={{ margin: "100px 0px" }}>
      <Box margin="auto" width="70%">
        <Carousel
          draggable={false}
          responsive={responsive}
          itemClass="carousel-item-padding-40-px"
        >
          {roomTypes.map((roomType) => (
            <RoomTypeCard
              roomType={roomType}
              OnClick={() => ToRoomDetails(roomType.id)}
            ></RoomTypeCard>
          ))}
        </Carousel>
      </Box>
    </div>
  );
};

export default RoomTypesCarousel;
