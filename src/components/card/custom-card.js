import { Box, Card, CardContent, CardHeader, Divider } from "@mui/material";

import PropTypes from "prop-types";
import React from "react";

/**
 * Wrapper the creates a card with a header and content within a box.
 *
 * @param {object} content           (Required) The main content to display on the card.
 * @param {string} title             (Required) The title of the card.
 * @param {object} additionalContent (Optional) Any additional content to be displayed on the card.
 * @returns A new instance of the CustomCard.
 */
const CustomCard = ({ content, title, additionalContent }) => (
  <Box boxShadow={5}>
    <Card>
      <CardHeader title={title} titleTypographyProps={{ align: "center", color: "textPrimary", variant: "h4" }} />
      <Divider />
      <CardContent>{content}</CardContent>
      {additionalContent}
    </Card>
  </Box>
);

CustomCard.propTypes = {
  content: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  additionalContent: PropTypes.object,
};

export default CustomCard;
