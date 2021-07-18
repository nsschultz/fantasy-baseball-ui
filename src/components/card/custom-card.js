import { Box, Card, CardContent, Typography } from '@material-ui/core';

import PropTypes from 'prop-types';
import React from 'react';

const CustomCard = ({ title, content, additionalContent }) => (
  <Box boxShadow={5}>
    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <CardContent>
        <Typography align="center" color="textPrimary" gutterBottom variant="h4">{title}</Typography>
        {content}
      </CardContent>
      {additionalContent}
    </Card>
  </Box>
);

CustomCard.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.object.isRequired,
  additionalContent: PropTypes.object
};

export default CustomCard;