import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, IconButton, Toolbar, AppBar, Grid } from '@material-ui/core'
import { Close } from '@material-ui/icons'

interface AppProps {
    closeModal(): void;
}

const Reviews = (props: AppProps) => {
    const classes = useStyles();
    const { closeModal } = props;

    return (
        <div>
            <AppBar position="static" className={classes.navbar}>
                <Toolbar>
                    <Grid container direction="row">
                        <Grid item xs>
                            <Typography variant="h6">
                                News
                            </Typography>
                        </Grid>

                        <Grid item>
                            <IconButton size="small">
                                <Close />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            
            <Typography>Reviews</Typography>
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    navbar: {
        backgroundColor: "#fff",
        boxShadow: "none",
        color: "#000"
    }
}));

export default Reviews
