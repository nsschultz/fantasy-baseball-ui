import { Navigate, useRoutes } from 'react-router-dom';
import { StyledEngineProvider, ThemeProvider, createMuiTheme } from '@material-ui/core';

import GlobalStyles from './components/global-styles';
import Home from './pages/home';
import ImportExportData from './pages/import-export-data';
import Layout from './components/layout/layout';
import NotFound from './pages/not-found';
import Players from './pages/players';
import React from 'react';

const routes = [
  {
    path: 'app',
    element: <Layout isLoggedIn={true}/>,
    children: [
      { path: 'home', element: <Home/> },
      { path: 'import-export-data', element: <ImportExportData/> },
      { path: 'players', element: <Players/> },
      { path: '*', element: <Navigate to='/not-found'/> }
    ]
  },
  {
    path: '/',
    element: <Layout isLoggedIn={false}/>,
    children: [
      { path: 'not-found', element: <NotFound/> },
      { path: '/', element: <Navigate to='/app/home'/> },
      { path: '*', element: <Navigate to='/not-found'/> }
    ]
  }
];

const theme = createMuiTheme({
  palette: {
    action: { active: '#ffffff', disabled: '#4d4d4d', disabledBackground: '#1f1f1f', hover: '#141414', selected: '#292929' },
    background: { default: '#222222', paper: '#333333' },
    divider: '#444444',
    primary: { main: '#2c387e', secondary: '#1c54b2' },
    secondary: { main: '#C80000', secondary: '#b81c33' },
    text: { disabled: '#808080', primary: '#ffffff', secondary: '#b3b3b3'  }
  },
  shadows: [
    'none',
    '0 0 0 1px rgba(63,63,68,0.05), 0 1px 2px 0 rgba(63,63,68,0.15)',
    '0 0 1px 0 rgba(0,0,0,0.81), 0 2px 2px -2px rgba(0,0,0,0.75)',
    '0 0 1px 0 rgba(0,0,0,0.81), 0 3px 4px -2px rgba(0,0,0,0.75)',
    '0 0 1px 0 rgba(0,0,0,0.81), 0 3px 4px -2px rgba(0,0,0,0.75)',
    '0 0 1px 0 rgba(0,0,0,0.81), 0 4px 6px -2px rgba(0,0,0,0.75)',
    '0 0 1px 0 rgba(0,0,0,0.81), 0 4px 6px -2px rgba(0,0,0,0.75)',
    '0 0 1px 0 rgba(0,0,0,0.81), 0 4px 8px -2px rgba(0,0,0,0.75)',
    '0 0 1px 0 rgba(0,0,0,0.81), 0 5px 8px -2px rgba(0,0,0,0.75)',
    '0 0 1px 0 rgba(0,0,0,0.81), 0 6px 12px -4px rgba(0,0,0,0.75)',
    '0 0 1px 0 rgba(0,0,0,0.81), 0 7px 12px -4px rgba(0,0,0,0.75)',
    '0 0 1px 0 rgba(0,0,0,0.81), 0 6px 16px -4px rgba(0,0,0,0.75)',
    '0 0 1px 0 rgba(0,0,0,0.81), 0 7px 16px -4px rgba(0,0,0,0.75)',
    '0 0 1px 0 rgba(0,0,0,0.81), 0 8px 18px -8px rgba(0,0,0,0.75)',
    '0 0 1px 0 rgba(0,0,0,0.81), 0 9px 18px -8px rgba(0,0,0,0.75)',
    '0 0 1px 0 rgba(0,0,0,0.81), 0 10px 20px -8px rgba(0,0,0,0.75)',
    '0 0 1px 0 rgba(0,0,0,0.81), 0 11px 20px -8px rgba(0,0,0,0.75)',
    '0 0 1px 0 rgba(0,0,0,0.81), 0 12px 22px -8px rgba(0,0,0,0.75)',
    '0 0 1px 0 rgba(0,0,0,0.81), 0 13px 22px -8px rgba(0,0,0,0.75)',
    '0 0 1px 0 rgba(0,0,0,0.81), 0 14px 24px -8px rgba(0,0,0,0.75)',
    '0 0 1px 0 rgba(0,0,0,0.81), 0 16px 28px -8px rgba(0,0,0,0.75)',
    '0 0 1px 0 rgba(0,0,0,0.81), 0 18px 30px -8px rgba(0,0,0,0.75)',
    '0 0 1px 0 rgba(0,0,0,0.81), 0 20px 32px -8px rgba(0,0,0,0.75)',
    '0 0 1px 0 rgba(0,0,0,0.81), 0 22px 34px -8px rgba(0,0,0,0.75)',
    '0 0 1px 0 rgba(0,0,0,0.81), 0 24px 36px -8px rgba(0,0,0,0.75)'
  ],
  typography: {
    h1: { fontWeight: 500, fontSize: 35, letterSpacing: '-0.24px' },
    h2: { fontWeight: 500, fontSize: 29, letterSpacing: '-0.24px' },
    h3: { fontWeight: 500, fontSize: 24, letterSpacing: '-0.06px' },
    h4: { fontWeight: 500, fontSize: 20, letterSpacing: '-0.06px' },
    h5: { fontWeight: 500, fontSize: 16, letterSpacing: '-0.05px' },
    h6: { fontWeight: 500, fontSize: 14, letterSpacing: '-0.05px' },
    overline: { fontWeight: 500 }
  },
});

export default function App() {
  const routing = useRoutes(routes);
  
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <GlobalStyles/>
        {routing}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}