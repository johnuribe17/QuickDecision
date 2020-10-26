import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import PlaceIcon from '@material-ui/icons/Place';
import GroupIcon from '@material-ui/icons/Group';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import AccountCircle from '@material-ui/icons/AccountCircle';
import TranslateIcon from '@material-ui/icons/Translate';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import StarRateIcon from '@material-ui/icons/StarRate';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import Aleatorio from './Aleatorio';
import Home from './Home';
import Lugares from './Lugares';
import Ponderado from './Ponderado';
import Amigos from './Amigos';
import {
  Switch,
  Route,
  useRouteMatch,
  Link
} from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    // zIndex: theme.zIndex.drawer + 1,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      flexGrow: 1,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  typographyStyles: {
    flex: 1
  },
  sectionDesktop: {
    // display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  drawerLink: {
    textDecoration: 'none',
    color: 'inherit',
  },
  placeIconColor: {
    color: 'red'
  },
  equalizerIconColor: {
    color: 'blue'
  },
  groupIconColor: {
    color: 'green'
  },
  shuffleIconColor: {
    color: 'purple'
  },
  starRateIconColor: {
    color: 'yellow'
  },
}));

function MainPage(props) {
  const { window, handleDarkMode } = props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  // const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const isMenuOpen = Boolean(anchorEl);
  const { t, i18n } = useTranslation();

  function handleClickTranslation(lang) {
    i18n.changeLanguage(lang);
    console.log(i18n.language);
    setAnchorEl(null);
  }

  const handleTranslateMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // const handleMobileMenuClose = () => {
  //   setMobileMoreAnchorEl(null);
  // };

  const handleMenuClose = () => {
    setAnchorEl(null);
    // handleMobileMenuClose();
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => handleClickTranslation('es')}>Español</MenuItem>
      <MenuItem onClick={() => handleClickTranslation('en')}>English</MenuItem>
    </Menu>
  );

  let match = useRouteMatch();

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <Link to={`${match.url}lugares`} className={classes.drawerLink}>
          <ListItem button key="drawerOption1">
            <ListItemIcon><PlaceIcon color="primary" classes={{ colorPrimary: classes.placeIconColor }}/></ListItemIcon>
            <ListItemText primary={t('Lugares.title1')} />
          </ListItem>
        </Link>
        <Link to={`${match.url}ponderado`} className={classes.drawerLink}>
          <ListItem button key="drawerOption2">
            <ListItemIcon><EqualizerIcon color="primary" classes={{ colorPrimary: classes.equalizerIconColor }}/></ListItemIcon>
            <ListItemText primary={t('Ponderado.title1')} />
          </ListItem>
        </Link>
        <Link to={`${match.url}amigos`} className={classes.drawerLink}>
          <ListItem button key="drawerOption3">
            <ListItemIcon><GroupIcon color="primary" classes={{ colorPrimary: classes.groupIconColor }}/></ListItemIcon>
            <ListItemText primary={t('Amigos.title1')} />
          </ListItem>
        </Link>
        <Link to={`${match.url}aleatorio`} className={classes.drawerLink}>
          <ListItem button key="drawerOption4">
            <ListItemIcon><ShuffleIcon color="primary" classes={{ colorPrimary: classes.shuffleIconColor }}/></ListItemIcon>
            <ListItemText primary={t('Aleatorio.title1')} />
          </ListItem>
        </Link>
      </List>
      <Divider />
      <List>
        {/* <Link to={`${match.url}aleatorio`} className={classes.drawerLink}> */}
          <ListItem button key="drawerOption5">
            <ListItemIcon><StarRateIcon color="primary" classes={{ colorPrimary: classes.starRateIconColor }}/></ListItemIcon>
            <ListItemText primary={t('Calificaciones.title1')} />
          </ListItem>
        {/* </Link> */}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      {/* <Paper> */}
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap className={classes.typographyStyles}>
            QuickDecision
          </Typography>
          <div className={classes.sectionDesktop}>
            <IconButton
              // edge="end"
              aria-label="theme"
              // aria-controls={menuId}
              // aria-haspopup="true"
              onClick={handleDarkMode}
              color="inherit"
            >
              <Brightness4Icon />
            </IconButton>
            <IconButton
              // edge="end"
              aria-label="translation"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleTranslateMenuOpen}
              color="inherit"
            >
              <TranslateIcon />
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              // aria-controls={menuId}
              aria-haspopup="true"
              // onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {/* </Paper> */}
      {renderMenu}
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper, 
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {/* <div>
          <Link to={`${match.url}aleatorio`}>Aleatorio</Link>
        </div> */}
        <Switch>
          <Route path={`${match.path}lugares`} component={Lugares} />
          <Route path={`${match.path}ponderado`} component={Ponderado} />
          <Route path={`${match.path}amigos`} component={Amigos} />
          <Route path={`${match.path}aleatorio`} component={Aleatorio} />
          <Route exact path={match.path} component={Home} />
        </Switch>
      </main>
    </div>
  );
}

// MainPage.propTypes = {
//   /**
//    * Injected by the documentation to work in an iframe.
//    * You won't need it on your project.
//    */
//   window: PropTypes.func,
// };

export default MainPage;