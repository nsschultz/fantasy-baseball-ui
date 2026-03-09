import { AppBar, Box, IconButton, Toolbar } from "@mui/material";
import { Input, Menu } from "@mui/icons-material";

import Logo from "./logo";
import Notification from "../notification/notification";
import { Link as RouterLink } from "react-router-dom";
import { TitlebarProps } from "../../types/component-types";

const buildButtons = () => (
  <>
    <Notification />
    <IconButton color="inherit" data-testid="titlebar-logout" sx={{ display: { xs: "none", lg: "inline-flex" }, padding: 1.5 }}>
      <Input />
    </IconButton>
  </>
);

export default function Titlebar(props: Readonly<TitlebarProps>) {
  const { isLoggedIn, onOpenMobileNavigation } = props;

  return (
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
}
