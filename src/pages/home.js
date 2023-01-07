import { Box, Container, Typography } from "@mui/material";

import { Helmet } from "react-helmet";
import React from "react";

/**
 * Creates a new instance of the home page.
 * @returns A new instance of Home.
 */
const Home = () => (
  <>
    <Helmet>
      <title>Home | Fantasy Baseball Analyzer</title>
    </Helmet>
    <Box sx={{ backgroundColor: "background.default", minHeight: "100%", paddingBottom: 3, paddingTop: 3 }}>
      <Container maxWidth="md">
        <Typography align="center" color="textPrimary" variant="h2">
          Welcome to the Fantasy Baseball Analyzer
        </Typography>
      </Container>
    </Box>
  </>
);
export default Home;
