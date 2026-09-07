import { Box, Container, Typography } from "@mui/material";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#1a1a1a",
        color: "white",
        py: 3,
        mt: "auto",
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body1" align="center">
          © {new Date().getFullYear()} TechHive. All rights reserved.
        </Typography>

        <Typography
          variant="body2"
          align="center"
          sx={{ mt: 1, color: "#bdbdbd" }}
        >
          Your Hub for Modern Technology
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;