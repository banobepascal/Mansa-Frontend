import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CustomButton from '../../../Common/CustomButton';
import { ArrowForward } from '@material-ui/icons';

const SlideShow = () => {
    const classes = useStyles();

    return (
        <Grid className={classes.imageContainer}>
            <Grid container direction="column" spacing={2}>
                <Grid item>
                    <Typography variant="h2" className={classes.slideShowMainText}>Find the best sneakers on Mansa</Typography>
                </Grid>
                <Grid item>
                    <Typography variant="h2" className={classes.slideShowSubText}>Find the best sneakers on Mansa</Typography>
                </Grid>
                <Grid item>
                    <CustomButton link="/category" text="Shop now" EndIcon={ArrowForward} classes={classes.shopNowBtn} />
                </Grid>
                
            </Grid> 
        </Grid>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
      
    },

    shopNowBtn: {
        backgroundColor: "#091E42",
        boxShadow: "none",
        border: "1px solid #091E42",
        color: "#fff",
        borderRadius: 0,
        width: "max-content",
        '&:hover': {
            border: "1px solid #091E42",
            backgroundColor: "#091E42",
            color: "#fff"
        },
        
    },

    imageContainer: {
        padding: 60,
        backgroundImage: "url('https://i.ebayimg.com/images/g/dpoAAOSwkBtejeOc/s-l960.webp')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100%",
        display: "flex",
        alignItems: "center",
        
        [theme.breakpoints.down(760)]: {
            width: "100%",
            padding: 40,
        },

        [theme.breakpoints.down(500)]: {
            padding: 20,
        }
    },

    imageElements: {
        padding: 150
    },

    slideShowMainText: {
        color: "#121258",
        fontSize: "2.25rem",
        fontWeight: 600
    },

    slideShowSubText: {
        fontWeight: 600,
        color: "#121258",
        fontSize: "1.0625rem"
    }
}));

export default SlideShow
