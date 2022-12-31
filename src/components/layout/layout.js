import { Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import React from "react";
import Sidebar from "./sidebar";
import Titlebar from "./titlebar";
import { experimentalStyled } from "@mui/material";

const LayoutContainer = experimentalStyled("div")({
  display: "flex",
  flex: "1 1 auto",
  overflow: "hidden",
});
const LayoutContent = experimentalStyled("div")({
  flex: "1 1 auto",
  height: "100%",
  overflow: "auto",
});
const LayoutRoot = experimentalStyled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  display: "flex",
  height: "100%",
  overflow: "hidden",
  width: "100%",
}));
const LayoutWrapper = experimentalStyled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  overflow: "hidden",
  paddingTop: 64,
  [theme.breakpoints.up("lg")]: { paddingLeft: 192 },
}));

/**
 * The base layout for the website with a Titlebar and Sidebar. Changes based on whether the user is logged in or not.
 * @param {bool} isLoggedIn (Required) Boolean that indicates if the user is logged in or not.
 * @returns A new instance of the Layout.
 */
const Layout = ({ isLoggedIn }) => {
  const [isMobileNavigationOpen, setMobileNavigationOpen] = React.useState(false);

  const buildSidebar = () => (
    <div data-testid="layout-sidebar">
      <Sidebar openMobile={isMobileNavigationOpen} onMobileClose={() => setMobileNavigationOpen(false)} />
    </div>
  );

  return (
    <LayoutRoot>
      <div data-testid="layout-titlebar">
        <Titlebar isLoggedIn={isLoggedIn} onOpenMobileNavigation={() => setMobileNavigationOpen(true)} />
      </div>
      {isLoggedIn ? buildSidebar() : null}
      <LayoutWrapper>
        <LayoutContainer>
          <LayoutContent>
            <Outlet />
          </LayoutContent>
        </LayoutContainer>
      </LayoutWrapper>
    </LayoutRoot>
  );
};
Layout.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};
export default Layout;
