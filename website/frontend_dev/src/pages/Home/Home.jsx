import React from "react";
import ProductHero from "../../components/ProductHero/ProductHero.jsx";
import HotelServices from "../../components/HotelServices/HotelServices.jsx";
import Anchor from "../../components/Anchor/Anchor.jsx";
import RoomTypesCarousel from "../../components/RoomTypesCarousel/RoomTypesCarousel.jsx";
import ReceiveOffer from "../../components/ReceiveOffer/ReceiveOffer.jsx";

const Home = () => {
  return (
    <div>
      <ProductHero></ProductHero>
      <HotelServices></HotelServices>
      <RoomTypesCarousel></RoomTypesCarousel> <ReceiveOffer></ReceiveOffer>
      <Anchor></Anchor>
    </div>
  );
};

export default Home;
