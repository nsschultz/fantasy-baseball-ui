import { Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import Sidebar from './sidebar';
import Titlebar from './titlebar';
import { experimentalStyled } from '@material-ui/core';
import { useState } from 'react';

const LayoutContainer = experimentalStyled('div')({
  display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden'
});

const LayoutContent = experimentalStyled('div')({
  flex: '1 1 auto',
  height: '100%',
  overflow: 'auto'
});

const LayoutRoot = experimentalStyled('div')(
  ({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%'
  })
);

const LayoutWrapper = experimentalStyled('div')(
  ({ theme }) => ({
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 64,
    [theme.breakpoints.up('lg')]: { paddingLeft: 192 }
  })
);

const Layout = ({ isLoggedIn }) => {
  const [isMobileNavigationOpen, setMobileNavigationOpen] = useState(false);

  return (
    <LayoutRoot>
      <Titlebar isLoggedIn={isLoggedIn} onOpenMobileNavigation={() => setMobileNavigationOpen(true)}/>
      {isLoggedIn 
        ? <Sidebar openMobile={isMobileNavigationOpen} onMobileClose={() => setMobileNavigationOpen(false)}/>
        : null}
      <LayoutWrapper>
        <LayoutContainer>
          <LayoutContent>
            <Outlet/>
          </LayoutContent>
        </LayoutContainer>
      </LayoutWrapper>
    </LayoutRoot>
  );
};

Layout.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
};

export default Layout;