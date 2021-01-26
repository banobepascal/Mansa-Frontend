import React, { useEffect } from 'react';
import { Grid, Typography } from '@material-ui/core';
import SettingsLayout from '../../Common/SettingsLayout';
import CancelSave from './Components/CancelSave';
import { Checkbox, Loader } from 'rsuite';
import { useStore } from '../../../store/useStore';
import { observer } from 'mobx-react';
import { Alert } from '@material-ui/lab';

interface AppProps {
    openSignin(value: string): void;
}

const Notifications = (props: AppProps) => {
    const {openSignin} = props;
    const store = useStore();
    const {subscribeToNotifications, resetMessages, setChecked, loading, successMessage, errorMessage, pageLoad, pageLoadError, userProfile, getUserProfile, cancelUpdate, setCancelUpdate } = store.settingsStore;
    const {user} = store.authStore;
    
    useEffect(() => {
        resetMessages();
     }, [resetMessages]);

    useEffect(() => {
        getUserProfile(user.uid);
    }, [getUserProfile, user]);

    useEffect(() => {
        if (successMessage || errorMessage) {
            setTimeout(() => {
                resetMessages();
            }, 4000);
        }
     }, [successMessage, errorMessage, resetMessages]);

     useEffect(() => {
        if(cancelUpdate === true){
            getUserProfile(user.uid);
        }
    }, [getUserProfile, user, cancelUpdate]);

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
                                <Typography variant="h6" style={{fontWeight: 600}}>Notification Settings</Typography>
                            </Grid>

                            { successMessage ?
                                <Grid item>
                                    <Alert severity="success">{successMessage}</Alert>
                                </Grid> : errorMessage ? <Grid item>
                                    <Alert severity="error">{errorMessage}</Alert>
                                </Grid> 
                            : null }
    
                            <Grid item>
                                <Typography variant="body2">To update your notification settings, tick or untick the box located to the right of the notification that you wish to change..</Typography>
                            </Grid>
    
                            <Grid item>
                                <Grid container direction="column">
                                    <Grid item>
                                        <Typography style={{fontWeight: 600}}>Mansa</Typography>
                                    </Grid>
                                    <Grid item style={{backgroundColor: "#e6e6e6", padding: "1.6rem"}}>
                                        <Grid container direction="column" spacing={2}>
                                            <Grid item>
                                                <Grid container direction="row" spacing={2} alignItems="center">
                                                    <Grid item xs>
                                                        <Typography>General Communication Emails</Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <Checkbox checked={userProfile.notification} onClick={setChecked} />
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="body2">
                                                    Sign up for emails to stay up to speed with the best Mansa products, offers and your Member benefits.
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
    
                            <Grid item style={{borderTop: "1px solid #EBECF0", borderBottom: "1px solid #EBECF0", paddingTop: 20, paddingBottom: 20}}>
                                <CancelSave loading={loading} type="save"  handleSave={() => subscribeToNotifications(user)}/>
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
        </div>
    )
}

export default observer(Notifications);
