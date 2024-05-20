import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";

export default function ReviewCard() {
  return (
    <Card
      sx={{
        maxWidth: 345,
        minHeight: 250,
        border: "1px solid #e6e6e6",
        marginLeft: 1,
        marginRight: 1,
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            C
          </Avatar>
        }
        title={
          <Typography sx={{ textAlign: "left", fontWeight: "bold" }}>
            Chehab Yakoot
          </Typography>
        }
        subheader={
          <Typography sx={{ textAlign: "left", fontSize: 14 }}>
            September 14, 2016
          </Typography>
        }
      />
      <CardContent>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: "left" }}
        >
          "This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like."
        </Typography>
      </CardContent>
    </Card>
  );
}
