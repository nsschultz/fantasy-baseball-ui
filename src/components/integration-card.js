import { Box, Card, CardContent, Divider, Grid, Typography } from '@material-ui/core';

import PropTypes from 'prop-types';
import React from 'react';

const IntegrationCard = ({ integration, integrationButton }) => (
  <Box boxShadow={5}>
    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <CardContent>
        <Typography align="center" color="textPrimary" gutterBottom variant="h4">{integration.title}</Typography>
        <Typography align="center" color="textSecondary" variant="body1">{integration.description}</Typography>
      </CardContent>
      <Divider />
      <Box sx={{ p: 2 }}>
        <Grid container spacing={2} sx={{ justifyContent: 'space-between' }}>
          <Grid item sx={{ alignItems: 'center', display: 'flex' }}>
            {integrationButton}
          </Grid>
        </Grid>
      </Box>
    </Card>
  </Box>
);

IntegrationCard.propTypes = {
  integration: PropTypes.object.isRequired,
  integrationButton: PropTypes.object.isRequired
};

export default IntegrationCard;