import { AppBar, CssBaseline, Divider, Drawer, Hidden, IconButton, List, ListItem, ListItemText, Toolbar, Typography } from '@material-ui/core';
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import { makeStyles, useTheme } from '@material-ui/core/styles';

import Home from "./components/home.component";
import MenuIcon from '@material-ui/icons/Menu';
import MergePlayers from "./components/merge-players.component";
import Players from "./components/players.component";
import React from 'react';

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
        <ListItem button component={Link} to="/" key="home"><ListItemText primary="Home"/></ListItem>
        <ListItem button component={Link} to="/players" key="players"><ListItemText primary="List Players"/></ListItem>
        <ListItem button component={Link} to="/merge-players" key="merge-players"><ListItemText primary="Merge Players"/></ListItem>
      </List>
    </div>
  );
  
  const handleDrawerToggle = () => { setMobileOpen(!mobileOpen); };

  return (
    <BrowserRouter>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} className={classes.menuButton}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>Baseball Analyzer</Typography>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer} aria-label="mailbox folders">
          <Hidden smUp implementation="css">
            <Drawer
              variant="temporary" 
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{paper: classes.drawerPaper}}
              ModalProps={{keepMounted: true}}
            >{drawer}</Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer classes={{ paper: classes.drawerPaper }} variant="permanent" open>{drawer}</Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            <Route exact path="/"><Home/></Route>
            <Route path="/merge-players"><MergePlayers/></Route>
            <Route path="/players"><Players/></Route>
          </Switch>
        </main>
      </div>
    </BrowserRouter>
  );
}