import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button, CardActionArea, CardActions } from "@mui/material";

export default function MultiActionAreaCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="https://static.wixstatic.com/media/b4110a_30b6ed0d033e4857bcd3306005921a8b~mv2.jpg/v1/fill/w_980,h_572,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/b4110a_30b6ed0d033e4857bcd3306005921a8b~mv2.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom>Deluxe Room</Typography>
        </CardContent>
      </CardActionArea>

      <CardActions>
        <Box margin="auto">
          <Button
            size="small"
            color="primary"
            sx={{ bgcolor: "#4681f4", color: "white", padding: "5px 10px" }}
          >
            Book Now
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
}
