import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import SettingsLayout from '../../Common/SettingsLayout';
import CheckBox from '../../Common/CheckBox';
import CancelSave from './Components/CancelSave';
import CommonStyles from '../../Common/CustomStyles';
import { Button, SelectPicker, Input, Checkbox, Loader } from 'rsuite';
import { observer } from 'mobx-react';
import { useStore } from '../../../store/useStore';
import { Alert } from '@material-ui/lab';
import DeletePasswordAccountAddress  from './Modal/DeletePasswordAccountAddress';
import DeleteProviderAccountAddress  from './Modal/DeleteProviderAccountAddress';
import { auth } from '../../../config/firebase';
import CustomModal from '../../Common/CustomModal';

interface AppProps {
    openSignin(value: string): void;
}

const Addresses = (props: AppProps) => {
    const commonClass = CommonStyles();
    const {openSignin} = props;
    const store = useStore();
    const { loading, successMessage, errorMessage, updateDefaultAddress, 
            updateSecondAddress, updateRegion, pageLoad, pageLoadError, 
            setCancelUpdate, setModal, getUserProfile, updateTownOrCity, 
            resetMessages, updateAddressess, setMakeDefaultAddress, userProfile, 
            cancelUpdate, modal, deleteErrorMessage, deleteSuccessMessage} = store.settingsStore;
    const {user} = store.authStore;

    const closeModal = () => {
        setModal(false);
    }

    useEffect(() => {
        if(user.uid){
            getUserProfile(user.uid);
        }
    }, [getUserProfile, user]);
    
    useEffect(() => {
        if(cancelUpdate === true){
            getUserProfile(user.uid);
        }
    }, [getUserProfile, user, cancelUpdate]);

    useEffect(() => {
        resetMessages();
    }, [resetMessages]);
   
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
                            <Grid item>
                                <Typography variant="h6" style={{fontWeight: 600}}>Addresses</Typography>
                            </Grid>
    
                            { successMessage ?
                                <Grid item>
                                    <Alert severity="success">{successMessage}</Alert>
                                </Grid> : errorMessage ? <Grid item>
                                    <Alert severity="error">{errorMessage}</Alert>
                                </Grid> 
                            : null }

                            { deleteSuccessMessage ?
                                <Grid item>
                                    <Alert severity="success">{deleteSuccessMessage}</Alert>
                                </Grid> : deleteErrorMessage ? <Grid item>
                                    <Alert severity="error">{deleteErrorMessage}</Alert>
                                </Grid> 
                            : null }

                            <Grid item>
                                <Checkbox checked={userProfile.makeDefaultAddress} onChange={setMakeDefaultAddress}>Make this my default address</Checkbox>
                            </Grid>
    
                            <Grid item>
                                <Grid container direction="column" spacing={2}>
                                    <Grid item>
                                        <Grid container direction="row" spacing={2} className={commonClass.inputContainer}>
                                            <Grid item xs={6}>
                                                <Typography variant="body2">Address 1*</Typography>
                                                <Input defaultValue={userProfile.defaultAddress} onChange={updateDefaultAddress}  style={{ textTransform: "capitalize" }}/>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Typography variant="body2">Address 2*</Typography>
                                                <Input defaultValue={userProfile.secondAddress} onChange={updateSecondAddress} style={{ textTransform: "capitalize" }}/>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
    
                            <Grid item>
                                <Grid container direction="column" spacing={2}>
                                    <Grid item>
                                        <Grid container direction="row" spacing={2} className={commonClass.inputContainer}>
                                        <Grid item xs={6}>
                                                <Typography variant="body2">Town/City</Typography>
                                                <Input defaultValue={userProfile.townOrCity} onChange={updateTownOrCity} style={{ textTransform: "capitalize" }} />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Typography variant="body2">Region</Typography>
                                                <Input defaultValue={userProfile.region} onChange={updateRegion} style={{ textTransform: "capitalize" }} />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
    
                            <Grid item style={{borderTop: "1px solid #EBECF0", borderBottom: "1px solid #EBECF0", paddingTop: 20, paddingBottom: 20}}>
                                <CancelSave handleCancel={setCancelUpdate}  loading={loading} handleSave={updateAddressess} />
                            </Grid>
    
                            <Grid item style={{paddingTop: 20, paddingBottom: 20}}>
                                <Button onClick={() => setModal(true)} className={commonClass.btnBlack} style={{backgroundColor: "#DE350B", borderColor: "#DE350B", color: "#fff"}}>Delete Address</Button>
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
                {user.providerId === "password" ? 
                    <DeletePasswordAccountAddress handleClose={closeModal}/>
                :
                    <DeleteProviderAccountAddress handleClose={closeModal}/>
                }
                </CustomModal >
        </div>
    )
}


export default observer(Addresses);
