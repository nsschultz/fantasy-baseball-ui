import { Outlet } from 'react-router-dom';
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
    [theme.breakpoints.up('lg')]: { paddingLeft: 256 }
  })
);

export default ({ isLoggedIn }) => {
  const [isMobileNavigationOpen, setMobileNavigationOpen] = useState(false);

  return (
    <LayoutRoot>
      <Titlebar isLoggedIn={isLoggedIn} onOpenMobileNaviation={() => setMobileNavigationOpen(true)}/>
      {isLoggedIn 
        ? <Sidebar onMobileClose={() => setMobileNavigationOpen(false)} openMobile={isMobileNavigationOpen}/>
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