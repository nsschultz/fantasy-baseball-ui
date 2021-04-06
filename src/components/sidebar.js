import { Box, Divider, Drawer, Hidden, List } from '@material-ui/core';

import DashboardIcon from '@material-ui/icons/Dashboard';
import NavigationItem from './navigation-item';
import PeopleIcon from '@material-ui/icons/People';
import React from 'react';
import TransformIcon from '@material-ui/icons/Transform';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const items = [
  { href: '/app/home', icon: DashboardIcon, title: 'Home' },
  { href: '/app/players', icon: PeopleIcon, title: 'Players' },
  { href: '/app/import-export-data', icon: TransformIcon, title: 'Integrations' }
];

export default ({ onMobileClose, openMobile }) => {
  const content = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Divider/>
      <Box sx={{ p: 2 }}>
        <List>
          {items.map((item) => (<NavigationItem href={item.href} key={item.title} title={item.title} icon={item.icon}/> ))}
        </List>
      </Box>
    </Box>
  );
  const location = useLocation();

  useEffect(() => { if (openMobile && onMobileClose) onMobileClose(); }, [location.pathname, openMobile, onMobileClose]);

  return (
    <>
      <Hidden lgUp>
        <Drawer anchor="left" onClose={onMobileClose} open={openMobile} variant="temporary" PaperProps={{ sx: { width: 256 }}}>
          {content}
        </Drawer>
      </Hidden>
      <Hidden lgDown>
        <Drawer anchor="left" open variant="persistent" PaperProps={{ sx: { width: 256, top: 64, height: 'calc(100% - 64px)' }}}>
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};