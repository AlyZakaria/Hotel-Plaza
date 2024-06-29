// src/components/OffersList.js

import React from "react";
import OfferCard from "../OfferCard/OfferCard";
import { Grid } from "@mui/material";
import EidImage from "../../assets/1038_HeroBannerImg.jpg";
import { Typography } from "@mui/material";
import useGetOffers from "../../hooks/useGetOffers";
import { useState } from "react";

// const offers = [
//   {
//     title: "Special Discount",
//     description: "Get 50% off on your first purchase!",
//     image:
//       "https://res.cloudinary.com/simplotel/image/upload/x_0,y_128,w_1457,h_654,r_0,c_crop,q_90,fl_progressive/w_1457,f_auto,c_fit/sarovar-hotels---indias-leading-hotel-chain/Sarovar_Summer-offer_May-2019_Website-banner_kkjpuu",
//     buttonText: "Get Offer",
//     startDate: "2024-06-01",
//     endDate: "2024-06-30",
//   },
//   {
//     title: "Free Shipping",
//     description: "Free shipping on orders over $50.",
//     image: EidImage,
//     buttonText: "Get Offer",
//     startDate: "2024-06-01",
//     endDate: "2024-06-30",
//   },

//   // Add more offers as needed
// ];

const OffersList = () => {
  const [offers, setOffers] = useState([]);
  useGetOffers(setOffers);

  return (
    <>
      {offers.length === 0 ? (
        <></>
      ) : (
        <>
          <Typography
            variant="h4"
            sx={{
              margin: "100px auto 20px auto",
              color: "#444",
              fontWeight: "700",
            }}
          >
            Special Offers
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            {offers.map((offer, index) => (
              <Grid item key={index}>
                <OfferCard offer={offer} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </>
  );
};

export default OffersList;
