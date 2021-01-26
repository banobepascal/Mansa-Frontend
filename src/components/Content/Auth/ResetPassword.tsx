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



interface AppProps {
    closeModal(): void;
    openSignin(value: string): void;
}

const ResetPassword = (props: AppProps) => {
    let history = useHistory();
    const classes = useStyles();
    const { closeModal, openSignin } = props;
    const auth = useStore();
    const { successMessage, errorMessage, updateEmail, loading, user, passwordReset} = auth.authStore;
    
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
                <Typography align="center" style={{fontWeight: 600}}>Forgot password</Typography>
            </div>
            
             { successMessage ?
                <Grid item>
                    <Alert severity="success">{successMessage}</Alert>
                </Grid> : errorMessage ? <Grid item>
                    <Alert severity="error">{errorMessage}</Alert>
                </Grid> 
            : null }
            
                <div style={{marginTop: 20}}>
                    <Grid container direction="column" spacing={2}>
                        <Grid item>
                            <Input placeHolder="Email Address" label="Email" onChange={updateEmail} />
                        </Grid>
                    </Grid>
                </div>

                <div style={{marginTop: 20}}>
                    <Grid container direction="column" spacing={1}>
                        <Grid item>
                            <Button onClick={passwordReset} loading={loading} className={CommonStyles().btnBlack} style={{width: "100%",  background: "#15141b", color: "#fff"}}>Send reset link</Button>
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
        minWidth: "336px",
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

export default observer(ResetPassword);
