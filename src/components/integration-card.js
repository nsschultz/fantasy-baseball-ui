import { Box, Card, CardContent, Divider, Grid, Typography } from '@material-ui/core';

import React from 'react';

export default ({ integration, integrationButton }) => (
  <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
    <CardContent>
      <Typography align="center" color="textPrimary" gutterBottom variant="h4">{integration.title}</Typography>
      <Typography align="center" color="textSecondary" variant="body1">{integration.description}</Typography>
    </CardContent>
    <Box sx={{ flexGrow: 1 }} />
    <Divider />
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2} sx={{ justifyContent: 'space-between' }}>
        <Grid item sx={{ alignItems: 'center', display: 'flex' }}>
          {integrationButton}
        </Grid>
      </Grid>
    </Box>
  </Card>
);