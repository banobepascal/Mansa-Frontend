import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import CustomButton from '../../../Common/CustomButton'
import { Link, Email, Close } from '@material-ui/icons'
import CommonStyles from '../../../Common/CustomStyles'


interface AppProps {
    closeModal(): void;
}

const InviteOthers = (props: AppProps) => {
    const { closeModal } = props;

    return (
        <div>
            <Grid container alignItems="center" direction="row" style={{padding: "0.6rem", backgroundColor: "#e5e5e5"}}>
                <Grid item xs>
                    <Typography variant="body2" style={{fontWeight: 600}}>Invite others to your list</Typography>
                </Grid>

                <Grid item>
                    <Close style={{cursor: "pointer"}} onClick={closeModal} />
                </Grid>
            </Grid>
            <Grid container direction="column" spacing={2} style={{padding: "1.6rem"}}>
                <Grid item>
                    <Grid container direction="column">
                        <Grid item>
                            <Typography>Invite someone to</Typography>
                        </Grid>

                        <Grid item style={{marginTop: 5}}>
                            <Grid container direction="row" spacing={2} alignItems="center">
                                <Grid item>
                                    <CustomButton text="View only" classes={CommonStyles().btnTransparentBlack} size="small" />
                                </Grid>
                                <Grid item>
                                    <CustomButton text="View and Edit" classes={CommonStyles().btnTransparentBlack} size="small" />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>           
                </Grid>

                <Grid item>
                    <Grid container direction="column">
                        <Grid item>
                            <Typography variant="body2">Anyone with a link can view your list without making edits</Typography>
                        </Grid>

                        <Grid item style={{marginTop: 5}}>
                            <Grid container direction="row" spacing={2}>
                                <Grid item>
                                    <CustomButton text="Copy link" size="small" classes={CommonStyles().btnTransparentBlack} StartIcon={Link} />
                                </Grid>
                                <Grid item>
                                    <CustomButton text="Invite by email" size="small" classes={CommonStyles().btnTransparentBlack} StartIcon={Email}  />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>      
                </Grid>
            </Grid>
        </div>
    )
}

export default InviteOthers
