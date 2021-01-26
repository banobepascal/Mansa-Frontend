import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@material-ui/core';
import SettingsLayout from '../../Common/SettingsLayout';
import CancelSave from './Components/CancelSave';
import CommonStyles from '../../Common/CustomStyles';
import { Input} from 'rsuite';
import { observer } from 'mobx-react';
import { useStore } from '../../../store/useStore';
import { Alert } from '@material-ui/lab';
import { useHistory } from 'react-router-dom';

interface AppProps {
    openSignin(value: string): void;
}

const PasswordSettings = (props: AppProps) => {
    let history = useHistory();
    const {openSignin} = props;
    const store = useStore();
    const {loading, successMessage, errorMessage, updatePassword, updateNewPassword, updateConfirmPassword, resetMessages, cancelUpdate, setCancelUpdate, updateAccountPassword} = store.settingsStore;
    const {user} = store.authStore;
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

    useEffect(() => {
        if (successMessage) {
            setTimeout(() => {
                history.push("/settings")
            }, 2000);
        }
     });

    return (
        <div>
            <div>
                {user.uid ? 
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
    
                            <Grid item>
                                <Typography variant="body2">Current Password</Typography>
                                <Input type="password" onChange={updatePassword}/>
                            </Grid>
    
                            <Grid item>
                                <Grid container direction="column" spacing={2}>
                                    <Grid item>
                                        <Typography variant="body2">New Password</Typography>
                                        <Input type="password" onChange={updateNewPassword}/>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="body2">Confirm Password</Typography>
                                        <Input  type="password" onChange={updateConfirmPassword} />
                                    </Grid>
                                </Grid>
                            </Grid>
    
                            <Grid item style={{borderTop: "1px solid #EBECF0", borderBottom: "1px solid #EBECF0", paddingTop: 20, paddingBottom: 20}}>
                                <CancelSave handleCancel={setCancelUpdate}  loading={loading} handleSave={() => updateAccountPassword(user)} />
                            </Grid>
                        </Grid>
                    </SettingsLayout>
                    : 
                    <Grid item style={{display: "flex", justifyContent: "center"}}>
                        <Typography variant="body2" style={{fontWeight: 600}}>Login / Sign up to access account settings</Typography>
                    </Grid>
                }
            </div>
        </div>
    )
}


export default observer(PasswordSettings);
