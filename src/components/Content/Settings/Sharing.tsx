import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import SettingsLayout from '../../Common/SettingsLayout';
import { observer } from 'mobx-react';
import { useStore } from '../../../store/useStore';

interface AppProps {
    openSignin(value: string): void;
}

const Sharing = (props: AppProps) => {
    const {openSignin} = props;
    const store = useStore();
    const {user} = store.authStore;
    
    return (
        <div>
            {user ? 
                <SettingsLayout openSignin={openSignin}>
                    <Grid container direction="column" spacing={2}>
                        <Grid item>
                            <Typography variant="h6" style={{fontWeight: 600}}>Share Settings</Typography>
                        </Grid>

                        <Grid item>
                            <Typography>Your Mansa profile isn't connected to any social networks.</Typography>
                        </Grid>
                    </Grid>
                </SettingsLayout>
            : 
                <Grid item style={{display: "flex", justifyContent: "center"}}>
                    <Typography variant="body2" style={{fontWeight: 600}}>Login / Sign up to access account settings</Typography>
                </Grid>
            }
        </div>
    )
}

export default observer(Sharing);
