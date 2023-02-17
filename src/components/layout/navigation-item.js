import { Button, ListItem } from "@mui/material";
import { NavLink as RouterLink, matchPath, useLocation } from "react-router-dom";

import PropTypes from "prop-types";
import React from "react";

/**
 * Creates a new ListItem with a Button that contains an Icon and text value. Used for navigating around the site.
 * @param {string}      href  The URL that clicking the button routes you to.
 * @param {elementType} icon  The icon to displayed next to the button.
 * @param {string}      title The value to display on the button.
 * @returns A new instance of the NavigationItem.
 */
const NavigationItem = ({ href, icon: Icon, title }) => {
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
  };

  return (
    <ListItem disableGutters sx={{ display: "flex", paddingBottom: 0, paddingTop: 0 }}>
      <Button component={RouterLink} sx={buttonStyle} to={href}>
        {Icon && <Icon size="20" />}
        <span>{title}</span>
      </Button>
    </ListItem>
  );
};
NavigationItem.propTypes = { href: PropTypes.string.isRequired, icon: PropTypes.elementType.isRequired, title: PropTypes.string.isRequired };
export default NavigationItem;
