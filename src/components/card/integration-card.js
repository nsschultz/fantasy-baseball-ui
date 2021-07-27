import { Box, Divider, Grid, Typography } from '@material-ui/core';

import CustomCard from './custom-card';
import PropTypes from 'prop-types';
import React from 'react';

const IntegrationCard = ({ title, description, integrationButton }) => {
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

  const content = (<Typography align='center' color='textSecondary' variant='body1'>{description}</Typography>);

  return (<CustomCard title={title} content={content} additionalContent={additionalContent}/>);
};

IntegrationCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  integrationButton: PropTypes.object.isRequired
};

export default IntegrationCard;