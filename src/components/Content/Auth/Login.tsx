import React, { useState, useEffect } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Grid, Typography, Link} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
//import Input from '../../Common/Input';
import { Button, Icon, Input, Checkbox } from 'rsuite';
import CustomButton from '../../Common/CustomButton';
import CommonStyles from '../../Common/CustomStyles';
import {useStore} from '../../../store/useStore';
import { useHistory } from "react-router-dom";
import { observer } from 'mobx-react';
import { getCookie } from '../../../Utitlities/cookies';



interface AppProps {
    closeModal(): void;
    openSignin(value: string): void;
}

const Login = (props: AppProps) => {
    let history = useHistory();
    const classes = useStyles();
    const commonClass = CommonStyles();
    const { closeModal, openSignin } = props;
    const auth = useStore();
    const { successMessage, login, errorMessage, updateEmail, updatePassword, loading, user, googleSignIn, setUser, loggedIn} = auth.authStore;

    useEffect(() => {
        if(successMessage){
            setTimeout(() => {
                closeModal();
            }, 2000)
        }
    });

    useEffect(() => {
        if (loggedIn === true){
            const userDetails = getCookie('user_details');
            if (userDetails) {
                setUser(JSON.parse(userDetails))
            }
        }
    }, [setUser, loggedIn]);

    return (
        <div className={classes.root}>
            <div>
                <Grid container direction="row" alignItems="center">
                    <Grid item xs>
                        <Typography variant="h6" style={{fontWeight: 600}}>Mansa</Typography>
                    </Grid>

                    <Grid item>
                        <Close style={{fontWeight: 600, cursor: "pointer"}} onClick={closeModal} />
                    </Grid>
                </Grid>
            </div>

            <div style={{marginTop: 40}}>
                <Typography align="center" style={{fontWeight: 600}}>Login now to your Mansa Account</Typography>
            </div>
            
             { successMessage ?
                <Grid item>
                    <Alert severity="success">{successMessage}</Alert>
                </Grid> : errorMessage ? <Grid item>
                    <Alert severity="error">{errorMessage}</Alert>
                </Grid> 
            : null }
            
                <div style={{marginTop: 20}}>
                    <Grid container direction="column" spacing={2} >
                        <Grid item>
                            <Input placeHolder="Email Address" onChange={updateEmail} />
                        </Grid>

                        <Grid item>
                            <Input placeHolder="Password" type="password" onChange={updatePassword}/>
                        </Grid>
                    </Grid>
                </div>

                <div style={{marginTop: 20}}>
                    <Grid container direction="row" alignItems="center" className={classes.forgotPassword}>
                        <Grid item>
                            <Link style={{cursor: "pointer"}} onClick={() => openSignin("forgot password")}>Forgot Password</Link>
                        </Grid>
                    </Grid>
                </div>

                <div style={{marginTop: 20}}>
                    <Typography variant="body2" align="center">By logging in, you agree to Mansa's Privacy Policy and Terms of Use.</Typography>
                </div>

                <div style={{marginTop: 20}}>
                    <Grid container direction="column" spacing={1}>
                        <Grid item>
                            <Button onClick={login} loading={loading} className={commonClass.btnBlack} style={{width: "100%",  background: "#15141b", color: "#fff"}}>SIGN IN</Button>
                        </Grid>

                        <Grid item>
                            <Button onClick={googleSignIn} className={commonClass.btnBlue} style={{width: "100%", backgroundColor: "#DE350B", borderColor: "#DE350B", color: "#fff"}}>
                                <Icon icon="google" />
                                <span style={{marginLeft: 10}}>SIGN IN WITH GOOGLE</span>
                            </Button>
                        </Grid>
                        
                    </Grid>
                </div>

            <div style={{marginTop: 20}}>
                <Grid container direction="row" justify="center">
                    <Typography variant="caption" align="center">Not a member? <Link style={{cursor: "pointer"}} onClick={() => openSignin("signup")}>Join us</Link></Typography>
                </Grid>
            </div>
        </div>
    )
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        padding: "1.6rem",
        width: "100%",
        maxWidth: "436px",
        minHight:" 200px",

        [theme.breakpoints.down(600)]: {
            padding: "1.6rem 1rem",
        }
    },

    forgotPassword: {
        [theme.breakpoints.down(600)]: {
            flexDirection: "column",

            "& .MuiGrid-grid-xs-true": {
                paddingBottom: 10
            }
        }
    }

}));

export default observer(Login);
