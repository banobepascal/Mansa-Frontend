import React from 'react';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import CustomButton from '../../../Common/CustomButton';
import { Grid } from '@material-ui/core';
import { observer } from 'mobx-react';
import { useStore } from '../../../../store/useStore';
import { Input } from 'rsuite';
import { Alert } from '@material-ui/lab';

const DeliveryOptions = () => {
    const classes = useStyles();
    const store = useStore();
    const {
        isShippingAddress, isPickUpAddress,
        selectDeliveryMethod, handleAddress, handleCity,
        handleDistrict, handleFirstName, handleLastName,
        handlePhoneNumber, handleEmail, email, district,
        city, address, firstName, lastName, phoneNumber,
        pickUpAddress, deliveryError, deliveryInstructions,
        handleDeliveryInstructions, handlePickUpAddress 
    } = store.cartStore;

    return (
        <Grid>
            <Grid item>
                <div style={{backgroundColor: "#000", padding: "0.5rem", border: "1px solid #000"}}>
                    <Typography variant="h6" style={{fontWeight: 600, color: "#fff"}}>
                        DELIVERY OPTIONS
                    </Typography>
                </div>
            </Grid>

            <Grid item>
                <div className={classes.container}>
                    <Grid container direction="column" spacing={2}>
                        <Grid item>
                            <Grid container direction="row" alignItems="center">
                                <Grid 
                                    item
                                    style={{border: "1px solid #EBECF0", padding: "0.5rem", cursor: "pointer",
                                    borderBottomColor: isShippingAddress ? "black" : "#EBECF0"}}
                                    xs={6}
                                    onClick={() => selectDeliveryMethod("shipping")}
                                >
                                    <Typography
                                        align="center"
                                        variant="body2"
                                        style={{fontWeight: isShippingAddress ? 700 : 400}}>
                                        SHIP
                                    </Typography>
                                </Grid>

                                <Grid 
                                    item 
                                    style={{border: "1px solid #EBECF0", padding: "0.5rem", cursor: "pointer",
                                    borderBottomColor: isPickUpAddress === true ? "black" : "#EBECF0"}} 
                                    xs={6}
                                    onClick={() => selectDeliveryMethod("pickup")}
                                >
                                    <Typography 
                                        align="center"
                                        variant="body2"
                                        style={{fontWeight: isPickUpAddress ? 700 : 400}}>
                                            PICK UP
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>


                        { deliveryError ? <Grid item>
                            <Alert severity="error">{deliveryError}</Alert>
                        </Grid> : null  }
                        

                        { isShippingAddress ?
                            <Grid item>
                                <Grid container direction="column" spacing={2}>
                                    <Grid item>
                                        <Typography>Home/Office</Typography>
                                    </Grid>
                                    
                                    <Grid item>
                                        <Grid container direction="row" alignItems="center" spacing={2} className={classes.mobileContainer}>
                                            <Grid item xs={6}>
                                                <Input
                                                    placeholder="First Name"
                                                    style={{height: 40}}
                                                    onChange={handleFirstName}
                                                    value={firstName}
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Input
                                                    placeholder="Last Name"
                                                    style={{height: 40}}
                                                    onChange={handleLastName}
                                                    value={lastName}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    
                                    <Grid item>
                                        <Input placeholder="Address" onChange={handleAddress} value={address} />
                                    </Grid>
                                    
                                    <Grid item>
                                        <Grid container direction="row" alignItems="center" spacing={2} className={classes.addressContainer}>
                                            <Grid item xs={6}>
                                                <Input 
                                                    placeholder="City" 
                                                    style={{height: 40}}
                                                    onChange={handleCity}
                                                    value={city}
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Input 
                                                    placeholder="District"
                                                    style={{height: 40}}
                                                    onChange={handleDistrict}
                                                    district={district}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    
                                    <Grid item>
                                        <Grid container direction="row" alignItems="center" spacing={2} className={classes.mobileContainer}>
                                            <Grid item xs={6}>
                                                <Input 
                                                    placeholder="Email"
                                                    style={{height: 40 }}
                                                    onChange={handleEmail}
                                                    value={email}
                                                />
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Input 
                                                    placeholder="Phone number" 
                                                    style={{height: 40 }}
                                                    onChange={handlePhoneNumber}
                                                    value={phoneNumber}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item>
                                        <Input placeholder="Delivery instructions" type="textarea" onChange={handleDeliveryInstructions} value={deliveryInstructions} />
                                    </Grid>
                                </Grid>
                            </Grid>
                        : null}

                        { 
                            isPickUpAddress ? <Grid item>
                                <Input 
                                    placeholder="Pickup Address"
                                    style={{height: 40 }}
                                    onChange={handlePickUpAddress}
                                    defaultValue={pickUpAddress}
                                />
                            </Grid> : null
                        }
                        
                        {/* <Grid item>
                            <Grid container direction="row" justify="flex-end">
                                <CustomButton handleClick={requestMomoPayment} text="SAVE DETAILS FOR LATER" classes={classes.btnBlack} />
                            </Grid>
                        </Grid> */}
                    </Grid>
                </div>                  
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
    addressContainer: {
        [theme.breakpoints.down(620)]: {
            flexDirection: "column",

            "& .MuiGrid-item": {
                minWidth: "100%"
            }
        },
    },
    btnBlack: {
        border: "1px solid #15141b",
        background: "#15141b",
        borderRadius: 4,
        color: "#fff",
        '&:hover': {
            color: "#fff",
            border: "1px solid #15141b",
            background: "#15141b",
        }
    },
    mobileContainer: {
        [theme.breakpoints.down(520)]: {
            flexDirection: "column",

            "& .MuiGrid-item": {
                minWidth: "100%"
            }
        },
    },
  }),
);

export default observer(DeliveryOptions);
