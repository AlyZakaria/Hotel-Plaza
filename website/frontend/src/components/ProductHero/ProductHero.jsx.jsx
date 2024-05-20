import * as React from "react";
import Typography from "@mui/material/Typography";
import Layout from "./Layout";
import AppBar from "../AppBar/AppBar";
import Box from "@mui/material/Box";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

import "./style.css";
const backgroundImage =
  "https://www.cvent.com/sites/default/files/image/2021-01/iStock-537361842-2.jpg";

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
              <Typography
                color="inherit"
                variant="h3"
                component="h3"
                marked="center"
                sx={{
                  animationDelay: "1000ms",
                }}
              >
                Welcome to Plaza Hotel
              </Typography>
              <ArrowDownwardIcon></ArrowDownwardIcon>
            </Box>
          </Box>
        </Box>
      </Layout>
    </div>
  );
}
