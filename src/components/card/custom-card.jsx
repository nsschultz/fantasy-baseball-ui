import { Box, Card, CardContent, CardHeader, Divider } from "@mui/material";

import PropTypes from "prop-types";
import React from "react";

/**
 * Wrapper the creates a card with a header and content within a box.
 * @param {*}      additionalContent Any additional content to be displayed on the card.
 * @param {*}      content           The main content to display on the card.
 * @param {string} title             The title of the card.
 * @returns A new instance of the CustomCard.
 */
const CustomCard = ({ additionalContent, content, title }) => (
  <Box boxShadow={5}>
    <Card sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <CardHeader
        sx={{ backgroundColor: "primary.main", color: "text.primary" }}
        title={title}
        titleTypographyProps={{ align: "center", color: "textPrimary", variant: "h4" }}
      />
      <Divider />
      <CardContent>{content}</CardContent>
      {additionalContent}
    </Card>
  </Box>
);
CustomCard.propTypes = { additionalContent: PropTypes.any, content: PropTypes.any.isRequired, title: PropTypes.string.isRequired };
export default CustomCard;
