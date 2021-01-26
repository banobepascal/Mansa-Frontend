import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Link } from '@material-ui/core'
import SectionTitle from '../../../Common/SectionTitle'
import { observer } from 'mobx-react';
import { useStore } from '../../../../store/useStore';


const PopularCatergories = () => {
    const classes = useStyles();
    const homepage = useStore();
    const {popularCategories} = homepage.homepageStore;

    return (
        <Grid container direction="column" spacing={2} style={{flexWrap: "nowrap"}}>
            <Grid item>
                <SectionTitle label="Explore popular categories" />
            </Grid>

            <Grid item className={classes.containerRoot}>
                <Grid container  direction="row" alignItems="center" spacing={4} xs={12} style={{flexWrap: "nowrap"}}>
                    { popularCategories.map((value) => {
                        return (
                            <Link href={`/category/type/${value.id}`} style={{textDecoration: "none", color: "inherit"}}>
                                <Grid item className={classes.item}>
                                    <Grid container direction="column" alignItems="center">
                                        <Grid item>
                                            <div className={classes.imgContainer}>
                                                <img src={value.collectionImage} alt="" className={classes.img}/>
                                            </div>  
                                        </Grid>

                                        <Grid item style={{marginTop: 10}}>
                                            <Typography variant="body2" style={{textTransform: "capitalize"}}>{value.title}</Typography>
                                        </Grid>
                                    </Grid>            
                                </Grid>
                            </Link>
                        )
                    }) }  
                </Grid>
            </Grid>
        </Grid>
    )
}

const useStyles = makeStyles((theme) => ({
   containerRoot: {
        width: "100%",
        maxWidth: "100%",
        padding: 10,
        overflowX: 'auto',
        overflowY: "hidden",
        height: 240 ,
        [theme.breakpoints.up(2000)]: {
            height: 440,
        },
    },
   
    item: {
        display: "inline-block",
        minWidth: 150
    },

    img: {
        width: 200,
        height: 180,
        [theme.breakpoints.up(2000)]: {
            minHeight: 380, 
            width: 400,
        },
    },

    imgContainer: {
        maxWidth: "100%", 
        maxHeight: 180, 
        display: "flex", 
        alignItems: "center",
        paddingRight: 20,
        [theme.breakpoints.up(2000)]: {
            maxHeight: 380,
            paddingRight: 30,
        },
    }
}));

export default observer(PopularCatergories);
