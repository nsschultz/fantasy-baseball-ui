import { Box, Drawer, List } from "@mui/material";
import { HomeIcon, IntegrationIcon, PlayerIcon } from "./sidebar-icon";

import NavigationItem from "./navigation-item";
import { SidebarProps } from "../../types/layout-types";

const items = [
  { href: "/app/home", icon: HomeIcon, title: "Home" },
  { href: "/app/players", icon: PlayerIcon, title: "Players" },
  { href: "/app/import-export-data", icon: IntegrationIcon, title: "Integrations" },
];
const content = (
  <Box sx={{ display: "flex", flexDirection: "column" }}>
    <Box sx={{ padding: 2 }}>
      <List>
        {items.map((item) => (
          <NavigationItem href={item.href} icon={item.icon} key={item.title} title={item.title} />
        ))}
      </List>
    </Box>
  </Box>
);

export default function Sidebar(props: Readonly<SidebarProps>) {
  const { onMobileClose, openMobile } = props;

  return (
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
        PaperProps={{ sx: { height: "calc(100% - 69px)", top: 69, width: 192 } }}
        sx={{ display: { lg: "block", xs: "none" } }}
        variant="persistent"
      >
        {content}
      </Drawer>
    </>
  );
}
