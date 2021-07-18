import { Box, Divider, Grid, Typography } from '@material-ui/core';

import CustomCard from './custom-card';
import PropTypes from 'prop-types';
import React from 'react';

const IntegrationCard = ({ integration, integrationButton }) => {
  const additionalContent = (
    <>
      <Divider/>
      <Box sx={{ p: 2 }}>
        <Grid container spacing={2} sx={{ justifyContent: 'space-between' }}>
          <Grid item sx={{ alignItems: 'center', display: 'flex' }}>
            {integrationButton}
          </Grid>
        </Grid>
      </Box>
    </>
  );

  const content = (<Typography align='center' color='textSecondary' variant='body1'>{integration.description}</Typography>);

  return (<CustomCard title={integration.title} content={content} additionalContent={additionalContent}/>);
};

IntegrationCard.propTypes = {
  integration: PropTypes.object.isRequired,
  integrationButton: PropTypes.object.isRequired
};

export default IntegrationCard;