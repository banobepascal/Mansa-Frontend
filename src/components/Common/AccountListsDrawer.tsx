import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Typography, Link} from '@material-ui/core';
import { accountBtnDBDNavbar } from '../../data/category';
import DrawerTopBar from './DrawerTopBar';


interface AppProps {
    handleClose(): void;
    openSignin(value: string): void;
    user: any
}
 
const AccountListsDrawer = (props: AppProps) => {
    const { handleClose, openSignin} = props;

    return (
    
    <div>
    <DrawerTopBar handleClose={handleClose} openSignin={openSignin}/>
            <List>
                <ListItem button style={{paddingLeft: "36px"}}>
                    <ListItemText>
                        <Typography style={{fontWeight: 600}}>ACCOUNTS AND LISTS</Typography>
                    </ListItemText>
                </ListItem>
                 {accountBtnDBDNavbar.map((setting, index) => {
                        return (
                            <ListItem button style={{paddingLeft: "46px"}}>
                                <ListItemText>
                                    <Link style={{textDecoration: "none", color: "inherit"}} href={setting.link}>{setting.setting}</Link>
                                </ListItemText>
                            </ListItem>
                        )           
                })}      
            </List>
        </div>
    
  )
}


export default AccountListsDrawer;
