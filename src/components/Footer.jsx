import { Box, Container, Typography } from "@mui/material";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#FFFFFF",
        borderTop: "1px solid #EDEDED",
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Typography
          sx={{
            textAlign: "center",
            color: "#111215",
            fontWeight: 600,
            fontSize: "0.95rem",
          }}
        >
          © {new Date().getFullYear()} TechHive. All rights reserved.
        </Typography>

        <Typography
          sx={{
            textAlign: "center",
            color: "#6E727A",
            fontSize: "0.9rem",
            mt: 1,
          }}
        >
          Your Hub for Modern Technology
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;