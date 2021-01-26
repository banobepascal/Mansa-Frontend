import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Link } from '@material-ui/core';
import { footer, FooterProps, FooterListProps } from '../../data/data';


interface AppProps {
    user: any
}

const Footer = (props: AppProps) => {
    const classes = useStyles();

    return (
        <div style={{position: "relative", bottom: 0, width: "100%"}}>
            <Grid className={classes.root}>
                <Grid container direction="row" justify="center" spacing={10} className={classes.container}>
                    { footer.map((foot: FooterProps) => {
                        return (
                            <Grid item>
                                <Grid container direction="column">
                                    <Grid item>
                                        <Typography style={{fontWeight: 600}} variant="h6">{foot.label}</Typography>
                                    </Grid>

                                    <Grid item style={{marginTop: 10, lineHeight: 24}}>   
                                        { foot.list ? foot.list.map((listItem: FooterListProps) => {
                                            return (
                                            <Typography variant="body2" style={{color: "#8d9091", lineHeight: 2}}>
                                                <Link href={listItem.link} style={{color: "inherit"}}>
                                                    { listItem.name }
                                                </Link>
                                            </Typography>
                                            )
                                        }) : null }
                                    </Grid>
                                </Grid>
                            </Grid>
                        )
                    }) }
                </Grid>
            </Grid>

            <Grid className={classes.secondRoot}>
                <Typography align="center" variant="body2" style={{color: "#999"}}>Copyright © 2020 Mansa. All rights reserved.</Typography>
            </Grid>
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: "#15141b",
      marginTop: 40,
      paddingTop: 60,
      paddingBottom: 60,
      color: "#fff"
    },
    secondRoot: {
        backgroundColor: "#15141b",
        paddingTop: 5,
        paddingBottom: 5,
    },

    container: {
        [theme.breakpoints.down(800)]: {
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            padding: "0 60px"
        },

        [theme.breakpoints.down(560)]: {
            gridTemplateColumns: "1fr",
            textAlign: "center"
        }
    }
  }));

export default Footer;
