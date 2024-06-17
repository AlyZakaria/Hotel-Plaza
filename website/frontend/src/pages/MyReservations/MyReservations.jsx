import ProductHero from "../../components/ProductHero/ProductHero.jsx";
import CheckAvailability from "../../components/CheckAvalibilty/CheckAvailability.jsx";
import MyReservationsComponent from "../../components/MyReservations/MyReservations.jsx";
import Footer from "../../components/Footer/Footer.jsx";
const MyReservations = () => {
  return (
    <div>
      <ProductHero></ProductHero>
      <CheckAvailability></CheckAvailability>
      <MyReservationsComponent></MyReservationsComponent>
      <Footer></Footer>
    </div>
  );
};

export default MyReservations;
