import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Grid, Link } from '@material-ui/core';
import CartMetrics from '../../../Common/CartMetrics';
import { observer } from 'mobx-react';
import { useStore } from '../../../../store/useStore';


const CartCheckout = () => {
    const store = useStore();
    const {
        subtotal, total, taxes, shipping,
        cartItems
    } = store.cartStore;

    return (
        <Grid>
            <Grid container direction="column" style={{border: "1px solid #EBECF0"}}>
                <Grid item>
                    <div style={{backgroundColor: "#e5e5e5", padding: "0.5rem"}}>
                        <Grid container direction="row" alignItems="center">
                            <Grid item xs>
                                <Typography variant="h6" style={{fontWeight: 600}}>
                                    CART
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="body2">
                                    <Link color="inherit" style={{cursor: "pointer"}}>Edit it</Link>
                                </Typography>
                            </Grid>
                        </Grid>         
                    </div>
                </Grid>

                <Grid item style={{padding: "1.6rem"}}>
                    <Grid container direction="column" spacing={2}>
                        <Grid item>
                            <CartMetrics
                                total={total}
                                subtotal={subtotal}
                                shipping={shipping}
                                taxes={taxes}
                            />
                        </Grid>

                        {/* <Grid item style={{marginTop: 40}}>
                            <Typography variant="body2" style={{fontWeight: 600}}>ARRIVES BY WED, AUG 19</Typography>
                        </Grid> */}

                        <Grid item style={{marginTop: 40}}>
                            { cartItems.length > 0 ? cartItems.map((item, index) => {
                                return (
                                    <Grid container direction="row" spacing={2} key={index}>
                                        <Grid item>
                                            <img src={item.productImages[0]} alt="" style={{width: 65}} />
                                        </Grid>

                                        <Grid item>
                                            <Grid container direction="column">
                                                <Grid item>
                                                    <div style={{width: 340}}>
                                                        <Typography 
                                                            variant="body2"
                                                            style={{fontWeight: 600, textTransform: "capitalize", wordBreak: "break-all", wordWrap: "break-word"}}>
                                                            {item.title}
                                                        </Typography>
                                                    </div>
                                                </Grid>
                                                <Grid item>
                                                    <Typography variant="body2" style={{color: "#6d6d6d"}}>
                                                        Qty: {item.quantityToBuy ? item.quantityToBuy : "1"}
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Typography variant="body2" style={{color: "#6d6d6d"}}>
                                                        Shs. {item.quantityToBuy ? item.quantityToBuy * item.price : item.price * 1}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                )
                            }) : null }
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>  
        </Grid>
    )
}

export default observer(CartCheckout);
