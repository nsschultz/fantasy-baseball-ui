import { Box, Container, Typography } from "@mui/material";

import { Helmet } from "react-helmet";
import React from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  box: { backgroundColor: "background.default", minHeight: "100%", paddingBottom: theme.spacing(3), paddingTop: theme.spacing(3) },
}));

const Home = () => {
  const classes = useStyles();

  return (
    <>
      <Helmet>
        <title>Home | Fantasy Baseball Analyzer</title>
      </Helmet>
      <Box className={classes.box}>
        <Container maxWidth="md">
          <Typography align="center" color="textPrimary" variant="h2">
            Welcome to the Fantasy Baseball Analyzer
          </Typography>
        </Container>
      </Box>
    </>
  );
};

export default Home;
