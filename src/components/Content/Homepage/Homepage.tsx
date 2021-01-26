import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SlideShow from './Components/SlideShow';
import Carousel from '../../Common/Carousel';
import Services from './Components/Services';
import LearningGuide from './Components/LearningGuide';
import PopularCatergories from './Components/PopularCatergories';
import { useStore } from '../../../store/useStore';
import { observer } from 'mobx-react';

interface AppProps {
    user: any
}

const Homepage = (props: AppProps) => {
    const classes = useStyles();
    const homepage = useStore();
    const {showHomepageProducts, showCategories, homepageProducts} = homepage.homepageStore;

    useEffect(() => {
        showHomepageProducts();
        showCategories();
    }, [showCategories, showHomepageProducts])

    return (
        <div className={classes.root}>
            <Grid container direction="column" spacing={4} style={{flexWrap: "nowrap"}}>
                <Grid item className={classes.slideShow}>
                    <SlideShow />
                </Grid>
                
                <Grid item>
                    <PopularCatergories />
                </Grid>
                 
                <Grid item>
                    <LearningGuide />            
                </Grid>
                
                <Grid item style={{marginTop: 40}} className={classes.itemContainer}>
                    <Carousel label="Daily deals" products={homepageProducts}/>
                </Grid>

                <Grid item style={{marginTop: 40}}>
                    <Services />
                </Grid>
            </Grid>
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
      
    },

    popularTags: {
        padding: "0 10rem"
    },

    slideShow: {
        height: 350,

        [theme.breakpoints.up(2000)]: {
            height: 450,
        },
        [theme.breakpoints.down(600)]: {
            height: 300,
        },
    },

    shopNowBtn: {
        backgroundColor: "#FFAB00",
        boxShadow: "none",
        '&:hover': {
            backgroundColor: "#091E42",
            color: "#fff"
        }
    },

    sectionTwoProductContainer: {
        padding: "1.6rem",
        backgroundColor: "#FFAB00"
    },

    sectionThreeListBtn: {
        backgroundColor: "transparent",
        border: "none",
        boxShadow: "none",
    },

    learnMore: {
        backgroundColor: "#c5e5fb",
        borderColor: "#c5e5fb",
        marginTop: theme.spacing(8)
    },

    itemContainer: {
        "& .MuiGrid-container": {
            flexWrap: "nowrap",
        // width: "100%",

        }
    },

}));

export default observer(Homepage);
