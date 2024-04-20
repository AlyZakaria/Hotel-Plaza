import * as React from "react";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { Divider, Grid } from "@mui/material";
import Button from "@mui/material/Button";
import NameForm from "./NameForm";
import Email from "./Email";
import PhoneForm from "./PhoneForm";
import Birthdate from "./Birthdate";
import Address from "./Address";
import CountrySelect from "./CountrySelect";
import ZipCode from "./ZipCode";
import { CustomerContext } from "../../contexts/Customer";
import useSavePersonalDetails from "../../hooks/useSavePersonalDetails";

const PeronDetails = () => {
  let { customer, setCustomer } = React.useContext(CustomerContext);

  let [clicked, setClicked] = React.useState(new Array(7).fill(false));
  let [edit, setEdit] = React.useState(false);

  let customerSession = sessionStorage.getItem("customer");
  const [tempCustomer, setTempCustomer] = React.useState(
    customerSession ? { ...JSON.parse(customerSession) } : { ...customer }
  );

  const [save, setSave] = React.useState(false);

  useSavePersonalDetails(save, setSave, tempCustomer, setCustomer);

  let details = [
    ["Name", "Let us know what to call you"],
    ["Email address", customer.email],
    ["Phone number", customer.phone],
    ["Date of birth", "Enter your date of birth"],
    ["Address", customer.address],
    ["Country", customer.country],
    ["Zip code", customer.zip],
  ];
  let components = [
    <NameForm customer={tempCustomer} setCustomer={setTempCustomer} />,
    <Email customer={tempCustomer} setCustomer={setTempCustomer} />,
    <PhoneForm customer={tempCustomer} setCustomer={setTempCustomer} />,
    <Birthdate customer={tempCustomer} setCustomer={setTempCustomer} />,
    <Address customer={tempCustomer} setCustomer={setTempCustomer} />,
    <CountrySelect customer={tempCustomer} setCustomer={setTempCustomer} />,
    <ZipCode customer={tempCustomer} setCustomer={setTempCustomer} />,
  ];
  const clicking = (index) => {
    console.log(clicked);
    setClicked([
      ...clicked.slice(0, index),
      !clicked[index],
      ...clicked.slice(index + 1),
    ]);
    setEdit(!edit);
  };

  const submit = (index) => {
    setSave(true);
    setClicked([
      ...clicked.slice(0, index),
      !clicked[index],
      ...clicked.slice(index + 1),
    ]);
    setEdit(!edit);
  };

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
          Personal Details
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
          Update your information and find out how it's used.
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
                {clicked[index] && components[index]}
                {!clicked[index] && (
                  <Typography
                    sx={{
                      textAlign: "left",
                      fontSize: "16px",
                      color: "#474747",
                    }}
                    variant="p"
                    component="p"
                  >
                    {item[1]}
                  </Typography>
                )}
              </Grid>

              <Grid item xs={12} sm={1}></Grid>
              <Grid item xs={12} sm={2}>
                {clicked[index] && (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: { sm: "column", xs: "row" },
                      alignItems: "space-between",
                      rowGap: "0px",
                      justifyContent: "right",
                    }}
                  >
                    <Button href="" size="small" onClick={() => submit(index)}>
                      Save
                    </Button>
                    <Button
                      href=""
                      size="small"
                      onClick={() => clicking(index)}
                    >
                      Cancel
                    </Button>
                  </Box>
                )}
                {!clicked[index] && (
                  <Box sx={{ display: "flex", justifyContent: "right" }}>
                    <Button
                      disabled={edit}
                      href=""
                      onClick={() => clicking(index)}
                    >
                      Edit
                    </Button>
                  </Box>
                )}
              </Grid>
            </Grid>
          </Box>
          <Divider />
        </>
      ))}

      <Divider />
    </Box>
  );
};

export default PeronDetails;
