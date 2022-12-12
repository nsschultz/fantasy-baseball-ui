import { AppBar, Badge, Box, IconButton, Toolbar } from "@mui/material";
import { Input, Menu, Notifications } from "@mui/icons-material";

import Logo from "./logo";
import PropTypes from "prop-types";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { useState } from "react";

const useStyles = makeStyles({
  box: { flexGrow: 1 },
});

const Titlebar = ({ isLoggedIn, onOpenMobileNavigation }) => {
  const classes = useStyles();
  const [notifications] = useState([]);

  return (
    <AppBar color="primary" elevation={5}>
      <Toolbar>
        <RouterLink to="/">
          <Logo />
        </RouterLink>
        <Box className={classes.box} />
        {isLoggedIn ? (
          <>
            <IconButton color="inherit" data-testid="titlebar-notifcation" sx={{ display: { xs: "none", lg: "inline-flex" }, padding: 1.5 }}>
              <Badge badgeContent={notifications.length} color="secondary" variant="dot">
                <Notifications />
              </Badge>
            </IconButton>
            <IconButton color="inherit" data-testid="titlebar-logout" sx={{ display: { xs: "none", lg: "inline-flex" }, padding: 1.5 }}>
              <Input />
            </IconButton>
          </>
        ) : null}
        <IconButton
          color="inherit"
          data-testid="titlebar-mobile-menu"
          onClick={onOpenMobileNavigation}
          sx={{ display: { xs: "inline-flex", lg: "none" }, padding: 1.5 }}
        >
          <Menu />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

Titlebar.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  onOpenMobileNavigation: PropTypes.func.isRequired,
};

export default Titlebar;
