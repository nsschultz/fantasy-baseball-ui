import { Box, Divider, Grid, Typography } from "@mui/material";

import CustomCard from "./custom-card";
import { IntegrationCardProps } from "../../types/component-types";

export default function IntegrationCard(props: Readonly<IntegrationCardProps>) {
  const { description, integrationButton, title } = props;
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
}
