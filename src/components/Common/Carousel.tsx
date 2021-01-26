import React from 'react';
import { Grid,  Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ProductContainer from './Product/ProductContainer';
import SectionTitle from './SectionTitle';
import { observer } from 'mobx-react';
import { useStore } from '../../store/useStore';


interface AppProps {
    status?: number
    label: string;
    data?: any[];
    products: any[]
}

const Carousel = (props: AppProps) => {
    const classes = useStyles();
    const { label, status, products } = props;


    return (
        <Grid container direction="column" spacing={2} style={{flexWrap: "nowrap"}}>
            <Grid item>
                <SectionTitle label={label} />
            </Grid>
            
            <Grid item style={{marginTop: 10}} className={classes.container}>
                <Grid item container direction="row" spacing={4} xs={12}   style={{flexWrap: "nowrap"}}>
                    { products.map((product, index) => {
                        return (
                            <Grid item xs={3} className={classes.item} key={index}>
                                <ProductContainer 
                                    product={product}
                                    type="carousel"
                                />
                            </Grid>
                        )
                    }) }
                </Grid>
            </Grid>
        </Grid>  
    )
}

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        width: "100%",
        maxWidth: "100%",
        padding: 10,
        overflowX: 'auto',
        overflowY: "hidden"
    },

    item: {
        display: "inline-block",
        minWidth: 300
    }
}));

export default observer(Carousel);
