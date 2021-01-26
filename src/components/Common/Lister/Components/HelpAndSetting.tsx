import React, { useEffect, useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Language, Flag } from '@material-ui/icons';
import Typography from '@material-ui/core/Typography';
import { Divider} from '@material-ui/core';
import { useStore } from '../../../../store/useStore';
import { observer } from 'mobx-react';
import CustomizedDialogs from '../../Modal';
import Signup from '../../../Content/Auth/Signup';
import Login from '../../../Content/Auth/Login';
import ResetPassword from '../../../Content/Auth/ResetPassword';

interface AppProps {
    openSignin(value: string): void;
}

const HelpAndSetting = (props: AppProps) => {
    const {openSignin} = props;
    const store = useStore();
    const {signOut, authToken} = store.authStore;
    const {user} = store.authStore

    return (
        <div>
            <Divider />
            <List>
                <ListItem button style={{paddingLeft: "36px"}}>
                    <ListItemText>
                        <Typography variant="body2" style={{fontWeight: 600}}>HELP & SETTINGS</Typography>
                    </ListItemText>
                </ListItem>

                <ListItem button style={{paddingLeft: "36px"}}>
                    <ListItemText>
                        <Typography variant="body2" style={{fontWeight: 600}}>Your account</Typography>
                    </ListItemText>
                </ListItem>


                <ListItem button style={{paddingLeft: "36px"}}>
                    <ListItemIcon style={{minWidth: "30px"}}>
                        <Flag fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>
                        <Typography variant="body2">Uganda</Typography>
                    </ListItemText>
                </ListItem>

                <ListItem button style={{paddingLeft: "36px"}}>
                    { user.uid ? 
                        <ListItemText>
                            <Typography variant="body2" style={{cursor: "pointer"}} onClick={signOut}>Sign out</Typography>
                        </ListItemText>
                        :
                        <ListItemText>
                            <Typography variant="body2" style={{cursor: "pointer"}} onClick={() => openSignin("login")}>Sign in</Typography>
                        </ListItemText> 
                    }
                </ListItem>
            </List>
            
        </div>
    )
}

export default observer(HelpAndSetting)
