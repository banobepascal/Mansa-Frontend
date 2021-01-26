import React, { useState, useEffect } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Grid, Typography, Link, TextField} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { Close, ArrowDropDown } from '@material-ui/icons';
// import Input from '../../Common/Input';
import { Input, Checkbox, Button, Icon, DatePicker } from 'rsuite';
import CheckBox from '../../Common/CheckBox';
import CustomButton from '../../Common/CustomButton';
import CommonStyles from '../../Common/CustomStyles';
import {useStore} from '../../../store/useStore';
import { useHistory } from "react-router-dom";
import { observer } from 'mobx-react';
import isAfter from 'date-fns/isAfter';
import { getCookie } from '../../../Utitlities/cookies';


interface AppProps {
    closeModal(): void;
    openSignin(value: string): void;
}

type DateProps = Date | undefined | number;

const Signup = (props: AppProps) => {
    let history = useHistory();
    const classes = useStyles();
    const commonClass = CommonStyles();
    const {closeModal, openSignin} = props;
    const auth = useStore();
    const { successMessage, signUp, errorMessage, loading, updateFirstname, updateLastname, dateOfBirth,
            updateEmail, updatePassword, updateConfirmPassword, updateGender, gender, setModal, updateDOB,
            googleSignIn, setUser, loggedIn } = auth.authStore;
           
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
                        <Typography variant="h6" style={{fontWeight: 600}}>MANSA</Typography>
                    </Grid>

                    <Grid item>
                        <Close style={{fontWeight: 600, cursor: "pointer"}} onClick={closeModal}  />
                    </Grid>
                </Grid>
            </div>

            <div style={{marginTop: 40}}>
                <Typography align="center" style={{fontWeight: 600}}>BECOME A MANSA</Typography>
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
                            <Input type="text" placeHolder="First Name" onChange={updateFirstname} /> 
                        </Grid>
                        <Grid item>
                            <Input type="text" placeHolder="Last Name" onChange={updateLastname} /> 
                        </Grid>
                        <Grid item>
                            <Input type="email" placeHolder="Email" onChange={updateEmail} /> 
                        </Grid>
                        <Grid item>
                            <Input placeHolder="Password" type="password" onChange={updatePassword} /> 
                        </Grid>
                        <Grid item>
                            <Input placeHolder="ConfirmPassword" type="password" onChange={updateConfirmPassword} /> 
                        </Grid>
                        <Grid item>
						<Input
							id="date"
							type="date"
							placeholder="Date of Birth"
							onChange={updateDOB}
						  />
                        </Grid>
                        <Grid item>
                            <Grid container direction="row" spacing={2}>
                                <Grid item xs={6}>
                                    <Button onClick={() => updateGender("male")} classes={CommonStyles().btnTransparentBlack} style={{width: "100%", backgroundColor: gender === "male" ? "#15141b" : "transparent", color: gender === "male" ? "#fff" : "#15141b"}}>Male</Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button onClick={() => updateGender("female")} classes={CommonStyles().btnTransparentBlack} style={{width: "100%", backgroundColor: gender === "female" ? "#15141b" : "transparent", color: gender === "female" ? "#fff" : "#15141b"}}>Female</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>

                <div style={{marginTop: 20}}>
                    <Typography variant="body2" align="center">By signing up, you agree to Mansa's Privacy Policy and Terms of Use.</Typography>
                </div>

                <div style={{marginTop: 20}}>
                    <Grid container direction="column" spacing={1}>
                        <Grid item>
                            <Button onClick={signUp} loading={loading} className={commonClass.btnBlack} style={{width: "100%", background: "#15141b", color: "#fff" }}>JOIN US</Button>
                        </Grid>

                        <Grid item>
                            <Button onClick={googleSignIn} className={commonClass.btnBlue} style={{width: "100%", backgroundColor: "#DE350B", borderColor: "#DE350B", color: "#fff"}}>
                                <Icon icon="google" />
                                <span style={{marginLeft: 10}}>SIGN UP WITH GOOGLE</span>        
                            </Button>
                        </Grid>

                    </Grid>
                </div>

            <div style={{marginTop: 20}}>
                <Grid container direction="row" justify="center">
                    <Typography variant="caption" align="center">You a member? <Link style={{cursor: "pointer"}} onClick={() => openSignin("login")}>Login</Link></Typography>
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
    
    textField: {
    width: "100%",
    border: "1px solid #e5e5ea",
    borderRadius: "6px",
  },

}));

export default observer(Signup);

