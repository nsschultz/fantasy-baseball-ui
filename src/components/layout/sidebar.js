import { Box, Drawer, Hidden, List } from '@material-ui/core';

import DashboardIcon from '@material-ui/icons/Dashboard';
import NavigationItem from './navigation-item';
import PeopleIcon from '@material-ui/icons/People';
import PropTypes from 'prop-types';
import React from 'react';
import TransformIcon from '@material-ui/icons/Transform';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const items = [
  { href: '/app/home', icon: DashboardIcon, title: 'Home' },
  { href: '/app/players', icon: PeopleIcon, title: 'Players' },
  { href: '/app/import-export-data', icon: TransformIcon, title: 'Integrations' }
];

const Sidebar = ({ onMobileClose, openMobile }) => {
  const location = useLocation();
  useEffect(() => { if (openMobile && onMobileClose) onMobileClose(); }, [location.pathname]);

  const content = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ p: 2 }}>
        <List>
          {items.map((item) => (<NavigationItem href={item.href} key={item.title} title={item.title} icon={item.icon}/> ))}
        </List>
      </Box>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer anchor='left' onClose={onMobileClose} open={openMobile} variant='temporary' PaperProps={{ sx: { width: 192 }}}>
          {content}
        </Drawer>
      </Hidden>
      <Hidden lgDown>
        <Drawer anchor='left' open variant='persistent' PaperProps={{ sx: { width: 192, top: 64, height: 'calc(100% - 64px)' }}}>
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