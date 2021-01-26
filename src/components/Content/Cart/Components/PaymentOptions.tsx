import React from 'react';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import CustomButton from '../../../Common/CustomButton';
import {Help} from '@material-ui/icons';
import { Grid, Tooltip } from '@material-ui/core';
import CommonStyles from '../../../Common/CustomStyles';
import { useStore } from '../../../../store/useStore';
import { observer } from 'mobx-react';
import { Input, Radio } from 'rsuite';

const PaymentOptions = () => {
    const classes = useStyles();
    const store = useStore();
    const {
        isPromoApplied, promoCodeText, handlePromoCodeChange,
        applyPromoCode, paymentMethod, selectPaymentMethod,
        handleCardChange, handleExpirationDate, handleSecurityCard,
        card, securityCode, expDate
    } = store.cartStore;
    
    return (
        <Grid style={{marginTop: 40}}>
            <Grid container direction="column" style={{border: "1px solid #EBECF0"}}>
                <Grid item>
                    <div style={{backgroundColor: "#000", padding: "0.5rem", border: "1px solid #000"}}>
                        <Typography variant="h6" style={{fontWeight: 600, color: "#fff"}}>
                            PAYMENT
                        </Typography>
                    </div>
                </Grid>
                <Grid item>
                    <div className={classes.container}>
                        <Grid container direction="column" spacing={2} style={{flexWrap: "nowrap"}}>
                            <Grid item>
                                <Grid container direction="row" spacing={1} alignItems="center">
                                    <Grid item>
                                        <Typography variant="body1" style={{fontWeight: 700}}>
                                            Billing Country/Region
                                        </Typography>
                                    </Grid>

                                    <Grid item>
                                        <Tooltip 
                                            title="This is the country/region where your payment method is verified" 
                                            aria-label="helper">
                                            <Help fontSize="small" style={{cursor: "pointer", fontSize: 14 }} />
                                        </Tooltip>
                                    </Grid>
                                </Grid>
                                
                                <Typography variant="body2">Uganda</Typography>
                            </Grid>

                            <Grid item>
                                <Grid container direction="row" spacing={2} alignItems="center">
                                    <Grid item>
                                        { 
                                            isPromoApplied ? <Typography style={{textTransform: "uppercase"}}>
                                                { promoCodeText }
                                            </Typography> : <Input 
                                                style={{height: 40, textTransform: "uppercase" }}
                                                onChange={handlePromoCodeChange}
                                                value={promoCodeText}
                                                placeholder="PROMO CODE"
                                            /> 
                                        }
                                    </Grid>

                                    <Grid item>
                                        <CustomButton 
                                            handleClick={applyPromoCode}
                                            text={isPromoApplied ? "Change" : "Apply"}
                                            classes={CommonStyles().btnBlue} 
                                            style={{ background: "#0052CC", color: "#fff"}}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item style={{marginTop: 25}}>
                                <Grid container direction="column">
                                    <Grid item>
                                        <Typography variant="body2" style={{fontWeight: 600}}>SELECT PAYMENT METHOD</Typography>
                                    </Grid>

                                    <Grid item>
                                        <Grid container direction="row" alignItems="center" className={classes.options}>
                                            {/* <Grid item xs={4}>
                                                <Radio checked={paymentMethod === "card" ? true : false} onChange={() => selectPaymentMethod("card")}>
                                                    <span role="img" aria-label="credit-card">💳 <span style={{marginLeft: 5}}>Pay using credit card</span></span>
                                                </Radio>
                                            </Grid> */}

                                            <Grid item xs={6}>
                                                <Radio checked={paymentMethod === "momo" ? true : false} onChange={() => selectPaymentMethod("momo")}>
                                                    <span role="img" aria-label="momo">📱 Pay using Mobile Money</span>
                                                </Radio>
                                            </Grid>

                                            <Grid item xs={6}>
                                                <Radio checked={paymentMethod === "cash" ? true : false} onChange={() => selectPaymentMethod("cash")}> 
                                                    <span role="img" aria-label="credit-card" >💰 Pay cash on delivery</span>
                                                </Radio>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>       
                            </Grid>
                            
                            { paymentMethod === "card" ? <Grid item>
                                <Grid container direction="column">
                                    <Grid item>
                                        <Typography variant="body2" style={{fontWeight: 600}}>ADD CARD</Typography>
                                    </Grid>

                                    <Grid item style={{marginTop: 20}}>
                                        <Grid container direction="row" alignItems="center" spacing={2}>
                                            <Grid item xs={4} className={classes.card}>
                                                <Typography variant="body2" style={{fontWeight: 400}}>Card Number</Typography>
                                                <Input 
                                                    style={{height: 40 }}
                                                    onChange={handleCardChange}
                                                    value={card}
                                                />
                                            </Grid>
                                            <Grid item xs={4} className={classes.date}>
                                                <Typography variant="body2" style={{fontWeight: 400}}>Expiration Date</Typography>
                                                <Input
                                                    style={{height: 40, width: "100%" }}
                                                    placeholder="MM/YYYY"
                                                    onChange={handleExpirationDate}
                                                    value={expDate}
                                                />
                                            </Grid>
                                            <Grid item xs={4} className={classes.date}>
                                                <Typography variant="body2" style={{fontWeight: 400}}>Security Code</Typography>
                                                <Input
                                                    format="YYYY-MM"
                                                    style={{height: 40 }}
                                                    placeholder="XXX"
                                                    onChange={handleSecurityCard}
                                                    value={securityCode}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid> : null  }

                            {/* { paymentMethod === "card" ? <Grid item>
                                <Grid container direction="column" spacing={2}>
                                    <Grid item>
                                        <Checkbox primary="Billing address same as shipping" />
                                    </Grid>
                                    <Grid item>
                                        <Grid container direction="column">
                                            { ["Shipping Address", "Mugerwa Joseph", "Santa Road", "Kamapal, Rwanda"].map((value) => {
                                                return (
                                                    <Grid item>
                                                        <Typography variant="body2">{value}</Typography>
                                                    </Grid>
                                                )
                                            }) }
                                        </Grid>
                                    </Grid>
                                </Grid>        
                            </Grid> : null } */}
                        </Grid>
                    </div>
                </Grid>
            </Grid>
        </Grid> 
    )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
        padding: "1.6rem",
        [theme.breakpoints.down(600)]: {
            padding: "1.6rem 1rem",
        },
    },
    voucher: {
        [theme.breakpoints.down(520)]: {
            flexGrow: 1,
        }
    },
    card: {
        [theme.breakpoints.down('md')]: {
            minWidth: "100%"
        },
    },

    date: {
        [theme.breakpoints.down('md')]: {
            minWidth: "50%"
        },
    },

    options: {
        [theme.breakpoints.down(600)]: {
            flexDirection: "column",
            alignItems: "unset",

            "& .MuiGrid-grid-xs-6": {
                maxWidth: "100%"
            }
        }
    },

  }),
);

export default observer(PaymentOptions);
