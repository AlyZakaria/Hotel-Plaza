import ProductHero from "../../components/ProductHero/ProductHero.jsx";
import CheckAvailability from "../../components/CheckAvalibilty/CheckAvailability.jsx";
import Contact from "../../components/ContactUs/ContactUs.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import { Box } from "@mui/material";

const ContactUs = () => {
  return (
    <div>
      <ProductHero></ProductHero>
      <CheckAvailability></CheckAvailability>

      <Contact></Contact>
      <Footer></Footer>
    </div>
  );
};

export default ContactUs;
