import React from "react";
import ProductHero from "../../components/ProductHero/ProductHero.jsx";
import HotelServices from "../../components/HotelServices/HotelServices.jsx";
import Anchor from "../../components/Anchor/Anchor.jsx";

const Home = () => {
  return (
    <div>
      <ProductHero></ProductHero>
      <HotelServices></HotelServices>
      <Anchor></Anchor>
    </div>
  );
};

export default Home;
