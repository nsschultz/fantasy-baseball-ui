import { Box, Container, Typography } from '@material-ui/core';

import { Helmet } from 'react-helmet';
import React from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({ 
  box: { backgroundColor: 'background.default', display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center' }
});

export default () => {
  const classes = useStyles();

  return (
    <>
      <Helmet>
        <title>Not Found | Fantasy Baseball Analyzer</title>
      </Helmet>
      <Box className={classes.box}>
        <Container maxWidth='md'>
          <Typography align='center' color='textPrimary' variant='h1' >
            404: The page you are looking for is not here
          </Typography>
          <Typography align='center' color='textPrimary' variant='subtitle2'>
            Either the route is broken or never existed...
          </Typography>
        </Container>
      </Box>
    </>
  );
};