import { CustomerContext } from "../../contexts/Customer";
import * as React from "react";
import { Box } from "@mui/material";
import { Divider, Grid } from "@mui/material";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";

const EmailNotify = () => {
  let { customer, setCustomer } = React.useContext(CustomerContext);

  return (
    <Box>
      <Box sx={{ paddingBottom: "10px" }}>
        <Typography
          sx={{
            fontWeight: "bold",
            textAlign: "left",
            fontSize: "30px",
          }}
          variant="h6"
        >
          Email notifications
        </Typography>
        <Typography
          sx={{
            textAlign: "left !important",
            fontSize: "16px",
            fontWeight: 400,
            color: "#474747",
          }}
          variant="p"
          component="p"
        >
          Decide what you want to be notified about, and unsubscribe from what
          you don't.
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ padding: "20px" }}>
        <Grid container>
          <Grid item xs={12} sm={3}>
            <Typography
              sx={{ textAlign: "left", fontSize: "18px" }}
              variant="p"
              component="p"
            >
              Email preferences
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography
              sx={{
                textAlign: "left",
                fontSize: "16px",
                color: "#474747",
                marginBottom: "10px",
              }}
              variant="p"
              component="p"
            >
              {customer.email}
            </Typography>
            <Typography textAlign="left" variant="p" component="p">
              This email address isn't verified yet, so you can't use all your
              account's features.
            </Typography>
            <Button
              variant="text"
              sx={{
                color: "#077ef5",
                fontSize: "14px",
                fontWeight: "100",
                textTransform: "none",
                textAlign: "left",
                padding: "0px",
                "&:hover": {
                  "text-decoration": "underline",
                },
              }}
            >
              Resend the verification email?
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default EmailNotify;
