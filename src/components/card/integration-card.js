import { Box, Divider, Grid, Typography } from '@material-ui/core';

import CustomCard from './custom-card';
import PropTypes from 'prop-types';
import React from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({ 
  box: { padding: theme.spacing(2) },
  gridContainer: { justifyContent: 'space-between' },
  gridItem: { alignItems: 'center', display: 'flex' } 
}));

const IntegrationCard = ({ description, integrationButton, title }) => {
  const classes = useStyles();
  const additionalContent = (
    <>
      <Divider/>
      <Box className={classes.box}>
        <Grid className={classes.gridContainer} container spacing={2}>
          <Grid className={classes.gridItem} item>
            {integrationButton}
          </Grid>
        </Grid>
      </Box>
    </>
  );
  const content = (<Typography align='center' color='textSecondary' variant='body1'>{description}</Typography>);

  return (<CustomCard additionalContent={additionalContent} content={content} title={title} />);
};

IntegrationCard.propTypes = {
  description: PropTypes.string.isRequired,
  integrationButton: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired
};

export default IntegrationCard;