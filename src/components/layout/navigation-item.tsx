import { Button, ListItem } from "@mui/material";
import { NavLink as RouterLink, matchPath, useLocation } from "react-router-dom";

import React from "react";

interface NavigationItemProps {
  readonly href: string;
  readonly icon: React.ElementType;
  readonly title: string;
}

export default function NavigationItem({ href, icon: Icon, title }: Readonly<NavigationItemProps>) {
  const location = useLocation();
  const active = !!matchPath({ path: href, end: false }, location.pathname);
  const buttonStyle = {
    color: active ? "text.primary" : "text.secondary",
    fontWeight: "medium",
    justifyContent: "flex-start",
    letterSpacing: 0,
    paddingBottom: 1.25,
    paddingTop: 1.25,
    textTransform: "none",
    width: "100%",
    "& svg": { marginRight: 1 },
  } as const;

  return (
    <ListItem disableGutters sx={{ display: "flex", paddingBottom: 0, paddingTop: 0 }}>
      <Button component={RouterLink} sx={buttonStyle} to={href}>
        {Icon && <Icon size="20" />}
        <span>{title}</span>
      </Button>
    </ListItem>
  );
}
