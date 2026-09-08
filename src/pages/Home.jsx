import {
  Box,
  Button,
  Container,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

function Home() {
  return (
    <Box>
      <Box
        sx={{
          minHeight: "520px",
          display: "flex",
          alignItems: "center",
          backgroundColor: "#F8F9FA",
          borderBottom: "1px solid #EDEDED",
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              maxWidth: "750px",
              py: { xs: 8, md: 12 },
            }}
          >
            <Typography
              sx={{
                color: "#C85A32",
                fontWeight: 700,
                fontSize: "0.85rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                mb: 2,
              }}
            >
              Technology for everyday life
            </Typography>

            <Typography
              component="h1"
              sx={{
                fontSize: {
                  xs: "2.8rem",
                  sm: "4rem",
                  md: "5.5rem",
                },
                fontWeight: 800,
                lineHeight: 0.95,
                letterSpacing: "-0.04em",
                color: "#111215",
                mb: 3,
              }}
            >
              Technology that moves with you.
            </Typography>

            <Typography
              sx={{
                fontSize: {
                  xs: "1rem",
                  md: "1.2rem",
                },
                lineHeight: 1.7,
                color: "#6E727A",
                maxWidth: "600px",
                mb: 4,
              }}
            >
              Discover carefully selected technology, from powerful
              laptops and smartphones to the accessories that keep
              your digital life moving.
            </Typography>

            <Button
              component={Link}
              to="/products"
              variant="contained"
              disableElevation
              sx={{
                backgroundColor: "#C85A32",
                color: "#FFFFFF",
                borderRadius: 0,
                px: 4,
                py: 1.5,
                fontWeight: 700,
                textTransform: "none",
                fontSize: "1rem",
                "&:hover": {
                  backgroundColor: "#A94725",
                },
              }}
            >
              Explore Products
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export default Home;