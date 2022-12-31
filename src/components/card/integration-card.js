import { Box, Divider, Grid, Typography } from "@mui/material";

import CustomCard from "./custom-card";
import PropTypes from "prop-types";
import React from "react";

/**
 * A wrapper over the CustomCard that creates the content for integration purposes.
 * @param {object} description       (Required) The description of the integration.
 * @param {object} integrationButton (Required) The button that kicks off the integration.
 * @param {string} title             (Required) The title of the card.
 * @returns A new instance of the IntegrationCard.
 */
const IntegrationCard = ({ description, integrationButton, title }) => {
  const additionalContent = (
    <>
      <Divider />
      <Box sx={{ padding: 2 }}>
        <Grid container sx={{ justifyContent: "space-between", spacing: 2 }}>
          <Grid item sx={{ alignItems: "center", display: "flex" }}>
            {integrationButton}
          </Grid>
        </Grid>
      </Box>
    </>
  );
  const content = (
    <Typography align="center" color="textSecondary" variant="body1">
      {description}
    </Typography>
  );

  return <CustomCard additionalContent={additionalContent} content={content} title={title} />;
};
IntegrationCard.propTypes = {
  description: PropTypes.string.isRequired,
  integrationButton: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
};
export default IntegrationCard;
