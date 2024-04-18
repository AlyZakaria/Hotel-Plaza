import * as React from "react";
import Typography from "@mui/material/Typography";
import Layout from "./Layout";
import AppBar from "../AppBar/AppBar";
import Tooltip from "@mui/material/Tooltip";
const backgroundImage =
  "https://images.unsplash.com/photo-1534854638093-bada1813ca19?auto=format&fit=crop&w=1400";

export default function ProductHero() {
  return (
    <div>
      <AppBar></AppBar>
      <Layout
        sxBackground={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundColor: "#7fc7d9", // Average color of the background image.
          backgroundPosition: "center",
        }}
        className="img-container"
      >
        {/* Increase the network loading priority of the background image. */}

        <img
          style={{ display: "none" }}
          src={backgroundImage}
          alt="increase priority"
        />
        <Typography
          color="inherit"
          align="center"
          variant="h4"
          component="h4"
          marked="center"
        >
          BOOK YOUR ROOM NOW
        </Typography>
      </Layout>
    </div>
  );
}
