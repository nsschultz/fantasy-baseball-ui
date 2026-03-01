import React, { useState } from "react";

import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";
import Titlebar from "./titlebar";
import { styled } from "@mui/system";

const LayoutContainer = styled("div")({
  display: "flex",
  flex: "1 1 auto",
  overflow: "hidden",
});
const LayoutContent = styled("div")({
  flex: "1 1 auto",
  height: "100%",
  overflow: "auto",
});
const LayoutRoot = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  display: "flex",
  height: "100%",
  overflow: "hidden",
  width: "100%",
}));
const LayoutWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  overflow: "hidden",
  paddingTop: 64,
  [theme.breakpoints.up("lg")]: { paddingLeft: 192 },
}));

interface LayoutProps {
  isLoggedIn: boolean;
}

const Layout: React.FC<LayoutProps> = ({ isLoggedIn }) => {
  const [isMobileNavigationOpen, setMobileNavigationOpen] = useState(false);

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

export default Layout;
