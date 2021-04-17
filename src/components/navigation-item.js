import { Button, ListItem } from '@material-ui/core';
import { NavLink as RouterLink, matchPath, useLocation } from 'react-router-dom';

import PropTypes from 'prop-types';
import React from 'react';

const NavigationItem = ({ href, icon: Icon, title }) => {
  const location = useLocation();
  const active = href ? !!matchPath({ path: href, end: false  }, location.pathname) : false;
  
  return (
    <ListItem disableGutters sx={{ display: 'flex', py: 0 }}>
      <Button
        component={RouterLink}
        sx={{
          color: 'text.secondary',
          fontWeight: 'medium',
          justifyContent: 'flex-start',
          letterSpacing: 0,
          py: 1.25,
          textTransform: 'none',
          width: '100%',
          ...(active && { color: 'text.primary' }),
          '& svg': { mr: 1 }
        }}
        to={href}
      >
        {Icon && (<Icon size="20" />)}
        <span>{title}</span>
      </Button>
    </ListItem>
  );
};

NavigationItem.propTypes = {
  href: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.string.isRequired,
};

export default NavigationItem;