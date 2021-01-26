import React, { ReactType, useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import AppMenu from '../Lister/AppMenu';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Footer from '../Footer';
import AccountListsDrawer from '../AccountListsDrawer';
import { observer } from 'mobx-react';
import { useStore } from '../../../store/useStore';
import CustomizedDialogs from '../Modal';
import Login from '../../Content/Auth/Login';
import Signup from '../../Content/Auth/Signup';
import ResetPassword from '../../Content/Auth/ResetPassword';
import { getCookie } from '../../../Utitlities/cookies';


interface AppProps {
  window?(): any;
  Component: ReactType;
  dropDown?: string;
  pathActive?: string;
  
}

function Dash(props: AppProps) {
  const { window, Component} = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileAccounts, setMobileAccounts] = useState(false);
  const [user, setUser] = useState<Object>({})
  const [dialog, setDialog] = useState<string>("");
  const store = useStore();
  
  const {removeMessage, setModal, modal} = store.authStore;
  const {showCategories, categories} = store.categoriesStore;

  const openSignin = (value: string) => {
      setMobileOpen(false);
      setDialog(value)
      setModal(true)
      removeMessage('');
  }

  const closeModal = () => {
    setModal(false);
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };


  const handleAccountLists = () => {
    setMobileAccounts(!mobileAccounts);
  };

  useEffect(() => {
    showCategories();
  }, [showCategories]);
  
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <div>
        <div className={classes.navbar}>
          <Navbar toggler={handleDrawerToggle} toggleAccounts={handleAccountLists} openSignin={openSignin}/>
        </div>

        <div className={classes.drawer}>
          <div>
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
                <AppMenu handleClose={handleDrawerToggle} openSignin={openSignin} user={user} categories={categories} />
              </Drawer>
            </Hidden>
          </div>

          <div>
            <Hidden xsDown implementation="css">
              <Drawer
                classes={{
                  paper: classes.drawerPaper,
                }}
                variant="permanent"
                open
              >
                <AppMenu handleClose={handleDrawerToggle} openSignin={openSignin} user={user} categories={categories} />
              </Drawer>
            </Hidden>
          </div>
        </div>

        <div className={classes.drawer}>
          <div>
            <Hidden smUp implementation="css">
              <Drawer
                container={container}
                variant="temporary"
                anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                open={mobileAccounts}
                onClose={handleAccountLists}
                classes={{
                  paper: classes.drawerPaper,
                }}
                ModalProps={{
                  keepMounted: true, // Better open performance on mobile.
                }}
              >
                <AccountListsDrawer handleClose={handleAccountLists} openSignin={openSignin} user={user} />
              </Drawer>
            </Hidden>
          </div>

          <div>
            <Hidden xsDown implementation="css">
              <Drawer
                classes={{
                  paper: classes.drawerPaper,
                }}
                variant="permanent"
                open
              >
                <AccountListsDrawer handleClose={handleAccountLists} openSignin={openSignin} user={user} />
              </Drawer>
            </Hidden>
          </div>
        </div>

        <div className={classes.content}>
          <Component user={user} />
        </div>

        <div>
          <Footer user={user} />
        </div>
      </div>
      <CustomizedDialogs type="noTitle" modal={modal}>
        { dialog === "login" ? 
          <Login closeModal={closeModal} openSignin={openSignin} /> 
          : dialog === "signup" ?
          <Signup closeModal={closeModal} openSignin={openSignin} />
          : dialog === "forgot password" ?
          <ResetPassword closeModal={closeModal} openSignin={openSignin}/>
          : null
        }
      </CustomizedDialogs>
    </div>
  );
}


const useStyles = makeStyles((theme) => ({
  root: {
    overflow: "hidden"
    // display: "flex",
    // [theme.breakpoints.down('md')]: {
    //   display: 'block',
    // }
  },
  drawer: {
    display: 'none', 
    [theme.breakpoints.up('sm')]: {
      width: 240,
      flexShrink: 0, 
    },
    [theme.breakpoints.down('md')]: {  
      display: 'none', 
    }
  },

  // necessary for content to be below app bar
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  drawerPaper: {
    width: 365,
    border: "none",
    backgroundColor: '#fff',
  },
  content: {
    flexGrow: 1,
    padding: "0 5rem",
    marginTop: theme.spacing(2),
    width: "100%",
    minHeight: "100vh",
    maxWidth: "2560px",
    // [theme.breakpoints.up(2500)]: {
    //   padding: "0 15rem"
    // },

    [theme.breakpoints.down('md')]: {
      padding: "0 2rem"
    },

    [theme.breakpoints.down(500)]: {
      padding: "0 1rem"
    },
  },
  navbar: {
    width: "100%",
    maxWidth: "2560px"
  }
}));


export default observer(Dash);
