import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ReviewCard from "../ReviewCard/ReviewCard";
import Box from "@mui/material/Box";
import Footer from "../../components/Footer/Footer";

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

function ReviewsCarousel({ reviews }) {
  console.log(reviews);
  return (
    <div style={{ margin: "100px 0px" }}>
      <Box
        margin="auto"
        sx={{
          width: { sm: "90%", md: "70%" },
        }}
      >
        <Carousel
          draggable={false}
          responsive={responsive}
          itemClass="carousel-item-padding-40-px"
        >
          {reviews.map((review) => (
            <ReviewCard review={review}></ReviewCard>
          ))}
        </Carousel>
      </Box>
      <Footer></Footer>
    </div>
  );
}
export default ReviewsCarousel;
