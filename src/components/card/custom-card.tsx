import { Box, Card, CardContent, CardHeader, Divider } from "@mui/material";

import { CustomCardProps } from "../../types/component-types";

export default function CustomCard(props: Readonly<CustomCardProps>) {
  const { additionalContent, content, title } = props;

  return (
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
}
