import { Box, Drawer, Hidden, List } from "@mui/material";
import { HomeIcon, IntegrationIcon, PlayerIcon } from "./sidebar-icon";

import NavigationItem from "./navigation-item";
import PropTypes from "prop-types";
import React from "react";
import { makeStyles } from "@mui/styles";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const items = [
  { href: "/app/home", icon: HomeIcon, title: "Home" },
  { href: "/app/players", icon: PlayerIcon, title: "Players" },
  { href: "/app/import-export-data", icon: IntegrationIcon, title: "Integrations" },
];

const useStyles = makeStyles((theme) => ({
  boxInner: { padding: theme.spacing(2) },
  boxOuter: { display: "flex", flexDirection: "column", height: "100%" },
  drawerPaperLgDown: { width: 192 },
  drawerPaperLgUp: { height: "calc(100% - 64px)", top: 64, width: 192 },
}));

const Sidebar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();

  useEffect(() => {
    if (openMobile && onMobileClose) onMobileClose();
  }, [location.pathname]);

  const content = (
    <Box className={classes.boxOuter}>
      <Box className={classes.boxInner}>
        <List>
          {items.map((item) => (
            <NavigationItem href={item.href} icon={item.icon} key={item.title} title={item.title} />
          ))}
        </List>
      </Box>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer anchor="left" classes={{ paper: classes.drawerPaperLgDown }} onClose={onMobileClose} open={openMobile} variant="temporary">
          {content}
        </Drawer>
      </Hidden>
      <Hidden lgDown>
        <Drawer anchor="left" classes={{ paper: classes.drawerPaperLgUp }} open variant="persistent">
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

Sidebar.propTypes = {
  onMobileClose: PropTypes.func.isRequired,
  openMobile: PropTypes.bool.isRequired,
};

export default Sidebar;
