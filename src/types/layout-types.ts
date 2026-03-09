export interface LayoutProps {
  readonly isLoggedIn: boolean;
}

export interface NavigationItemProps {
  readonly href: string;
  readonly icon: React.ElementType;
  readonly title: string;
}

export interface SidebarProps {
  readonly onMobileClose: () => void;
  readonly openMobile: boolean;
}

export interface TitlebarProps {
  readonly isLoggedIn: boolean;
  readonly onOpenMobileNavigation: () => void;
}
