import React from 'react'
import { Grid } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';


interface AppProps {
    children: any;
}

const ProductFilterLayout = (props: AppProps) => {
    const { children }  = props;

    return (
        <Grid container direction="row" spacing={8}>
            { children }
        </Grid>
    )
}

const FilterCategorySideBar = (props: AppProps) => {
    const { children } = props;
    const classes = useStyles();
    
    return (
        <Grid item xs={3} className={classes.sideBar}>
            { children }
        </Grid>
    )
}

const ProductLayout = (props: AppProps) => {
    const { children } = props;
    const classes = useStyles();

    
    return (
        <Grid item xs={9} className={classes.productLayout}>
            { children }
        </Grid>
    ) 
}

const useStyles = makeStyles((theme) => ({
    productLayout: {
        [theme.breakpoints.down('md')]: {
            padding: "0 2rem"
        },

        [theme.breakpoints.down('sm')]: {
            minWidth: "100%",
            // padding: "0 2rem"
        },

        [theme.breakpoints.down(500)]: {
            minWidth: "100%",
            padding: "0 1rem"
        }
    },

    sideBar: {
        [theme.breakpoints.down('sm')]: {
            display: "none"
        }
    },

    drawerPaper: {
        width: 365,
        border: "none",
        backgroundColor: '#fff',
    },

    drawer: {
        display: 'none', 
        [theme.breakpoints.up('sm')]: {
            width: 240,
            flexShrink: 0, 
        },
        [theme.breakpoints.down('md')]: {  
            display: 'none', 
        }
    },
}));

export {ProductFilterLayout, FilterCategorySideBar, ProductLayout}
