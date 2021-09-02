import { Box, Container, Typography } from '@material-ui/core';

import { Helmet } from 'react-helmet';
import React from 'react';

export default () => (
  <>
    <Helmet>
      <title>Home | Fantasy Baseball Analyzer</title>
    </Helmet>
    <Box sx={{ backgroundColor: 'background.default', minHeight: '100%', py: 3 }}>
      <Container maxWidth='md'>
        <Typography align='center' color='textPrimary' variant='h2'>Welcome to the Fantasy Baseball Analyzer</Typography>
      </Container>
    </Box>
  </>
);