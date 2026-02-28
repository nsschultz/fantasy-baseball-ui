import { Box, Container, Typography } from "@mui/material";

import { Helmet } from "react-helmet";
import React from "react";

/**
 * Creates a new instance of the not found page.
 * @returns A new instance of NotFound.
 */
const NotFound = () => (
  <>
    <Helmet>
      <title>Not Found | Fantasy Baseball Analyzer</title>
    </Helmet>
    <Box sx={{ backgroundColor: "background.default", display: "flex", flexDirection: "column", height: "100%", justifyContent: "center" }}>
      <Container maxWidth="md">
        <Typography align="center" color="textPrimary" variant="h1">
          404: The page you are looking for is not here
        </Typography>
        <Typography align="center" color="textPrimary" variant="subtitle2">
          Either the route is broken or never existed...
        </Typography>
      </Container>
    </Box>
  </>
);
export default NotFound;
