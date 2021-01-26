import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import { services } from '../../../../data/data';
import { Cached } from '@material-ui/icons';


const Services = () => {
    const classes = useStyles();

    return (
        <div>
            <Grid>
                <Grid container direction="row" alignItems="center" spacing={4} className={classes.container}>
                    { services.map((service) => {
                        return (
                            <Grid item xs={4}>
                                <Grid className={classes.service} container direction="row" alignItems="center" spacing={2}>
                                    <Grid item>
                                        <Cached style={{fontSize: 36}} />
                                    </Grid>
    
                                    <Grid item>
                                        <Grid container direction="column">
                                            <Grid item>
                                                <Typography variant="body2" style={{fontWeight: 600}}>{service.name}</Typography>
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="body2" style={{color: "#454F5B", fontSize: 12}}>{service.description}</Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        )
                    }) }                  
                </Grid>
            </Grid>
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    container: {
        [theme.breakpoints.down('sm')]: {
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            
            "& .MuiGrid-grid-xs-4": {
                minWidth: "100%"
            },
        },
        [theme.breakpoints.down(600)]: {
            gridTemplateColumns: "1fr",
        }
    },

    service: {
        backgroundColor: "#F5F5F5",
        padding: 10,
        cursor: "pointer",
        flexWrap: "nowrap"
    }
}));

export default Services
