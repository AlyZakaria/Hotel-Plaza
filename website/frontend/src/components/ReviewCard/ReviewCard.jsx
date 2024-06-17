import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { format } from 'date-fns';


export default function ReviewCard({ review }) {
  console.log(review);
  return (
    <Card
      sx={{
        maxWidth: 345,
        minHeight: 250,
        border: "1px solid #e6e6e6",
        marginLeft: 1,
        marginRight: 1,
        marginBottom: 5,
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
            {review.customer.fname}
          </Typography>
        }
        subheader={
          <Typography sx={{ textAlign: "left", fontSize: 14 }}>
            {format(new Date(review.updatedAt), 'MMMM d, yyyy')}
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
