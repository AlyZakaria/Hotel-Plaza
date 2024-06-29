import React from "react";
import ProductHero from "../../components/ProductHero/ProductHero.jsx";
import HotelServices from "../../components/HotelServices/HotelServices.jsx";
import Anchor from "../../components/Anchor/Anchor.jsx";
// import RoomTypesCarousel from "../../components/RoomTypesCarousel/RoomTypesCarousel.jsx";
import RoomTypesCarousel from "../../components/RoomTypesCarousel2/RoomTypesCarousel.jsx";

import ReceiveOffer from "../../components/ReceiveOffer/ReceiveOffer.jsx";
import CheckAvailability from "../../components/CheckAvalibilty/CheckAvailability.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import OffersList from "../../components/OfferList/OfferList.jsx";
const Home = () => {
  return (
    <div>
      <ProductHero></ProductHero>
      <CheckAvailability></CheckAvailability>

      <RoomTypesCarousel></RoomTypesCarousel>

      <OffersList />

      <HotelServices></HotelServices>
      <ReceiveOffer></ReceiveOffer>
      <Anchor></Anchor>
      <Footer></Footer>
    </div>
  );
};

export default Home;
