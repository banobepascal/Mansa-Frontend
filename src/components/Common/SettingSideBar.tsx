import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter, Link } from 'react-router-dom';
import {RouteComponentProps} from "react-router";
import { settings, SettingProps, providerSettings } from '../../data/category';
import { List, ListItem, ListItemIcon, ListItemText, Typography, Grid } from '@material-ui/core';
import { observer } from 'mobx-react';
import { auth } from '../../config/firebase';
import { useStore } from '../../store/useStore';


interface AppProps extends RouteComponentProps {
}

const SettingSideBar = (props: AppProps) => {
    const classes = useStyles();
    const [active, setActive] = useState<string | undefined>(undefined);
    const [userSettings, setUserSettings] = useState(providerSettings);
    const store = useStore();
    const {user} = store.authStore;

    useEffect(() => {
        if (user.providerId === "password") {
            setUserSettings(settings);
        }
    }, [setUserSettings, user]);

    useEffect(() => {
        setActive(props.location.pathname)
    }, [props.location.pathname])

    return (
        <div>
             <Grid item className={classes.title}>
                <Typography variant="h6" style={{fontWeight: 600}}>Settings</Typography>
            </Grid>

            <List>
                { userSettings.map((setting: SettingProps, index) => {
                    return (
                        <Link to={setting.link} style={{color: "inherit", textDecoration: "none"}}>
                            <ListItem button style={{
                                    paddingLeft: "36px",
                                    backgroundColor: setting.link === active ? "#F5F5F5" : "",
                                    color: setting.link === active ? "#0052CC" : "",
                                }}>
                                <ListItemIcon style={{minWidth: "30px"}}>
                                    <setting.icon 
                                    fontSize="small"
                                    style={{
                                        color: setting.link === active ? "#0052CC" : "",
                                        fontWeight: setting.link === active ? 600 : 400
                                    }}
                                    />
                                </ListItemIcon>
                                <ListItemText>
                                    <Typography 
                                        variant="body2"
                                        style={{
                                            color: setting.link === active ? "#0052CC" : "",
                                            fontWeight: setting.link === active ? 600 : 400
                                        }}
                                    >
                                        {setting.setting}
                                    </Typography>
                                </ListItemText>
                            </ListItem>
                        </Link>
                    )
                }) }     
            </List>
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    // necessary for content to be below app bar
    avatar: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },

    title: {
        display: "none",
        [theme.breakpoints.down(900)]: {
            display: "flex"
        }
    },
}));

export default withRouter(observer(SettingSideBar));
