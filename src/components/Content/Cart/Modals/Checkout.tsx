import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CustomButton from '../../../Common/CustomButton';
import { Chat } from '@material-ui/icons';
import { Grid, Link } from '@material-ui/core';
import CartCheckout from '../Components/CartCheckout';
import DeliveryOptions from '../Components/DeliveryOptions';
import PaymentOptions from '../Components/PaymentOptions';
import FullScreenModalNavbar from '../../../Common/FullScreenModalNavbar';
import CommonStyles from '../../../Common/CustomStyles';
import { Button } from 'rsuite';
import { observer } from 'mobx-react';
import { useStore } from '../../../../store/useStore';


interface AppProps {
    closeModal?(): void;
    user: any;
}

const Checkout = (props: AppProps) => {
    const classes = useStyles();
    const { closeModal } = props;
    const store = useStore();
    const { placeOrder} = store.cartStore;
    const {user} = store.authStore;


    return (
        <div style={{overflowX: "hidden"}}>
            <FullScreenModalNavbar closeModal={closeModal} />
            <Grid container direction="column">
                <Grid item style={{padding: "0 2rem", marginTop: 10}}>
                    <Grid container direction="row" spacing={2} alignItems="center" justify="flex-end">
                        <Grid item>
                            <Typography variant="caption">1-800-806-6453</Typography>
                        </Grid>
                        <Grid item>
                            <Grid container direction="row" alignItems="center">
                                <Grid item>
                                    <Chat fontSize="small" style={{fontSize: 16, paddingTop: 5}} />
                                </Grid>
                                <Grid item>
                                    <Typography variant="caption">
                                        <Link style={{color: "inherit"}}>Live Chat</Link>
                                    </Typography>
                                </Grid>
                            </Grid>                 
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item style={{marginTop: 40}}>
                    <Grid container direction="row" alignItems="center" justify="center">
                        <Typography variant="h4" style={{fontWeight: 600}}>CHECKOUT</Typography>
                    </Grid>
                </Grid>

                <Grid item style={{ marginTop: 40}}>
                    <Grid container direction="row" spacing={4}  className={classes.styling}>
                        <Grid item className="deliveryOptions" xs={7}>
                            <Grid container direction="column" style={{border: "1px solid #EBECF0"}}>
                                <DeliveryOptions />
                            </Grid>
                            <Grid item>
                                <PaymentOptions />
                            </Grid>
                            <Grid item style={{marginTop: 40}}>
                                <div style={{border: "1px solid #EBECF0", padding: "1rem"}}>
                                    <Grid container direction="row" justify="center">
                                        <Grid item xs={12}>
                                            <CustomButton handleClick={() => placeOrder(user)} text="PLACE ORDER" style={{width: "100%"}} classes={CommonStyles().btnBlack} />
                                        </Grid>
                                    </Grid>
                                    <Grid container direction="row" justify="center" style={{padding: "0 5rem", marginTop: 15}}>
                                        <Typography variant="caption" align="center">By clicking the Place Order button, you confirm that you have read and understood, and accept our Terms and Conditions, Return Policy, and Privacy Policy.</Typography>
                                    </Grid>
                                </div>
                            </Grid> 
                        </Grid>

                        <Grid item className="inCart" xs={5}>
                            <CartCheckout />
                        </Grid>              
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      color: "#000"
    },

    styling: {
        padding: "0 5rem",

        [theme.breakpoints.down('md')]: {
            padding: "0 2rem",
        },

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

        [theme.breakpoints.down(420)]: {
            padding: 0,
        },
    },

    container: {
        [theme.breakpoints.down(420)]: {
            flexDirection: "column"
        },
    }

  }),
);

export default observer(Checkout)
