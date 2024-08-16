"use client";

import getStripe from "@/utils/get-stripe";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Container } from "react-bootstrap";
import Head from "next/head";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  ThemeProvider,
  createTheme,
  CssBaseline,
  useMediaQuery,
  useTheme,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Brightness4, Brightness7 } from "@mui/icons-material";

// Dynamic theme for light and dark mode
const LightDarkTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: "#3f51b5",
      },
      secondary: {
        main: "#f50057",
      },
    },
    typography: {
      h2: {
        fontWeight: 700,
      },
      h5: {
        fontWeight: 500,
      },
    },
  });

export default function Home() {
  const router = useRouter();
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [darkMode, setDarkMode] = useState(prefersDarkMode);
  const [showToast, setShowToast] = useState(false);
  const theme = LightDarkTheme(darkMode ? "dark" : "light");

  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleLogin = () => {
    router.push("/sign-in");
  };

  const handleSignUp = () => {
    router.push("/sign-up");
  };

  const handleSubmit = async () => {
    setShowToast(true);
    const checkoutSession = await fetch("/api/checkout_sessions", {
      method: "POST",
      headers: { origin: "http://localhost:3000" },
    });
    const checkoutSessionJson = await checkoutSession.json();

    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    });

    if (error) {
      console.warn(error.message);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Head>
          <title>Lock-In</title>
          <meta
            name="description"
            content="Lock-In - The easiest way to create flashcards from your text."
          />
        </Head>

        {/* App Bar with Dark Mode Toggle */}
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Lock-In
            </Typography>
            <IconButton
              color="inherit"
              onClick={handleToggleDarkMode}
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
            <SignedOut>
              <Button color="inherit" onClick={handleLogin}>
                Log in
              </Button>
              <Button color="inherit" onClick={handleSignUp}>
                Sign up
              </Button>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </Toolbar>
        </AppBar>

        {/* Hero Section with Background Image */}
        <Box
          sx={{
            textAlign: "center",
            my: 4,
            backgroundImage:
              "url('https://images.unsplash.com/photo-1591088520983-5afbf1efdde2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            py: 6,
            borderRadius: 2,
            color: "white",
          }}
        >
          <Typography variant="h2" component="h1" gutterBottom>
            Lock-In
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            The easiest way to create flashcards from your text.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2, mr: 2 }}
            href="/generate"
          >
            Get Started
          </Button>
          <Button variant="outlined" color="primary" sx={{ mt: 2 }}>
            Learn More
          </Button>
        </Box>

        {/* Features Section with Hover Effects */}
        <Box sx={{ my: 6 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Features
          </Typography>
          <Grid container spacing={4}>
            {[
              "Automatic Text Parsing",
              "Multiple Flashcard Designs",
              "Export to PDF",
              "Collaborative Decks",
              "Advanced Study Modes",
            ].map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  sx={{
                    transition: "transform 0.3s",
                    "&:hover": { transform: "scale(1.05)" },
                  }}
                >
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {feature}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {`Description of the ${feature.toLowerCase()}.`}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Pricing Section with Enhanced Design */}
        <Box sx={{ my: 6, textAlign: "center" }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Pricing
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {[
              {
                name: "Basic",
                price: "$9/month",
                features: ["Feature A", "Feature B", "Feature C"],
              },
              {
                name: "Pro",
                price: "$19/month",
                features: ["Feature A", "Feature B", "Feature C", "Feature D"],
              },
              {
                name: "Enterprise",
                price: "Contact Us",
                features: [
                  "All Features",
                  "Priority Support",
                  "Custom Solutions",
                ],
              },
            ].map((plan, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  sx={{
                    transition: "transform 0.3s",
                    "&:hover": { transform: "scale(1.05)" },
                    border: plan.name === "Pro" ? "2px solid #3f51b5" : "none",
                  }}
                >
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {plan.name}
                    </Typography>
                    <Typography variant="h6" component="div">
                      {plan.price}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {plan.features.join(", ")}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSubmit}
                    >
                      Choose {plan.name}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>

      {/* Toast Notification for Successful Checkout */}
      <Snackbar
        open={showToast}
        autoHideDuration={3000}
        onClose={() => setShowToast(false)}
      >
        <Alert
          onClose={() => setShowToast(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Redirecting to Checkout...
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}
