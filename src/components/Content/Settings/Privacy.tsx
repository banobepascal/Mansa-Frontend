import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import SettingsLayout from '../../Common/SettingsLayout';
import CustomButton from '../../Common/CustomButton';
import { Language, SupervisorAccount, Person } from '@material-ui/icons';
import CancelSave from './Components/CancelSave';
import { Checkbox } from 'rsuite';

interface AppProps {
    openSignin(value: string): void;
}

const Privacy = (props: AppProps) => {
    const {openSignin} = props;
    
    return (
        <div style={{marginBottom: 40}}>
             <SettingsLayout openSignin={openSignin}>
                <Grid container direction="column">
                    <Grid item>
                        <Typography variant="h6" style={{fontWeight: 600}}>Privacy</Typography>
                    </Grid>
                    <Grid item style={{marginTop: 20}}>
                        <Typography>As a Mansa, I want my Mansa⁠ Membership activity and profile to be visible to:</Typography>
                    </Grid>
                    <Grid item style={{marginTop: 20, paddingBottom: 40, borderBottom: "1px solid #EBECF0"}}>
                        <Grid container direction="row">
                            <Grid item>
                                <Checkbox />
                            </Grid>
                            <Grid item>
                                <Language fontSize="small" />
                            </Grid>
                            <Grid item style={{marginLeft: 10}}>
                                <Grid container direction="column" spacing={2}>
                                    <Grid item>
                                        <Typography>Everyone (Public)</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography>Every Mansa Member⁠ can search for you, view your full profile, send you invites and see your activity.</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Checkbox>Share my location with friends only</Checkbox>
                                    </Grid>
                                    <Grid item>
                                        <Checkbox>Don't share my location</Checkbox>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item style={{marginTop: 40, paddingBottom: 40, borderBottom: "1px solid #EBECF0"}}>
                        <Grid container direction="row">
                            <Grid item>
                                <Checkbox />
                            </Grid>
                            <Grid item>
                                <SupervisorAccount fontSize="small" />
                            </Grid>
                            <Grid item style={{marginLeft: 10}}>
                                <Grid container direction="column" spacing={2}>
                                    <Grid item>
                                        <Typography>Friends (Social) Recommended</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography>Every Mansa Member⁠ can search for you, view your full profile, send you invites and see your activity.</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Checkbox>Share my location with friends only</Checkbox>
                                    </Grid>
                                    <Grid item>
                                        <Checkbox>Don't share my location</Checkbox>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item style={{marginTop: 40, paddingBottom: 40, borderBottom: "1px solid #EBECF0"}}>
                        <Grid container direction="row">
                            <Grid item>
                                <Checkbox />
                            </Grid>
                            <Grid item>
                                <Person fontSize="small" />
                            </Grid>
                            <Grid item style={{marginLeft: 10}}>
                                <Grid container direction="column" spacing={2}>
                                    <Grid item>
                                        <Typography>Me Only (private)</Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography>Nobody on Mansa.comat network.
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item style={{marginTop: 20, paddingBottom: 20, borderBottom: "1px solid #EBECF0"}}>
                        <Grid container direction="row">
                            <Grid item>
                                <Typography>
                                    See this information
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item style={{marginTop: 20, paddingBottom: 20, borderBottom: "1px solid #EBECF0"}}>
                        <CancelSave />
                    </Grid>
                </Grid>
            </SettingsLayout>
        </div>
    )
}

const useStyles = makeStyles(() => ({
    
}));

export default Privacy;

