import React from 'react'
import { Grid, Tooltip, Typography } from '@material-ui/core'
import { Help } from '@material-ui/icons'
import { cartMetrics } from '../../data/data'


interface AppProps {
    subtotal: string | number;
    shipping: string | number;
    taxes: string | number;
    total: string | number;
}

const CartMetrics = (props: AppProps) => {
    const { subtotal, shipping, taxes, total }  = props;

    return (
        <Grid container direction="column" spacing={2}>
            { cartMetrics.map((metric) => {
                return (
                    <Grid item>           
                        <Grid container direction="row" alignItems="center" spacing={1}>
                            <Grid item xs>
                                <Grid container direction="row">
                                    <Grid item>
                                        <Typography variant="body2">{metric.title}</Typography>
                                    </Grid>

                                    <Grid item>
                                        <Tooltip title={metric.description} aria-label={metric.description}>
                                            <Help fontSize="small" style={{cursor: "pointer", fontSize: 14 }} />
                                        </Tooltip>
                                    </Grid>
                                </Grid>     
                            </Grid>

                            <Grid item>
                                <Typography variant="body2">
                                    {
                                        metric.id === "subtotal" ? subtotal : 
                                        metric.id === "shipping" ? shipping :
                                        metric.id === "taxes" ? taxes : 0
                                    }
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid> 
                )
            }) }
            <Grid item style={{borderTop: "1px solid #EBECF0", borderBottom: "1px solid #EBECF0"}}>
                <Grid container direction="row">
                    <Grid item xs>
                        <Typography variant="body2" style={{fontWeight: 600}}>Total</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="body2" style={{fontWeight: 600}}>{total}</Typography>
                    </Grid>
                </Grid>
            </Grid> 
        </Grid>
    )
}

export default CartMetrics
