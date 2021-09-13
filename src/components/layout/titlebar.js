import { AppBar, Badge, Box, Hidden, IconButton, Toolbar } from '@material-ui/core';

import InputIcon from '@material-ui/icons/Input';
import Logo from './logo';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import PropTypes from 'prop-types';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import { useState } from 'react';

const useStyles = makeStyles({ 
  box: { flexGrow: 1 },
});

const Titlebar = ({ isLoggedIn, onOpenMobileNavigation }) => {
  const classes = useStyles();
  const [notifications] = useState([]);

  return (
    <AppBar color='primary' elevation={5}>
      <Toolbar>
        <RouterLink to='/'>
          <Logo/>
        </RouterLink>
        <Box className={classes.box}/>
        <Hidden lgDown>
          {isLoggedIn
            ?
              <>
                <IconButton color='inherit'>
                  <Badge badgeContent={notifications.length} color='primary' variant='dot'>
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
                <IconButton color='inherit'>
                  <InputIcon/>
                </IconButton>
              </>
            : null}
        </Hidden>
        <Hidden lgUp>
          <IconButton color='inherit' onClick={onOpenMobileNavigation}>
            <MenuIcon/>
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

Titlebar.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  onOpenMobileNavigation: PropTypes.func.isRequired,
};

export default Titlebar;