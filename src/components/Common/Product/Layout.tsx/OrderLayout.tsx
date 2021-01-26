import React from 'react';
import { Grid, Typography, Link, makeStyles  } from '@material-ui/core';
import moment from 'moment';
import { observer } from 'mobx-react';


interface AppProps {
    order: any
}

const OrderLayout = (props: AppProps) => {
    const classes = useStyles();
    const { order } = props;
   
    return (
        <div className={classes.layout}>
            <div>
                <Grid container direction="column">
                    <Grid item>
                        <Grid container direction="row" alignItems="center">
                            <Grid item xs>
                                <Typography variant="body2" style={{fontWeight: 600, fontSize: 16, textTransform: "capitalize"}}>#{order.trackingId}</Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="body2" style={{
                                    color: order.status === "pending" ? "#FFAB00" : order.status === "declined" ? "#FF5630" : "#36B37E" , 
                                    fontWeight: 700, 
                                    textTransform: "uppercase"}}
                                >
                                        {order.status}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Typography variant="body2" style={{fontSize: 13}}>
                            Shipped to: 
                            <Link style={{color: "#0052CC", cursor: "pointer", marginLeft: 5, fontWeight: 700}}>
                                {order.address ? order.address : order.pickUpAddress}
                            </Link>
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="body2" style={{fontSize: 13}}>Created on { moment(order.createdOn).format('LLLL') }</Typography>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    layout: {
        display: "grid", 
        gridTemplateColumns: "325px auto", 
        columnGap: "25px",
        [theme.breakpoints.down(450)]: {
            gridTemplateColumns: "1fr", 
            rowGap: "25px",
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

export default observer(OrderLayout);
