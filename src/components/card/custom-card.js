import { Box, Card, CardContent, CardHeader, Divider } from '@material-ui/core';

import PropTypes from 'prop-types';
import React from 'react';

const CustomCard = ({ title, content, additionalContent }) => (
  <Box boxShadow={5}>
    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <CardHeader title={title} titleTypographyProps={{ align: 'center', color: 'textPrimary', variant: 'h4' }}/>
      <Divider/>
      <CardContent>
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