import React, { useState, useEffect } from 'react'
import { Grid, Typography, makeStyles } from '@material-ui/core';
import ProductContainer from '../../Common/Product/ProductContainer';
import CustomButton from '../../Common/CustomButton';
import CustomizedDialogs from '../../Common/Modal';
import Checkout from './Modals/Checkout';
import CartMetrics from '../../Common/CartMetrics';
import CommonStyles from '../../Common/CustomStyles';
import { useStore } from '../../../store/useStore';
import { observer } from 'mobx-react';
import { Button, Input, Loader } from 'rsuite';
import { Alert, AlertTitle } from '@material-ui/lab';


interface AppProps {
    user: any
}

const Cart = (props: AppProps) => {
    const classes = useStyles();
    const store = useStore();
    const commonClass = CommonStyles();
    // const [open, setOpen] = useState(true);
    // const [modal, setModal] = useState<boolean>(false);
    const { user } = props;
    
    const {
        showCartItems, cartItems, isPromoApplied, 
        promoCodeText, handlePromoCodeChange,
        applyPromoCode, subtotal, total,
        taxes, shipping, successMessage,
        modal, openModal, closeModal, loading
    } = store.cartStore;

    useEffect(() => {
        showCartItems();
    }, [showCartItems])
    
    return (
        <div style={{marginBottom: 100}}>
            
            <Grid container direction="row" spacing={8} className={classes.cartStyles}>
                <Grid item xs={7}>
                    <Grid container direction="column" spacing={4}>
                        { successMessage ? <Grid item>
                            <Alert severity="success">
                                <AlertTitle>Successfully placed order</AlertTitle>
                                Head over to the <a href="/orders">orders</a> tab to view your orders             
                            </Alert>
                        </Grid> : null  }

                        <Grid item>
                            <Grid container direction="column">
                                <Grid item>
                                    <Typography variant="h6" style={{fontWeight: 600}}>Cart</Typography>
                                </Grid>
                                    { cartItems.length < 1 ? <Grid item>
                                        <Typography variant="body2">Products will appear here once added to cart</Typography>
                                    </Grid> : null}

                                    <Grid item style={{marginTop: 20}}>
                                        <Grid container direction="column" spacing={4}>
                                            { cartItems.map((product, index) => {
                                                return (
                                                    <Grid item style={{borderBottom: "1px solid #EBECF0"}} key={index}>  
                                                        <ProductContainer
                                                            product={product}
                                                            type="cart"
                                                            uniqueKey={index}
                                                        />     
                                                    </Grid>
                                                )
                                            }) }
                                        </Grid> 
                                    </Grid>
                            </Grid>             
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={5}>
                    <Grid container direction="column">
                        <Grid item>
                            <Typography variant="h6" style={{fontWeight: 600}}>Summary</Typography>
                        </Grid>

                        <Grid item style={{marginTop: 20}}>
                            <Grid container direction="column" spacing={2}>
                                <Grid item>
                                    <Grid container direction="column">
                                        <Grid item>
                                            <Typography variant="body2">Do you have a promo code</Typography>
                                        </Grid>
                                        <Grid item>
                                            <Grid container direction="row" spacing={2} alignItems="center">
                                                <Grid item>
                                                    { isPromoApplied ? <Typography style={{textTransform: "uppercase"}}>
                                                        { promoCodeText }
                                                    </Typography> : <Input style={{height: 40, textTransform: "uppercase" }} onChange={handlePromoCodeChange} value={promoCodeText} /> }
                                                </Grid>

                                                <Grid item>
                                                    <CustomButton handleClick={applyPromoCode} text={isPromoApplied ? "Change" : "Apply"} classes={commonClass.btnBlue} style={{ background: "#0052CC", color: "#fff"}}/>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <CartMetrics 
                                        total={total}
                                        subtotal={subtotal}
                                        shipping={shipping}
                                        taxes={taxes}  
                                    />
                                </Grid>
                                <Grid item>
                                    <Grid container direction="row" justify="center">
                                        <Grid item xs={12}>
                                            <Button onClick={openModal} className={commonClass.btnBlack} style={{width: "100%", background: "#15141b", color: "#fff"}}>Checkout</Button>
                                        </Grid>
                                    </Grid>         
                                </Grid>      
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <CustomizedDialogs type="fullscreen" modal={modal}>
                <Checkout closeModal={closeModal} user={user} />
            </CustomizedDialogs>
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    cartStyles: {
        
        [theme.breakpoints.down(1000)]: {
            flexDirection: "column",
            padding: "0 5rem",

            "& .MuiGrid-grid-xs-7": {
                maxWidth: "100%"
            },
            "& .MuiGrid-grid-xs-5": {
                maxWidth: "100%"
            },
        },

        [theme.breakpoints.down(800)]: {
            padding: "0 2rem",
        },

        [theme.breakpoints.down(600)]: {
            padding: "0 1rem",
        },

        [theme.breakpoints.down(400)]: {
            padding: 0,
        },
    }
})); 

export default observer(Cart);
