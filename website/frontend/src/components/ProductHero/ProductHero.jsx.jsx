import * as React from "react";
import Typography from "@mui/material/Typography";
import Layout from "./Layout";
import AppBar from "../AppBar/AppBar";
import Box from "@mui/material/Box";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

import "./style.css";
const backgroundImage =
  "https://images.unsplash.com/photo-1534854638093-bada1813ca19?auto=format&fit=crop&w=1400";

export default function ProductHero() {
  return (
    <div>
      <AppBar></AppBar>
      <Layout
        sx={{}}
        sxBackground={{
          backgroundImage: `url(${backgroundImage})`,

          backgroundPosition: "center",
        }}
        className="wrapper"
      >
        {/* Increase the network loading priority of the background image. */}

        <Box>
          <Box className="image">
            <img
              style={{ display: "none" }}
              src={backgroundImage}
              alt="increase priority"
            />
            <Box className="content">
              {" "}
              <Typography
                color="inherit"
                variant="h4"
                component="h4"
                marked="center"
                sx={{
                  animationDelay: "1000ms",
                }}
              >
                Welcome to Hotel plaza
              </Typography>
              <ArrowDownwardIcon></ArrowDownwardIcon>
            </Box>
          </Box>
        </Box>
      </Layout>
    </div>
  );
}
