import { AppBar, CssBaseline, Divider, Drawer, Hidden, IconButton, List, ListItem, ListItemText, Toolbar, Typography } from '@material-ui/core';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import DashboardIcon from '@material-ui/icons/Dashboard';
import Home from './pages/home';
import ImportExportData from './pages/import-export-data';
import { Link } from 'react-router-dom';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MenuIcon from '@material-ui/icons/Menu';
import PeopleIcon from '@material-ui/icons/People';
import Players from './pages/players';
import React from 'react';
import TransformIcon from '@material-ui/icons/Transform';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: { display: 'flex' },
  appBar: { zIndex: theme.zIndex.drawer + 1 },
  content: { flexGrow: 1, padding: theme.spacing(3) },
  drawer: { [theme.breakpoints.up('sm')]: { width: drawerWidth, flexShrink: 0 } },
  drawerPaper: { width: drawerWidth },
  menuButton: { marginRight: theme.spacing(2), [theme.breakpoints.up('sm')]: { display: 'none' } },
  toolbar: theme.mixins.toolbar
}));

export default function App() {
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <ListItem button component={Link} to='/' key='home'>
          <ListItemIcon><DashboardIcon/></ListItemIcon>
          <ListItemText primary='Home'/>
        </ListItem>
        <ListItem button component={Link} to='/players' key='players'>
          <ListItemIcon><PeopleIcon/></ListItemIcon>
          <ListItemText primary='Players'/>
        </ListItem>
        <ListItem button component={Link} to='/import-export-data' key='import-export-data'>
          <ListItemIcon><TransformIcon/></ListItemIcon>
          <ListItemText primary='Integrations'/>
        </ListItem>
      </List>
    </div>
  );

  const handleDrawerToggle = () => { setMobileOpen(!mobileOpen); };

  return (
    <BrowserRouter>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position='fixed' className={classes.appBar}>
          <Toolbar>
            <IconButton color='inherit' aria-label='open drawer' edge='start' onClick={handleDrawerToggle} className={classes.menuButton}>
              <MenuIcon />
            </IconButton>
            <Typography variant='h6' noWrap>Baseball Analyzer</Typography>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer} aria-label='mailbox folders'>
          <Hidden smUp implementation='css'>
            <Drawer
              variant='temporary' 
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{paper: classes.drawerPaper}}
              ModalProps={{keepMounted: true}}
            >{drawer}</Drawer>
          </Hidden>
          <Hidden xsDown implementation='css'>
            <Drawer classes={{ paper: classes.drawerPaper }} variant='permanent' open>{drawer}</Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            <Route exact path='/'><Home/></Route>
            <Route path='/import-export-data'><ImportExportData/></Route>
            <Route path='/players'><Players/></Route>
          </Switch>
        </main>
      </div>
    </BrowserRouter>
  );
}