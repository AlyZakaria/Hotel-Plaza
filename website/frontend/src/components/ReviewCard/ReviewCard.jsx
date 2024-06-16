import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";

export default function ReviewCard({ review }) {
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
            {review.customer.fname} {review.customer.lname}
          </Typography>
        }
        subheader={
          <Typography sx={{ textAlign: "left", fontSize: 14 }}>
            {review.updatedAt}
          </Typography>
        }
      />
      <CardContent>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: "left" }}
        >
          "{review.comment}"
        </Typography>
      </CardContent>
    </Card>
  );
}
