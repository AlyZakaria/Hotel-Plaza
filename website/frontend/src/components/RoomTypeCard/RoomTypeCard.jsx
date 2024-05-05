import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button, CardActionArea, CardActions } from "@mui/material";

export default function MultiActionAreaCard({ roomType }) {
  console.log(roomType);
  return (
    <Card sx={{ maxWidth: 345, padding: "0 0%", margin: "0 20px" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={
            roomType.imageUrl
              ? `data:${roomType.imageUrl.type};base64,${roomType.imageUrl.blob}`
              : ""
          }
          alt="ROOM IMAGE"
        />
        <CardContent>
          <Typography gutterBottom>{roomType.name}</Typography>
        </CardContent>
      </CardActionArea>

      <CardActions>
        <Box margin="auto">
          <Button
            size="small"
            color="primary"
            sx={{
              bgcolor: "transparent",
              color: "Black",
              padding: "5px 10px",
              border: "0.1px solid black ",
              borderRadius: "0px",
            }}
          >
            Book Now
          </Button>
        </Box>
      </CardActions>
    </Card>
  );
}
