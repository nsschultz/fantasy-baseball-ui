import { AppBar, Box, IconButton, Toolbar } from "@mui/material";
import { Input, Menu } from "@mui/icons-material";

import Logo from "./logo";
import Notification from "../notification/notification";
import PropTypes from "prop-types";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

const buildButtons = () => (
  <>
    <Notification />
    <IconButton color="inherit" data-testid="titlebar-logout" sx={{ display: { xs: "none", lg: "inline-flex" }, padding: 1.5 }}>
      <Input />
    </IconButton>
  </>
);

/**
 * The bar that sits at the top of the screen. Displays different options depending on if the user is logged in or not.
 * @param {bool} isLoggedIn             Boolean that indicates if the user is logged in.
 * @param {func} onOpenMobileNavigation Function that is called on mobile devices to open the menu.
 * @returns A new instance of the Titlebar.
 */
const Titlebar = ({ isLoggedIn, onOpenMobileNavigation }) => (
  <AppBar color="primary" elevation={5}>
    <Toolbar>
      <RouterLink to="/">
        <Logo />
      </RouterLink>
      <Box sx={{ flexGrow: 1 }} />
      {isLoggedIn ? buildButtons() : null}
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
Titlebar.propTypes = { isLoggedIn: PropTypes.bool.isRequired, onOpenMobileNavigation: PropTypes.func.isRequired };
export default Titlebar;
