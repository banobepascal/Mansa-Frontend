import React from 'react';
import { Grid, Typography, Link, makeStyles } from '@material-ui/core';
import { ArrowForward } from '@material-ui/icons';


interface AppProps {
    label: string;
}

const SectionTitle = (props: AppProps) => {
    const classes = useStyles();

    const { label } = props;

    return (
        <Grid>
            <Grid container direction="row" alignItems="center" justify="space-between">
                <Grid item>
                    <Typography variant="h6" style={{fontWeight: 600}}>{label}</Typography>
                </Grid>

                <Grid item>
                    <Grid container direction="row" alignItems="center">
                        <Grid item style={{cursor: "pointer"}} className={classes.shop}>
                            <Typography variant="body1" style={{fontWeight: 600, textDecoration: "none"}}>
                                <Link href="/category/" style={{color: "inherit"}}>
                                    Shop now
                                </Link>
                            </Typography>
                        </Grid>
                        <Grid item alignItems="center" style={{display: "flex"}}>
                            <ArrowForward />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>   
        </Grid>
    )
}

const useStyles = makeStyles((theme) => ({
     shop: {
        paddingRight: 16,
        [theme.breakpoints.down(400)]: {
            display: "none"
        }
     },
 }));

export default SectionTitle
