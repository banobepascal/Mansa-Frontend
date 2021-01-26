import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Toolbar, AppBar, IconButton, Grid} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { auth } from '../../config/firebase';
import { observer } from 'mobx-react';
import { Avatar } from 'rsuite';

interface AppProps {
    handleClose?(): void;
    openSignin(value: string): void;
}

const DrawerTopBar = (props: AppProps) => {
    const { handleClose, openSignin} = props;
    const classes = useStyles();
    const user = auth.currentUser;

    return  (
        <AppBar position="sticky" style={{backgroundColor: "#15141b"}}>
            <Toolbar style={{paddingRight: 4}}>
                <Grid container direction="row" alignItems="center" justify="space-between" wrap="nowrap"> 
                    <Grid item container direction="row" alignItems="center" wrap="nowrap">
                        <Grid item>
                            { user?.photoURL ?
                                <Avatar circle src={`${user?.photoURL}`} />
                                :  <Avatar circle />
                            }
                        </Grid>
                        <Grid item style={{marginLeft: 20}}>
                            { user?.displayName ? 
                                <Typography variant="body2" style={{fontWeight: 600}}>
                                    {user?.displayName}
                                </Typography>
                                :
                                user?.email ? 
                                <Typography variant="body2" style={{fontWeight: 600}}>
                                    {user?.email}
                                </Typography>
                                : 
                                <Typography variant="body2" style={{fontWeight: 600, cursor: "pointer"}} onClick={() => openSignin("login")}>
                                    Sign in
                                </Typography>
                            }
                        </Grid>
                    </Grid>
                    <Grid item className={classes.close}>
                        <IconButton onClick={handleClose}>
                            <Close htmlColor="#FFF" />
                        </IconButton>
                    </Grid>
                </Grid>
                
            </Toolbar>
        </AppBar>
    );
}

const useStyles = makeStyles((theme) => ({
    // necessary for content to be below app bar
    small: {
        width: theme.spacing(4),
        height: theme.spacing(4),
    },
    
    close: {
   
    	[theme.breakpoints.down(350)]: {
    	 paddingRight: "3em"
    	}
    }
  }));


export default observer(DrawerTopBar);
