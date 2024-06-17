import * as React from "react";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { Divider, Grid } from "@mui/material";
import Button from "@mui/material/Button";
import NameForm from "./NameForm";
import PhoneForm from "./PhoneForm";
import Birthdate from "./Birthdate";
import Address from "./Address";
import CountrySelect from "./CountrySelect";
import { CustomerContext } from "../../contexts/Customer";
import useSavePersonalDetails from "../../hooks/useSavePersonalDetails";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";
import useSetprofile from "../../hooks/useSetProfile";
import Provenance from "./Provenance";
import moment from "moment";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const PeronDetails = () => {
  let { customer, setCustomer } = React.useContext(CustomerContext);
  const [profile, setProfile] = React.useState({});
  const [upload, setUpload] = React.useState(false);
  const [clicked, setClicked] = React.useState(new Array(7).fill(false));
  const [edit, setEdit] = React.useState(false);

  let customerSession = sessionStorage.getItem("customer");
  const [tempCustomer, setTempCustomer] = React.useState(
    customerSession ? { ...JSON.parse(customerSession) } : { ...customer }
  );

  const [save, setSave] = React.useState(false);

  useSavePersonalDetails(
    save,
    setSave,
    tempCustomer,
    setTempCustomer,
    customer,
    setCustomer
  );

  useSetprofile(upload, setUpload, customer, setCustomer, profile);

  let details = [
    ["Name", "Let us know what to call you"],

    ["Phone number", customer.phone],
    ["Date of birth", moment(customer.dob).format("YYYY-MM-DD")],
    ["Address", customer.address],
    ["Country", customer.country],
    ["Provenance", customer.provenance],
  ];
  let components = [
    <NameForm customer={tempCustomer} setCustomer={setTempCustomer} />,

    <PhoneForm customer={tempCustomer} setCustomer={setTempCustomer} />,
    <Birthdate customer={tempCustomer} setCustomer={setTempCustomer} />,
    <Address customer={tempCustomer} setCustomer={setTempCustomer} />,
    <CountrySelect customer={tempCustomer} setCustomer={setTempCustomer} />,
    <Provenance customer={tempCustomer} setCustomer={setTempCustomer} />,
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
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
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

          <Button component="label" role={undefined} variant="" tabIndex={-1}>
            <VisuallyHiddenInput
              id="profile"
              type="file"
              onChange={(e) => {
                const file = e.target.files[0];
                console.log(file);
                setProfile(file);
                console.log(profile);
                setUpload(true);
              }}
            />
            <Avatar
              alt={`${customer.fname}`}
              src={
                customer.image
                  ? `data:${customer.imageType};base64,${customer.image}`
                  : customer.fname
              }
              sx={{
                width: 56,
                height: 56,
                cursor: "pointer",
                border: "2px solid #ffb700",
              }}
            ></Avatar>
          </Button>
        </Box>

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
          <Box
            sx={{
              padding: "20px",
            }}
          >
            <Grid container sx={{}}>
              <Grid item xs={12} sm={3} sx={{}}>
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
                      sx={{
                        fontSize: "14px",
                        textAlign: "right",
                        textTransform: "capitalize",
                      }}
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
