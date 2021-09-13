import { Button, ListItem } from '@material-ui/core';
import { NavLink as RouterLink, matchPath, useLocation } from 'react-router-dom';

import PropTypes from 'prop-types';
import React from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({ 
  button: {
    color: props => props.active ? theme.palette.text.primary : theme.palette.text.secondary,
    fontWeight: 'medium',
    justifyContent: 'flex-start',
    letterSpacing: 0,
    paddingBottom: theme.spacing(1.25),
    paddingTop: theme.spacing(1.25),
    textTransform: 'none',
    width: '100%',
    '& svg': { marginRight: theme.spacing(1) }
  },
  listItem: { 
    display: 'flex', 
    paddingBottom: 0, 
    paddingTop: 0 
  }
}));

const NavigationItem = ({ href, icon: Icon, title }) => {
  const location = useLocation();
  const active = !!matchPath({ path: href, end: false }, location.pathname);
  const classes = useStyles({ active: active });
  
  return (
    <ListItem disableGutters className={classes.listItem}>
      <Button className={classes.button} component={RouterLink} to={href}>
        {Icon && (<Icon size='20'/>)}
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