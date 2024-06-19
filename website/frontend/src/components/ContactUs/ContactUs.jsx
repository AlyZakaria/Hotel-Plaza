import {
  Container,
  Grid,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  IconButton,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import GoogleIcon from "@mui/icons-material/Google";
import PinterestIcon from "@mui/icons-material/Pinterest";
import InstagramIcon from "@mui/icons-material/Instagram";

const ContactUs = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, marginBottom: 5 }}>
      <Typography
        variant="h3"
        sx={{
          fontFamily: "Dancing script",
          fontWeight: "bold",
          paddingBottom: "2%",
        }}
      >
        Welcome to Plaza Hotel
      </Typography>
      <Box
        sx={{
          textAlign: "justify",
          paddingBottom: "5%",
          textIndent: "40px",
          fontSize: { sm: "12px", md: "15px", lg: "17px" },
        }}
      >
        We are delighted to welcome you to Plaza Hotel, where luxury meets
        comfort and exceptional service. Nestled in the heart of [City Name],
        Plaza Hotel is your perfect retreat, whether you are here for business,
        leisure, or a special occasion. Our commitment to excellence ensures
        that every moment of your stay is memorable. From our elegantly
        appointed rooms to our world-class amenities, we strive to create an
        unforgettable experience tailored just for you. Explore the best that
        [City Name] has to offer while enjoying the tranquility and elegance of
        Plaza Hotel. We look forward to making your stay with us extraordinary.
        Welcome to your home away from home.
      </Box>

      <Box sx={{ mb: 4 }}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.9982345898546!2d-73.97534362319286!3d40.757743478172936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c258f9c295a239%3A0xfacbafc166e14e9a!2sThe%20Atrium!5e0!3m2!1sen!2sus!4v1659887620002!5m2!1sen!2sus"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Maps Location"
        ></iframe>
      </Box>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Contact Info
            </Typography>
            <Typography variant="body1">📞 0123456789</Typography>
            <Typography variant="body1">✉️ Plaza@example.com</Typography>
            <Typography variant="body1">📍 Your address goes here</Typography>
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" sx={{ color: "black" }} gutterBottom>
                Social Media
              </Typography>
              <Box>
                <IconButton color="primary" href="#">
                  <FacebookIcon />
                </IconButton>
                <IconButton color="primary" href="#">
                  <RssFeedIcon />
                </IconButton>
                <IconButton color="primary" href="#">
                  <GoogleIcon />
                </IconButton>
                <IconButton color="primary" href="#">
                  <PinterestIcon />
                </IconButton>
                <IconButton color="primary" href="#">
                  <InstagramIcon />
                </IconButton>
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Send Your Message
            </Typography>
            <form noValidate autoComplete="off">
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth label="Enter Name" variant="outlined" />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth label="Enter Email" variant="outlined" />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Message here"
                    multiline
                    rows={4}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" color="primary" type="submit">
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};
export default ContactUs;
