import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CustomButton from '../../../Common/CustomButton';
import { Cached, ArrowForwardIos } from '@material-ui/icons';


const LearningGuide = () => {
    const classes = useStyles();

    return (
        <div>
            <Grid className={classes.learnMore}>
                <Grid container direction="row" alignItems="center" className={classes.guideContainer}>
                    <Grid item xs>
                        <Grid container direction="row" spacing={2} style={{flexWrap: "nowrap"}}>
                            <Grid item className={classes.iconContainer}>
                                <Cached style={{fontSize: 46}} />
                            </Grid>

                            <Grid item>
                                <Grid container direction="column">
                                    <Grid item>
                                        <Typography variant="h6" style={{fontWeight: 600}}>Getting started on Mansa</Typography>
                                    </Grid>

                                    <Grid item>
                                        <Typography variant="body2" style={{color: "#8d9091"}}>Learn more on how to navigate Mansa on our Mansa guide</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item className={classes.btnContainer}>
                        <CustomButton text="Learn more" EndIcon={ArrowForwardIos} classes={classes.btn} />
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    btn: {
        height: "40px",
        border: "1px solid #fff",
        backgroundColor: "transparent",
        boxShadow: "none",
        color: "#fff",
        borderRadius: 6,
        '&:hover': {
            color: "#0052CC",
            border: "1px solid #0052CC",
            backgroundColor: "#15141b",
        }
    },

    learnMore: {
        backgroundColor: "#15141b",
        borderColor: "#15141b",
        marginTop: 34,
        padding: "1.6rem",
        color: "#fff",

        [theme.breakpoints.down(768)]: {
            padding: "1.2rem",
            marginTop: theme.spacing(4),
        }
    },

    guideContainer: {
        [theme.breakpoints.down(768)]: {
            flexDirection: "column",
            alignItems: "unset"
        }
    },

    iconContainer: {
        [theme.breakpoints.down(360)]: {
            display: "none"
        }
    },

    btnContainer: {
        [theme.breakpoints.down(768)]: {
           textAlign: "right",
           paddingTop: 16
        }
    }
}));

export default LearningGuide
