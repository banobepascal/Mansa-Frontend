/* eslint-disable no-restricted-globals */
import React, { useEffect } from 'react';
import Routes from './Routes/Routes';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { useStore } from '../store/useStore';
import { observer } from 'mobx-react';
import { auth } from '../config/firebase';

function App() {
const store = useStore();
const { setUser, setToken, setModal, createUserProfileDocument, setLoggedIn} = store.authStore;

  useEffect(() => {
    auth.onAuthStateChanged(async(user) => {
      if (user){
        try {
          await createUserProfileDocument(user);
          const { token } = await user.getIdTokenResult();
          setToken(token);
          setModal(false);
          setLoggedIn(true);
          const user_record = {
            token,
            ...user.providerData[0],
            uid: user.uid,
        }

        document.cookie = `user_details=${JSON.stringify(user_record)}; path=/`;

        } catch (error){
          setToken('');
          // setUser({});
        }
      }
     
      if (!user){
        setToken('');
        setUser({});
        setLoggedIn(false)
      }
    });
  }, [setToken, setUser, setModal, createUserProfileDocument, setLoggedIn]);


  return (
    <MuiThemeProvider theme={THEME}>
        <Routes />
    </MuiThemeProvider>
  );
}

const THEME = createMuiTheme({
  typography: {
   "fontFamily": `'Roboto', sans-serif`,
   "fontWeightLight": 400,
   "fontWeightRegular": 500,
   "fontWeightMedium": 500,
  },

  
});

export default observer(App);
