import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/Twitter"; // Adjust this import if needed
import { ThemeProvider } from "@mui/material/styles";
import FooterTheme from "../../themes/FooterTheme"; // Adjust the import based on your file structure

function Copyright() {
  return (
    <React.Fragment>
      {"© "}
      <Link color="inherit" href="https://mui.com/">
        Plaza Hotel
      </Link>{" "}
      {new Date().getFullYear()}
    </React.Fragment>
  );
}

const iconStyle = {
  width: 48,
  height: 48,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#143c5c",
  mr: 1,
  "&:hover": {
    bgcolor: "warning.dark",
  },
};

const LANGUAGES = [
  {
    code: "en-US",
    name: "English",
  },
  {
    code: "fr-FR",
    name: "Français",
  },
  {
    code: "ar-AR",
    name: "Arabic",
  },
];

export default function Footer() {
  return (
    <ThemeProvider theme={FooterTheme}>
      <Box component="footer" sx={{ bgcolor: "#143c5c", py: 4, mt: "auto" }}>
        <Container>
          <Grid container spacing={5}>
            <Grid item xs={6} sm={4} md={3}>
              <Grid
                container
                direction="column"
                justifyContent="flex-end"
                spacing={2}
                sx={{ height: 120 }}
              >
                <Grid item sx={{ display: "flex" }}>
                  <Box component="a" href="https://facebook.com" sx={iconStyle}>
                    <FacebookIcon sx={{ color: "white" }}></FacebookIcon>
                  </Box>
                  <Box
                    component="a"
                    href="https://instagram.com"
                    sx={iconStyle}
                  >
                    <InstagramIcon sx={{ color: "white" }}></InstagramIcon>
                  </Box>
                  <Box component="a" href="https://x.com" sx={iconStyle}>
                    <XIcon sx={{ color: "white" }}></XIcon>
                  </Box>
                </Grid>
                <Grid item sx={{ textAlign: "left", color: "#ff5722" }}>
                  <Copyright />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6} sm={4} md={2}>
              <Typography variant="h6" marked="left" gutterBottom>
                Legal
              </Typography>
              <Box component="ul" sx={{ m: 0, listStyle: "none", p: 0 }}>
                <Box component="li" sx={{ py: 0.5 }}>
                  <Link href="/about">About</Link>
                </Box>
                <Box component="li" sx={{ py: 0.5 }}>
                  <Link href="/contact">Contact</Link>
                </Box>
                <Box component="li" sx={{ py: 0.5 }}>
                  <Link href="/policies">Policies</Link>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={6} sm={8} md={4}>
              <Typography variant="h6" marked="left" gutterBottom>
                Language
              </Typography>
              <TextField
                select
                size="medium"
                variant="standard"
                SelectProps={{
                  native: true,
                }}
                sx={{ mt: 1, width: 150 }}
              >
                {LANGUAGES.map((language) => (
                  <option value={language.code} key={language.code}>
                    {language.name}
                  </option>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
