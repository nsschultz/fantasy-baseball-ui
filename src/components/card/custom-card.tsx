import { Box, Card, CardContent, CardHeader, Divider } from "@mui/material";

import type { ReactNode } from "react";

interface CustomCardProps {
  readonly additionalContent?: ReactNode;
  readonly content: ReactNode;
  readonly title: string;
}

export default function CustomCard({ additionalContent, content, title }: Readonly<CustomCardProps>) {
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
