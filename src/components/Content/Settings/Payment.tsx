import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import SettingsLayout from '../../Common/SettingsLayout';
import CustomButton from '../../Common/CustomButton';
import CancelSave from './Components/CancelSave';
import { useStore } from '../../../store/useStore';
import { Button } from 'rsuite';

interface AppProps {
    openSignin(value: string): void;
}

const Payment = (props: AppProps) => {
    const {openSignin} = props;
    const store = useStore();
    const {user} = store.authStore;

    return (
        <div>
            {user.uid ? 
                <SettingsLayout openSignin={openSignin}>
                    <Grid container direction="column" spacing={2}>
                        <Grid item>
                            <Typography variant="h6" style={{fontWeight: 600}}>Payment Options</Typography>
                        </Grid>

                        <Grid item>
                            <Typography>Saved Credit Cards</Typography>
                        </Grid>

                        <Grid item style={{borderTop: "1px solid #EBECF0", borderBottom: "1px solid #EBECF0", paddingTop: 20, paddingBottom: 20}}>
                            <CancelSave />
                        </Grid>

                        <Grid item style={{paddingTop: 20, paddingBottom: 20}}>
                            <Button style={{backgroundColor: "#DE350B", borderColor: "#DE350B", color: "#fff"}}>Remove Card</Button>
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

export default Payment;

