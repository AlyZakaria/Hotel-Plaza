import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const CheckoutCard = () => {
  return (
    <Box sx={{ paddingBottom: "10px" }}>
      <Grid
        container
        sx={{
          height: { xs: "200px", sm: "200px", md: "200px" },
          border: "1px solid grey",
          borderRadius: "6px",
        }}
      >
        <Grid
          item
          md={3}
          sx={{
            backgroundImage:
              "url(https://cdn.pixabay.com/photo/2017/01/14/12/48/hotel-1979406_640.jpg)",
            backgroundSize: "cover",
            borderRadius: "5px 0 0 5px",
            display: { xs: "none", sm: "none", md: "block" },
          }}
        ></Grid>
        <Grid xs={0} sm={0} md={0.01} sx={{ bgcolor: "grey" }}></Grid>
        <Grid xs={12} sm={12} md={8.48}>
          <Box sx={{ height: "20%", textAlign: "left" }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", paddingLeft: "2%" }}
            >
              Super Delux Room
            </Typography>
          </Box>
          <Box
            sx={{
              height: "39%",
              textAlign: "left",
              display: { xs: "none", sm: "none", md: "flex" },
            }}
          >
            <Typography
              sx={{
                paddingLeft: "2%",
                paddingRight: "2%",
                overflow: "hidden",
                whiteSpace: "wrap",
                textOverflow: "ellipsis",
              }}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut odio
              nihil quaerat reiciendis corporis placeat maiores voluptatibus
              deserunt assumenda laudantium officia nesciunt nemo asperiores,
              beatae at soluta molestiae distinctio! Pariatur.
            </Typography>
          </Box>
          <Box
            sx={{
              height: "1px",
              bgcolor: "grey",
              display: { xs: "none", sm: "none", md: "flex" },
            }}
          ></Box>

          <Grid
            container
            sx={{
              height: { xs: "80%", sm: "80%", md: "40%" },
              alignContent: "center",
              textAlign: "left",
              paddingLeft: "10px",
            }}
          >
            <Grid item xs={12} sm={12} md={6}>
              <Grid container sx={{ justifyContent: "space-around" }}>
                <Grid item md={6}>
                  <Typography sx={{ fontWeight: "bold" }}>
                    Check-in Date:
                  </Typography>
                  <Typography sx={{ fontWeight: "bold" }}>
                    Check-out Date:
                  </Typography>
                </Grid>
                <Grid item md={6}>
                  <Typography>24/10/2024</Typography>
                  <Typography>24/10/2024</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Grid container sx={{ justifyContent: "space-around" }}>
                <Grid item md={6}>
                  <Typography sx={{ fontWeight: "bold" }}>
                    Price Per Night:
                  </Typography>
                  <Typography sx={{ fontWeight: "bold", color: "#CC0000" }}>
                    Total Price:
                  </Typography>
                </Grid>
                <Grid item md={6}>
                  <Typography>EGP 2000</Typography>
                  <Typography>EGP 4000</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          md={0.01}
          sx={{ bgcolor: "grey", height: { xs: "0px", md: "100%" } }}
        ></Grid>

        <Grid item xs={12} sm={12} md={0.5}>
          <Box
            sx={{
              height: { xs: "100%", sm: "100%", md: "100%" },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center ",
            }}
          >
            <Button
              sx={{
                "&:hover": {
                  backgroundColor: "#FFF",
                },
                padding: 0,
                minWidth: 0,
              }}
            >
              <Typography
                sx={{
                  textDecoration: "underline",
                  textTransform: "capitalize",
                }}
              >
                edit
              </Typography>
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CheckoutCard;
