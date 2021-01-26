import React, { useEffect, useState } from 'react'
import { Grid, Typography, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { observer } from 'mobx-react';
import OrderLayout from '../../Common/Product/Layout.tsx/OrderLayout';
import { useStore } from '../../../store/useStore';
import { Alert } from '@material-ui/lab';
import { RouteComponentProps, withRouter } from 'react-router-dom';


interface AppProps extends RouteComponentProps {
    user: any;
}

const Orders = (props: AppProps) => {
    const { location } = props;
    const [type, setType] = useState<string>("all");
    const store = useStore();
    const classes = useStyles();
    const { getOrders, loading, error, orders } = store.orderStore;
    const {user} = store.authStore;

    useEffect(() => {
        const query = new URLSearchParams(location.search).get('type');
        
        if (!query) {
            setType("all");
        }

        if (query === "pending" || query === "declined" || query === "approved") {
            setType(query)
        }

        getOrders(user, type);
    }, [getOrders, user, location, type])

    return (
        <div>
            <Grid container direction="row" alignItems="center" className={classes.container}>
                <Grid item xs>
                    <Grid container direction="row">
                        <Grid item>
                            <Typography variant="h6" style={{fontWeight: 600}}>Orders</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                
                <Grid item>
                    <Grid item className={classes.orderSort}>
                        <Grid container direction="row" alignItems="center" justify="center" spacing={4} style={{display: "flex"}}>
                            <Grid item style={{cursor: "pointer"}}>
                                <Typography>
                                    <Link href="/orders" style={{textDecoration: "none", color: type === "all" ? "#0052CC" :  "inherit"}}>
                                        All orders
                                    </Link>
                                </Typography>
                            </Grid>
                            <Grid item style={{cursor: "pointer"}}>
                                <Typography>
                                    <Link 
                                        href="/orders?type=pending" 
                                        style={{textDecoration: "none", color: type === "pending" ? "#0052CC" : "inherit"}}>
                                        Pending
                                    </Link>
                                </Typography>
                            </Grid>
                            <Grid item style={{cursor: "pointer"}}>
                                <Typography>
                                    <Link 
                                        href="/orders?type=approved"
                                        style={{textDecoration: "none", color: type === "approved" ? "#0052CC":  "inherit"}}>
                                        Approved
                                    </Link>
                                </Typography>
                            </Grid>
                            <Grid item style={{cursor: "pointer"}}>
                                <Typography>
                                    <Link 
                                        href="/orders?type=declined"
                                        style={{textDecoration: "none", color: type === "declined" ? "#0052CC" : "inherit"}}>
                                        Declined
                                    </Link>   
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <div style={{marginTop: 50}}>
                { orders.length < 1 ? <Alert severity="info">
                    <span style={{textTransform: "capitalize"}}>{type} </span>Orders will appear here.
                </Alert> : 
                <Grid container direction="column" spacing={4}>
                    { orders.map((order: any, index: number) => {
                        return (
                            <Grid item style={{borderBottom: index === 0 ? "1px solid #EBECF0": ""}}> 
                                <Grid container direction="row" spacing={4}>
                                    <Grid item xs>
                                        <OrderLayout
                                            order={order}
                                        />  
                                    </Grid>
                                </Grid>             
                            </Grid>
                        )
                    }) }
                </Grid> }
                
            </div>
            
        </div>
    )
}


const useStyles = makeStyles((theme) => ({
    root: {
      boxShadow: "0 0 10px #ddd"
    },

    container: {
        [theme.breakpoints.down("md")]: {
            flexDirection: "column",
            alignItems: "unset",

            "& .MuiGrid-grid-xs-10": {
                maxWidth: "100%",
            }
        }
    },

    orderSort: {
        paddingRight: 20,
        [theme.breakpoints.down(1000)]: {
            display: "none"
        }
    },

    searchContainer: {
        [theme.breakpoints.down("md")]: {
            flexGrow: 1
        }
    },

    searchBar: {
        [theme.breakpoints.down(1000)]: {
            flexGrow: 1
         }
    },

    searchAndSort: {
        [theme.breakpoints.down(1000)]: {
            minWidth: "100%",
            margin: 0
        },

        [theme.breakpoints.down(800)]: {
            padding: 0
        }
    },

    filter: {
        display: "none",
        paddingRight: 16,
        [theme.breakpoints.down(1000)]: {
            display: "flex",
            flexGrow: 1
        },

        [theme.breakpoints.down(426)]: {
            paddingRight: 0,
            paddingBottom: 16
        },

    },

    filterSearch: {
        paddingLeft: 16,
        [theme.breakpoints.down("md")]: {
           flexGrow: 1
        }
    }
}));

export default withRouter(observer(Orders));
