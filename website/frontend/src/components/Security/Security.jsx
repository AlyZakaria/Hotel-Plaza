import * as React from "react";
import { Box } from "@mui/material";
import { Divider, Grid } from "@mui/material";
import { Typography } from "@mui/material";
import { CustomerContext } from "../../contexts/Customer";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import useForgetPassword from "../../hooks/useForgetPassword";

const Security = () => {
  let { customer, setCustomer } = React.useContext(CustomerContext);
  const [sendEmail, setSendEmail] = React.useState(false);
  let [clicked, setClicked] = React.useState(new Array(7).fill(false));
  let [edit, setEdit] = React.useState(false);

  let customerSession = sessionStorage.getItem("customer");
  const [tempCustomer, setTempCustomer] = React.useState(
    customerSession ? { ...JSON.parse(customerSession) } : { ...customer }
  );

  const [save, setSave] = React.useState(false);
  const clicking = (index) => {
    console.log(clicked);
    setClicked([
      ...clicked.slice(0, index),
      !clicked[index],
      ...clicked.slice(index + 1),
    ]);
    setEdit(!edit);
  };

  useForgetPassword(customer, sendEmail, setSendEmail);
  const submit = (index) => {
    setSave(true);
    setClicked([
      ...clicked.slice(0, index),
      !clicked[index],
      ...clicked.slice(index + 1),
    ]);
    setEdit(!edit);
  };

  let details = [
    ["Password", "Reset your password regularly to keep your account secure"],
    ["Two-factor authentication", "Two-factor authentication"],
    ["Delete account", "Delete your account"],
  ];
  let detailsAfterClick = [
    "To change your password, we need to send a reset link to your email address.",
    "Two-factor authentication is a security feature that helps protect your account. When two-factor authentication is on, you'll be required to enter a special login code or confirm your login attempt each time someone tries accessing Facebook from a computer or mobile device we don't recognize.",
    "If you delete your account, you won't be able to recover it. You can only delete your account if you're sure you want to permanently remove it.",
  ];
  let btns = ["Reset", "set up", "Delete account"];

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
          Security
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
          Change your security settings, set up secure authentication or delete
          your account.
        </Typography>
      </Box>
      <Divider />
      {details.map((item, index) => (
        <>
          <Box sx={{ padding: "20px" }}>
            <Grid container>
              <Grid item xs={12} sm={3}>
                <Typography
                  sx={{ textAlign: "left", fontSize: "18px" }}
                  variant="p"
                  component="p"
                >
                  {item[0]}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                {
                  <Typography
                    sx={{
                      textAlign: "left",
                      fontSize: "16px",
                      color: "#474747",
                    }}
                    variant="p"
                    component="p"
                  >
                    {!clicked[index] && item[1]}
                    {clicked[index] && detailsAfterClick[index]}
                  </Typography>
                }
              </Grid>

              <Grid item xs={12} sm={1}></Grid>
              <Grid item xs={12} sm={2}>
                {clicked[index] && (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: { sm: "column", xs: "row" },
                      alignItems: "space-between",
                      rowGap: "10px",
                      justifyContent: "right",
                      marginTop: "10px",
                    }}
                  >
                    <Button
                      href=""
                      size="small"
                      onClick={() => clicking(index)}
                    >
                      Cancel
                    </Button>
                    {index === 0 ? (
                      <Button
                        size="small"
                        sx={{ width: "100px" }}
                        variant="contained"
                        endIcon={<SendIcon />}
                        onClick={() => setSendEmail(true)}
                      >
                        Send
                      </Button>
                    ) : (
                      <Button
                        href=""
                        size="small"
                        onClick={() => submit(index)}
                      >
                        Save
                      </Button>
                    )}
                  </Box>
                )}
                {!clicked[index] && (
                  <Box sx={{ display: "flex", justifyContent: "right" }}>
                    <Button
                      disabled={edit}
                      href=""
                      onClick={() => clicking(index)}
                      sx={{
                        fontSize: "14px",
                        textAlign: "right",
                        textTransform: "capitalize",
                      }}
                    >
                      {btns[index]}
                    </Button>
                  </Box>
                )}
              </Grid>
            </Grid>
          </Box>
          <Divider />
        </>
      ))}
    </Box>
  );
};

export default Security;
