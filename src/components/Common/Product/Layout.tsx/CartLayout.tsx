import React, { SyntheticEvent, useState, useEffect } from 'react';
import { Grid, Typography, Link, makeStyles  } from '@material-ui/core';
import CartImage from '../CartImage';
import { useStore } from '../../../../store/useStore';
import { Dropdown } from 'rsuite';
import { observer } from 'mobx-react';


const CartLayout = (props: any) => {
    const store = useStore();
    const classes = useStyles();
    const [quantity, setQuantity] = useState<number>(1);
    const { product, uniqueKey } = props;
    const { quantityAvailable, title, price, id, productImages } = product;
    const {removeItemFromCart, editProductAndQuantity, fetchSummary} = store.cartStore;

    useEffect(() => {
        fetchSummary();
    }, [fetchSummary])

    const selectQuantity = (eventKey: any, event: SyntheticEvent<any>, uniqueIndex: any) => {
        setQuantity(eventKey);
        editProductAndQuantity(eventKey, uniqueKey);
    }

    return (
        <div className={classes.layout}>
            <Link href={`/product/${id}`}>
                <div>
                    <CartImage image={productImages[0]}/>
                </div>
            </Link> 

            <div>
                <Grid container direction="column">
                    <Grid item>
                        <Grid container direction="row" alignItems="center">
                            <Grid item xs>
                                <Typography variant="body2" style={{fontWeight: 600, fontSize: 16, textTransform: "capitalize"}}>{title}</Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="body2" style={{color : "#0052CC", fontWeight: 700}}>UGX {parseInt(price) * quantity}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Typography variant="body2" style={{color: "#BF2600", fontSize: 13}}>Only {quantityAvailable} left in stock - order soon.</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="body2" style={{fontSize: 13}}>
                            Shipped from: 
                            <Link style={{color: "#0052CC", cursor: "pointer"}}>HQTRONIC LLC</Link>             
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Grid container direction="row" alignItems="center" spacing={2}>
                            <Grid item>
                                <Dropdown 
                                    activeKey={quantity}
                                    title={quantity}
                                    className={classes.dropDown}
                                    onSelect={(eventKey: any, event: any) => selectQuantity(eventKey, event, uniqueKey)}>
                                    { [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value, index) => {
                                        return <Dropdown.Item key={index} active={quantity === value ? true : false} eventKey={value}>{value}</Dropdown.Item>
                                    }) }  
                                </Dropdown>
                            </Grid>
                            <Grid item>
                                <Typography 
                                    variant="body2"
                                    style={{color: "#BF2600", fontSize: 13, borderLeft: "1px solid #EBECF0", paddingLeft: 10, cursor: "pointer"}} 
                                    onClick={() => removeItemFromCart(id)}>Remove</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    layout: {
        display: "grid", 
        gridTemplateColumns: "125px auto", 
        columnGap: "25px",
        [theme.breakpoints.down(450)]: {
            gridTemplateColumns: "1fr", 
            rowGap: "25px",
        }
    },

    input: {
        width: 100,
        "& .rs-input-number-btn-group-vertical": {
            display: "none",
        }
    },
    
    dropDown: {
        border: "1px solid #EBECF0",
        borderRadius: 0,
        '&:hover': {
            borderRadius: 0,
            backgroundColor: "transparent"
        },

        '&:focus': {
            borderRadius: 0,
            backgroundColor: "transparent"
        }
    }
})); 

export default observer(CartLayout);
