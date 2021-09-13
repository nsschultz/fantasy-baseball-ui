import { Box, Card, CardContent, CardHeader, Divider } from '@material-ui/core';

import PropTypes from 'prop-types';
import React from 'react';

const CustomCard = ({ content, title, additionalContent }) => (
  <Box boxShadow={5}>
    <Card>
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
  content: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  additionalContent: PropTypes.object
};

export default CustomCard;