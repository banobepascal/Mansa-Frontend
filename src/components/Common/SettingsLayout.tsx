import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import SettingSideBar from '../Common/SettingSideBar';
import CustomButton from './CustomButton';
import CommonStyles from './CustomStyles';
import { MoreHoriz } from '@material-ui/icons';
import DrawerTopBar from './DrawerTopBar';
import { Button, Icon } from 'rsuite';


interface AppProps{
    window?(): any;
    active?: string;
    children: any;
    openSignin(value: string): void;
}

const SettingsLayout = (props: AppProps) => {
    const classes = useStyles();
    const commonClass = CommonStyles();
    const { children, window, openSignin } = props;
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const container = window !== undefined ? () => window().document.body : undefined;


    return (
        <div>
             <div className={classes.drawer}>
                    <div>
                        <Hidden smUp implementation="css">
                        <Drawer
                            container={container}
                            variant="temporary"
                            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                            open={mobileOpen}
                            onClose={handleDrawerToggle}
                            classes={{
                            paper: classes.drawerPaper,
                            }}
                            ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                            }}
                        >
                            <div>
                                <div>
                                    <DrawerTopBar handleClose={handleDrawerToggle} openSignin={openSignin}/>
                                </div>
                                <div className={classes.filterStyles}>
                                    <SettingSideBar />
                                </div>
                            </div>
                        </Drawer>
                        </Hidden>
                    </div>

                    <div>
                        <Hidden xsDown implementation="css">
                        <Drawer
                            classes={{
                            paper: classes.drawerPaper,
                            }}
                            variant="permanent"
                            open
                        >
                            <div>
                                <div>
                                    <DrawerTopBar handleClose={handleDrawerToggle} openSignin={openSignin}/>
                                </div>
                                <div className={classes.filterStyles}>
                                    <SettingSideBar />
                                </div>
                            </div>
                        </Drawer>
                        </Hidden>
                    </div>
                </div>
            <div>
                <Grid container direction="row" justify="space-between">
                    <Grid item>
                        <Typography variant="h6" style={{fontWeight: 600}}>Settings</Typography>
                    </Grid>

                    <Grid item className={classes.mobileSettings}>
                        <Button classes={commonClass.btnTransparentBlack} onClick={handleDrawerToggle} style={{background: "transparent", color: "#15141b"}}>
                            <Icon icon="more" />{"  "}
                            More settings
                        </Button>
                    </Grid>
                </Grid>
            </div>
            <Grid container direction="row" spacing={4}>
                <Grid item xs={3} className={classes.sideBar}>
                    <SettingSideBar />
                </Grid>

                <Grid item xs={9} className={classes.settingContent}>
                    {children}
                </Grid>
            </Grid>
        </div>
    )
}

const useStyles = makeStyles((theme) => ({

    title: {
        [theme.breakpoints.down(900)]: {
            display: "none"
        }
    },

    sideBar: {
        [theme.breakpoints.down(900)]: {
            display: "none"
        }
    },

    settingContent: {
        [theme.breakpoints.down(900)]: {
            minWidth: "100%"
        }
    },

    mobileSettings: {
        display: "none",
        [theme.breakpoints.down(900)]: {
            display: "flex"
        }
    },

    filterStyles: {
        padding: "1rem 36px",
    },

    drawerPaper: {
        width: 365,
        border: "none",
        backgroundColor: '#fff',
    },

    drawer: {
        display: 'none', 
        [theme.breakpoints.up('sm')]: {
            width: 240,
            flexShrink: 0, 
        },
        [theme.breakpoints.down('md')]: {  
            display: 'none', 
        }
    },
}));

export default SettingsLayout
