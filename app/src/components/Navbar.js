import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { compose, withState } from 'recompose';
import AuthState from '../containers/AuthState';
import Logout from '../containers/Logout';

import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import ReceiptIcon from '@material-ui/icons/Receipt';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

 import { ReactComponent as Logo } from '../assets/svg/logo.svg';
import theme from '../theme';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  brandIcon: {
    height: 75,
    width: 75,
    margin: '-5px 0 -10px -13px',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
});

const InnerDrawer = compose(
  withStyles(styles),
  withRouter,
)(({ classes }) => (
  <div>
    <div className={classes.toolbar} />
    <List>
      <ListItem
        button
        component={Link}
        to="/"
      >
        <ListItemIcon>
          <ReceiptIcon />
        </ListItemIcon>
        <ListItemText primary="Feed" />
      </ListItem>
      <AuthState>
        {({ isAuthenticated }) => (
          <React.Fragment>
            { isAuthenticated &&
              <ListItem
                button
                component={Link}
                to="/messages"
              >
                <ListItemIcon>
                  <QuestionAnswerIcon />
                </ListItemIcon>
                <ListItemText primary="Messages" />
              </ListItem>
            }
          </React.Fragment>
        )}
      </AuthState>
    </List>
    <Divider light />
    <List>
      <AuthState>
        {({ isAuthenticated }) => (
          <React.Fragment>
            { isAuthenticated &&
              <React.Fragment>
                <ListItem
                  button
                  component={Link}
                  to="/profile"
                >
                  <ListItemIcon>
                    <AccountCircleIcon />
                  </ListItemIcon>
                  <ListItemText primary="Profile" />
                </ListItem>
                <Logout>
                    { props => (
                      <ListItem
                        button
                        component={Link}
                        to="/"
                        onClick={ e => {
                          props.handleLogout();
                        }}
                      >
                        <ListItemIcon>
                          <OpenInNewIcon />
                        </ListItemIcon>
                        <ListItemText primary="Log Out" />
                      </ListItem>
                    )}
                </Logout>
              </React.Fragment>
            }
            { !isAuthenticated &&
              <ListItem
                button
                component={Link}
                to="/login"
              >
                <ListItemIcon>
                  <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText primary="Log In" />
              </ListItem>
            }
          </React.Fragment>
        )}
      </AuthState>
    </List>
  </div>
));

const handleDrawerToggle = (setMobileOpen, mobileOpen) => {
  setMobileOpen(!mobileOpen)
};

const enhanced = compose(
  withStyles(styles),
  withState('mobileOpen', 'setMobileOpen', false),
);

export default enhanced(({
  classes,
  children,

  mobileOpen,

  setMobileOpen
}) => (
  <div className={classes.navbar}>
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={() => {
              handleDrawerToggle(setMobileOpen, mobileOpen)
            }}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Logo className={classes.brandIcon} />
          &nbsp;&nbsp;
          <Typography variant="h6" color="inherit">
            Chat
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer}>
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={() => {
              handleDrawerToggle(setMobileOpen, mobileOpen)
            }}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <InnerDrawer />
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            <InnerDrawer />
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  </div>
));
