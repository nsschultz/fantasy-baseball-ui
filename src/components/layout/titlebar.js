import { AppBar, Badge, Box, Hidden, IconButton, Toolbar } from "@mui/material";
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
        <Hidden lgDown>
          {isLoggedIn ? (
            <>
              <IconButton color="inherit">
                <Badge badgeContent={notifications.length} color="primary" variant="dot">
                  <Notifications />
                </Badge>
              </IconButton>
              <IconButton color="inherit">
                <Input />
              </IconButton>
            </>
          ) : null}
        </Hidden>
        <Hidden lgUp>
          <IconButton color="inherit" onClick={onOpenMobileNavigation}>
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

Titlebar.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  onOpenMobileNavigation: PropTypes.func.isRequired,
};

export default Titlebar;
