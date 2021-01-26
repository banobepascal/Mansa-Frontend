import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Avatar, Typography, List, ListItemText, 
    ListItem, ListItemIcon, Checkbox, ListItemAvatar } from '@material-ui/core';


interface AppProps {
    data?: Array<object>
}

export default function ItemLister(props: AppProps) {
    const classes = useStyles()
    
    return (
        <div>
            <Grid container direction="row" spacing={2} alignItems="center" justify="flex-end" className={classes.headerVX}>
                <Grid item>
                    <Typography variant="body2" style={{fontWeight: 600, width: "9rem"}}>
                        Available at location
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="body2" style={{fontWeight: 600, width: "9rem"}}>
                        Total available
                    </Typography>
                </Grid>
            </Grid>

            <div className={classes.allProducts}>
                { [1, 2, 3, 4, 5].map(() => {
                    return (
                        <List className={classes.listContainer}>
                            <ListItem className={classes.firstListItem}>
                                <ListItemIcon>
                                    <Checkbox
                                        edge="start"
                                        disableRipple
                                    />
                                </ListItemIcon>
                                <ListItemAvatar>
                                    <Avatar src="https://swoo.sh/2BljJ9z" />
                                </ListItemAvatar>
                                <ListItemText>
                                    <Typography variant="body2">
                                        Jordans
                                    </Typography>
                                </ListItemText>
                            </ListItem>

                            { [1, 2, 4, 5].map(() => {
                                return (
                                    <ListItem className={`${classes.nested}, ${classes.listItem}`}>
                                        <ListItemIcon>
                                            <Checkbox
                                                edge="start"
                                                disableRipple
                                            />
                                        </ListItemIcon>
                                        <ListItemText>
                                            <Grid container direction="row" spacing={1}>
                                                <Grid item>
                                                    <Typography variant="body2">M2</Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Typography variant="body2">Pink</Typography>
                                                </Grid>
                                            </Grid>
                                        </ListItemText>
                                        <ListItemText>
                                            <Typography align="center" variant="body2">21</Typography>
                                        </ListItemText>
                                        <ListItemText>
                                            <Typography align="center" variant="body2">23</Typography>
                                        </ListItemText>
                                    </ListItem>
                                )
                            }) }
                        </List>
                    )
                }) }
            </div>
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    listStyling: {
        '& .MuiSvgIcon-root': {
            color: "#8993A4",
        }
    },

    listItem: {
        borderTop: "1px solid #C1C7D0",
        cursor: "pointer",
        '&:hover': {
            backgroundColor: "#F4F5F7"
        },
    },

    nested: {
        marginLeft: theme.spacing(4),
    },

    allProducts: {
        height: 600,
        flex: "1 1 auto",
        overflowY: "auto"
    },

    listContainer: {
        borderBottom: "1px solid #C1C7D0",
        paddingBottom: 0,
        paddingTop: 0,
        '& .MuiListItem-root':{
            paddingTop: 4,
            paddingBottom: 4, 
        },

        '& .MuiList-padding': {
            paddingBottom: 0,
            paddingTop: 100
        }
    },

    firstListItem: {
        backgroundColor: "#EBECF0"
    },

    headerVX: {
        position: "sticky",
        top: 0,
        zIndex: 2,
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    }
}));
