/* eslint-disable no-restricted-globals */
import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import SettingsLayout from '../../Common/SettingsLayout';
import CommonStyles from '../../Common/CustomStyles';
import CancelSave from './Components/CancelSave';
import { Alert } from '@material-ui/lab';
import { Input, Button, Loader, InputNumber } from 'rsuite';
import { useStore } from '../../../store/useStore';
import { observer } from 'mobx-react';
import ImageUploader from './Components/ImageUploader';
import CustomModal from '../../Common/CustomModal';
import DeletePasswordAccount from './Modal/DeletePasswordAccount';
import { auth } from '../../../config/firebase';
import DeleteProviderAccount from './Modal/DeleteProviderAccount';


interface AppProps {
    openSignin(value: string): void;
}

const Settings = (props: AppProps) => {
    const classes = useStyles();
    const commonClass = CommonStyles();
    const {openSignin} = props;
    const store = useStore();
    const { successMessage, errorMessage, loading, updateFirstname, updateLastname, updateProfile,
            updateEmail, updateGender, updateDOB, updateTownOrCity, updateRegion, userProfile,
            updateMobileNumber, resetMessages, modal, setModal, updateDefaultAddress, getUserProfile,
            pageLoad, pageLoadError, cancelUpdate, setCancelUpdate, removeMessage
        } = store.settingsStore;

    const {user} = store.authStore;

    const closeModal = () => {
        setModal(false);
    }

    useEffect(() => {
        if (user.uid){
            getUserProfile(user.uid);
        }
    }, [getUserProfile, user]);

    useEffect(() => {
       resetMessages();
    }, [resetMessages]);

    useEffect(() => {
        if(cancelUpdate === true){
            getUserProfile(user.uid);
        }
    }, [getUserProfile, user, cancelUpdate]);

    useEffect(() => {
        if (successMessage || errorMessage) {
            setTimeout(() => {
                resetMessages();
            }, 4000);
        }
     }, [successMessage, errorMessage, resetMessages]);
 

    return (
        <div>
            {user.uid ? 
                <div>
                    {pageLoad === true ? 
                        <Loader center size="md" />
                    : pageLoadError ? 
                        <Grid item style={{textAlign: "center"}}>
                            <Typography>{pageLoadError}</Typography>
                        </Grid>
                    :
                        <SettingsLayout openSignin={openSignin}>
                            <Grid container direction="column" spacing={2}>
                                <Grid item className={classes.settingTitle}>
                                    <Typography variant="h6" style={{fontWeight: 600}}>Account Settings</Typography>
                                </Grid>
        
                                { successMessage ?
                                    <Grid item>
                                        <Alert severity="success">{successMessage}</Alert>
                                    </Grid> : errorMessage ? <Grid item>
                                        <Alert severity="error">{errorMessage}</Alert>
                                    </Grid> 
                                : null }
        
                                <div className={classes.avatarContainer}>
                                    <div className={classes.avatar}>
                                        <ImageUploader/>
                                    </div>
                                </div>
                                     
        
                                <Grid item style={{marginTop: 120}}>
                                    <Grid container direction="column" spacing={2}>
                                        <Grid item>
                                            <Grid container direction="row" spacing={2} className={commonClass.inputContainer}>
                                                <Grid item xs={6}>
                                                    <Typography variant="body2">First Name</Typography>
                                                    <Input defaultValue={userProfile.firstname} onChange={updateFirstname} style={{ textTransform: "capitalize" }}/>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography variant="body2">Last Name</Typography>
                                                    <Input defaultValue={userProfile.lastname} onChange={updateLastname} style={{ textTransform: "capitalize" }}/>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        
                                        <Grid item>
                                            <Grid container direction="row" spacing={2}>
                                                <Grid item xs={6}>
                                                    <Typography variant="body2">Gender</Typography>
                                                    <Input defaultValue={userProfile.gender} onChange={updateGender} style={{ textTransform: "lowercase" }} />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography variant="body2">Date of birth</Typography>
                                                    <Input type="date" defaultValue={userProfile.dateOfBirth} onChange={updateDOB}/>
                                                    {/* <DatePicker defaultValue={dateOfBirth} oneTap onChange={updateDOB} style={{width: "100%"}}/> */}
                                                </Grid>
                                            </Grid>         
                                        </Grid>
            
                                        <Grid item>
                                            <Grid container direction="row" spacing={2} className={commonClass.inputContainer}>
                                                <Grid item xs={6}>
                                                    <Typography variant="body2">Email</Typography>
                                                    <Input defaultValue={user.email} onChange={updateEmail} />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography variant="body2">Mobile</Typography>
                                                    <InputNumber prefix="+256" defaultValue={userProfile.phoneNumber} onChange={updateMobileNumber} className={classes.numberBtnGroup}/>
                                                </Grid>
                                            </Grid>         
                                        </Grid>

                                        <Grid item>
                                            <Typography variant="body2">Address</Typography>
                                            <Input defaultValue={userProfile.defaultAddress} onChange={updateDefaultAddress} style={{ textTransform: "capitalize" }} />
                                        </Grid>
                                        
                                    </Grid>
                                </Grid>
            
                                <Grid item>
                                    <Grid container direction="column" spacing={2} style={{marginTop: 20, borderTop: "1px solid #EBECF0"}}>
                                        <Grid item>
                                            <Typography variant="h6" style={{fontWeight: 600}}>Location</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Grid container direction="row" spacing={2} className={commonClass.inputContainer}>
                                                <Grid item xs={6}>
                                                    <Typography variant="body2">Town/City</Typography>
                                                    <Input defaultValue={userProfile.townOrCity} onChange={updateTownOrCity} style={{ textTransform: "capitalize" }}/>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography variant="body2">Region</Typography>
                                                    <Input defaultValue={userProfile.region} onChange={updateRegion} style={{ textTransform: "capitalize" }}/>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
            
                                <Grid item style={{borderTop: "1px solid #EBECF0", borderBottom: "1px solid #EBECF0", paddingTop: 20, paddingBottom: 20}}>
                                    <CancelSave handleCancel={setCancelUpdate}  handleSave={() => updateProfile(user)} loading={loading}/>
                                </Grid>
            
                                <Grid item style={{paddingTop: 20, paddingBottom: 20}}>
                                    <Button onClick={() => setModal(true)} classes={commonClass.btnBlack} style={{backgroundColor: "#DE350B", borderColor: "#DE350B", color: "#fff"}}>Delete Account</Button>
                                </Grid>
                            </Grid>
                        </SettingsLayout>
                    }
                </div>
                : 
                <Grid item style={{display: "flex", justifyContent: "center"}}>
                    <Typography variant="body2" style={{fontWeight: 600}}>Login / Sign up to access account settings</Typography>
                </Grid>
            }
            
            
            <CustomModal modal={modal} type="noTitle">
                { user.providerId === "password" ? 
                    <DeletePasswordAccount handleClose={closeModal}/>
                :    
                    <DeleteProviderAccount handleClose={closeModal}/>
                }
            </CustomModal >
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    // necessary for content to be below app
    settingTitle: {
        [theme.breakpoints.down(500)]: {
            textAlign: "center",
            marginTop: 25,
            marginBottom: 15
        }
    },

    avatarContainer: {
        position: "relative",
    },

    avatar: {
        position: "absolute",
        top: "50%",
        left: "47%",
        margin: "-15px 0 0 -25px",

        [theme.breakpoints.down(500)]: {
            left: "45%",
        }
    },

    numberBtnGroup: {
        "& .rs-input-number-btn-group-vertical": {
            display: "none"
        }
    }
}));

export default observer(Settings);
