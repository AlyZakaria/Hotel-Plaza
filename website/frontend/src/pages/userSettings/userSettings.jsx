import * as React from "react";
import AppBar from "../../components/AppBar/AppBar";
import Box from "@mui/material/Box";
import { Stack } from "@mui/joy";
import Typography from "@mui/material/Typography";
import { Container, Grid } from "@mui/material";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import SvgIcon from "@mui/material/SvgIcon";
import Security from "../../components/Security/Security";
import EmailNotify from "../../components/EmailNotify/EmailNotify";
import PersonalDetails from "../../components/PersonalDetails/PersonalDetails";
import { CustomerContext } from "../../contexts/Customer";
import { useNavigate } from "react-router-dom";

let sideBar = ["Personal details", "Security", "Email notifications"];
let component = [<PersonalDetails />, <Security />, <EmailNotify />];
let sideBarIcons = [
  <PersonOutlinedIcon />,
  <HttpsOutlinedIcon />,
  <NotificationsNoneOutlinedIcon />,
];

export default function UserSettings() {
  let { customer, setCustomer } = React.useContext(CustomerContext);
  const navigate = useNavigate();

  if (!sessionStorage.getItem("customer") || !customer) {
    console.log("No customer");
    navigate("/");
  }
  let [active, setActive] = React.useState(0);

  return (
    <div>
      <AppBar></AppBar>
      <Container>
        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "space-around",
            marginTop: "20px",
          }}
        >
          <Grid
            item
            xs={12}
            md={3}
            sx={{
              border: "0.2px solid #c6ceda",
              borderRadius: "10px",
              height: "fit-content",
            }}
          >
            <Box>
              {sideBar.map((item, index) => (
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={3}
                  key={index}
                  sx={{
                    padding: "10px",
                    cursor: "pointer",
                    "&:hover": {
                      bgcolor: "#f5f5f5",
                    },

                    borderBottom:
                      index === sideBar.length - 1
                        ? "0px"
                        : "0.2px solid #c6ceda",
                  }}
                  onClick={() => setActive(index)}
                >
                  <SvgIcon
                    sx={{
                      stroke: "white",
                      strokeWidth: 0.8,
                      color: active === index ? "#077ef5 !important" : "action",
                      borderRadius: "50%",
                      padding: "10px",
                      display: "flex",
                      justifyContent: "center",
                      bgcolor: "#f5f5f5",
                    }}
                    fontSize="small"
                  >
                    {sideBarIcons[index]}
                  </SvgIcon>
                  <Typography
                    sx={{
                      fontSize: "15px",
                      color: active === index ? "#077ef5 !important" : "action",
                      fontFamily: "'Roboto condensed', sans-serif",
                    }}
                    variant="h6"
                  >
                    {item}
                  </Typography>
                </Stack>
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            <Box sx={{ padding: "20px" }}>{component[active]}</Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
