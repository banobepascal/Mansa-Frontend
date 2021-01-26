import React from 'react';
import ProductImage from '../ProductImage';
import { Grid, Typography, Box, Link, makeStyles } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { ProductLayoutProps } from '../../../../data/data';
import ColumnLayoutImage from '../ColumLayoutImage';
import { Rate } from 'rsuite';

interface AppProps extends ProductLayoutProps {
    variant: any[]
}

const ColumnLayout = (props: any) => {
    const { product } = props;
    const {totalRatings, totalRaters, title, quantityAvailable, price, productImages, productType} = product
    const classes = useStyles();
    

    return (
        <div className={classes.productColumn}>
            <div>
                <ColumnLayoutImage image={productImages[0]} />
            </div>

            <div style={{ display: "flex", alignItems: "center"}}>
                <Grid container direction="column" spacing={1} >
                    <Grid item>
                        <Typography variant="body2" style={{fontSize: "1rem", textTransform: "capitalize", fontWeight: 700}}>{title}</Typography>
                    </Grid>

                    <Grid item container direction="row" spacing={2}>
                        <Grid item>
                            <Box component="small" borderColor="transparent">
                                <Rating size="small" name="pristine" readOnly value={Math.round(totalRatings / totalRaters)} />
                            </Box>
                        </Grid>
                    </Grid>

                    <Grid item>
                        <Grid container direction="column">
                            <Grid item>
                                <Typography variant="body2" style={{color: "#0052CC", fontWeight: 600, cursor: "pointer"}}>
                                    <Link style={{color: "inherit"}}>Product Type: <span style={{textTransform: "capitalize"}}>{productType}</span></Link>
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="body2" style={{fontSize: "17px", fontWeight: 600}}>UGX {price}</Typography>
                            </Grid>
                            <Grid item style={{marginTop: 10}}>
                                <Typography variant="body2">Stock: {quantityAvailable} available</Typography>
                            </Grid>
                            <Grid item>
                                <Grid container direction="row" spacing={2} wrap="nowrap">
                                    {/* { variants?.length > 0 ? 
                                        variants.map((variant) => {
                                            return (
                                                <Grid item style={{cursor: "pointer", width: 60}}>
                                                    <img style={{width: "100%"}} src={variant} alt="" />  
                                                </Grid>
                                            )
                                    }) : null }   */}
                                </Grid>
                            </Grid>
                        </Grid>                    
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}


const useStyles = makeStyles((theme) => ({
    productColumn: {
        display: "grid", 
        gridTemplateColumns: "200px auto", 
        columnGap: "25px",
        [theme.breakpoints.down(600)]: {
            gridTemplateColumns: "1fr", 
            rowGap: "25px",
        }
    }
})); 

export default ColumnLayout
