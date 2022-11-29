import { Box, Container, Typography } from "@material-ui/core";

import { Helmet } from "react-helmet";
import React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  box: { backgroundColor: "background.default", minHeight: "100%", paddingBottom: theme.spacing(3), paddingTop: theme.spacing(3) },
}));

export default () => {
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
