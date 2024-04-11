import React from "react";
import ProductHero from "../../components/ProductHero/ProductHero.jsx";
import HotelServices from "../../components/HotelServices/HotelServices.jsx";
import Anchor from "../../components/Anchor/Anchor.jsx";
import RoomTypeCard from "../../components/RoomTypeCard/RoomTypeCard.jsx";

const Home = () => {
  return (
    <div>
      <ProductHero></ProductHero>
      <HotelServices></HotelServices>
      <Anchor></Anchor>
      <RoomTypeCard></RoomTypeCard>
    </div>
  );
};

export default Home;
