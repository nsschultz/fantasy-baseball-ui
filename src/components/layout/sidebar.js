import { Box, Drawer, List } from "@mui/material";
import { HomeIcon, IntegrationIcon, PlayerIcon } from "./sidebar-icon";

import NavigationItem from "./navigation-item";
import PropTypes from "prop-types";
import React from "react";

const items = [
  { href: "/app/home", icon: HomeIcon, title: "Home" },
  { href: "/app/players", icon: PlayerIcon, title: "Players" },
  { href: "/app/import-export-data", icon: IntegrationIcon, title: "Integrations" },
];
const content = (
  <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
    <Box sx={{ padding: 2 }}>
      <List>
        {items.map((item) => (
          <NavigationItem href={item.href} icon={item.icon} key={item.title} title={item.title} />
        ))}
      </List>
    </Box>
  </Box>
);

/**
 * The information that shows up on the side screen.
 * @param {func} onMobileClose The function that is called when on mobile and the sidebar is closed.
 * @param {bool} openMobile    Boolean that indicates if the sidebar should be open (only used on mobile).
 * @returns A new instance of the Sidebar.
 */
const Sidebar = ({ onMobileClose, openMobile }) => (
  <>
    <Drawer
      anchor="left"
      data-testid="sidebar-mobile-drawer"
      onClose={onMobileClose}
      open={openMobile}
      PaperProps={{ sx: { width: 192 } }}
      sx={{ display: { lg: "none", xs: "block" } }}
      variant="temporary"
    >
      {content}
    </Drawer>
    <Drawer
      anchor="left"
      data-testid="sidebar-desktop-drawer"
      open
      PaperProps={{ sx: { height: "calc(100% - 64px)", top: 64, width: 192 } }}
      sx={{ display: { lg: "block", xs: "none" } }}
      variant="persistent"
    >
      {content}
    </Drawer>
  </>
);
Sidebar.propTypes = { onMobileClose: PropTypes.func.isRequired, openMobile: PropTypes.bool.isRequired };
export default Sidebar;
