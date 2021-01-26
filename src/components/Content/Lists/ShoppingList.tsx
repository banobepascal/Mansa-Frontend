import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import { Grid, Typography, ListItem, ListItemText, List, Avatar, Link } from '@material-ui/core';
import ProductContainer from '../../Common/Product/ProductContainer';
import FilterTopBar from '../../Common/FilterTopBar';
import CustomButton from '../../Common/CustomButton';
import { Share, MoreHoriz, Add } from '@material-ui/icons';
import CustomizedDialogs from '../../Common/Modal';
import InviteOthers from './Modals/InviteOthers';
import CreateList from './Modals/CreateShoppingList';
import CommonStyles from '../../Common/CustomStyles';
import DrawerTopBar from '../../Common/DrawerTopBar';
import { observer } from 'mobx-react';
import { useStore } from '../../../store/useStore';
import { Whisper, Button, Popover, Icon, Loader } from 'rsuite';
import {deleteListActions} from '../../../data/category';
import DeleteList from './Modals/DeleteShoppingList';
import CustomModal from '../../Common/CustomModal';
import CreateShoppingList from './Modals/CreateShoppingList';
import DeleteShoppingList from './Modals/DeleteShoppingList';
import ColumnLayoutButtons from '../../Common/Product/Layout.tsx/ColumnLayoutButtons';
// import { Link, withRouter } from 'react-router-dom';


interface AppProps {
    window?(): any;
    openSignin(value: string): void;
}

const ShoppingList = (props: AppProps) => {
    const classes = useStyles();
    const commonStyles = CommonStyles();
    const {window, openSignin} = props
    const [dialog, setDialog] = useState<string>("");
    const [cartText, setCartText] = useState<boolean>(false);
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = useState(false);
    const store = useStore();
    const {setModal, modal, showShoppingList, shoppingLists, shoppingListItems, showItemsInShoppingList, shoppingListActive, removeItemFromShoppingList} = store.listStore;
    const {addToCart, itemsToCart, removeItemFromCart} = store.cartStore;
    const {user} = store.authStore;

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const container = window !== undefined ? () => window().document.body : undefined;

    const openModal = (dialog: string) => {
        setModal(true)
        setDialog(dialog)
    }

    const closeModal = () => {
        setModal(false);
    }

    useEffect(() => {
        shoppingListItems.map(product => {
            const existingCartItem = itemsToCart.find(
                cartItemToAdd => cartItemToAdd.value === product.id
            );
    
            if (existingCartItem){
                setCartText(true)
            }
        })

    }, [itemsToCart, shoppingListItems, setCartText]); 

    useEffect(() => {
        showItemsInShoppingList(user.uid);
        showShoppingList(user.uid);
    }, [showShoppingList, showItemsInShoppingList, user])
    
    
    return (
        <div className={classes.root}>
           
                <div className={commonStyles.drawer}>
                    <div>
                        <Hidden smUp implementation="css">
                        <Drawer
                            container={container}
                            variant="temporary"
                            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                            open={mobileOpen}
                            onClose={handleDrawerToggle}
                            classes={{
                            paper: commonStyles.drawerPaper,
                            }}
                            ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                            }}
                        >
                            <div>
                                <div>
                                    <DrawerTopBar handleClose={handleDrawerToggle} openSignin={openSignin}/>
                                </div>
                                <div className={commonStyles.drawerPadding}>
                                    {shoppingLists.map((list, index) => {
                                        return (
                                            <Link href={`/shoppinglist/${list.id}`} style={{color: "inherit", textDecoration: "none"}}>
                                                <ListItem button style={{backgroundColor: index === 0 ? "#F5F5F5" : "#fff", color: index === 0 ? "#0052CC" : "#000"}}>
                                                    <ListItemText>
                                                        <Typography>{list.title}</Typography>
                                                    </ListItemText>
                                                </ListItem>
                                            </Link>
                                        )
                                    })}
                                </div>
                            </div>
                        </Drawer>
                        </Hidden>
                    </div>

                    <div>
                        <Hidden xsDown implementation="css">
                        <Drawer
                            classes={{
                            paper: commonStyles.drawerPaper,
                            }}
                            variant="permanent"
                            open
                        >
                            <div>
                                <div>
                                    <DrawerTopBar handleClose={handleDrawerToggle} openSignin={openSignin}/>
                                </div>
                                <div className={commonStyles.drawerPadding}>
                                    {shoppingLists.map((list, index) => {
                                        return (
                                            <Link href={`/shoppinglist/${list.id}`} style={{color: "inherit", textDecoration: "none"}}>
                                                <ListItem button style={{backgroundColor: index === 0 ? "#F5F5F5" : "#fff", color: index === 0 ? "#0052CC" : "#000"}}>
                                                    <ListItemText>
                                                        <Typography>{list.title}</Typography>
                                                    </ListItemText>
                                                </ListItem>
                                            </Link>
                                        )
                                    })}
                                </div>
                            </div>
                        </Drawer>
                        </Hidden>
                    </div>
                </div>
            <Grid>
                <Grid container direction="column" className={classes.wishListContainer}>
                    <Grid item>
                        <div style={{backgroundColor: "#e5e5e5"}} className={classes.wishListHeader}>
                            <Grid container direction="row" alignItems="center">
                                <Grid item xs>
                                    <Grid container direction="row">
                                        <Grid item xs={2} style={{cursor: "pointer", backgroundColor: "#fff", padding: "1rem"}}>
                                            <Typography align="center">Lists</Typography>
                                        </Grid>
                                        <Grid item xs={4} style={{padding: "1rem"}}> 
                                            <Link href="/wishlist" style={{cursor: "pointer", textDecoration: "none"}}>Wish List</Link>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Grid container direction="row" spacing={2} style={{paddingRight: 20}}>
                                        <Grid item>
                                            <Typography variant="body2">
                                                <Link style={{cursor: "pointer", textDecoration: "none"}} onClick={() => openModal("createList")}>Create a List</Link>  
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="body2">
                                                <Link style={{cursor: "pointer", textDecoration: "none"}}>List help</Link>     
                                            </Typography>
                                        </Grid>
                                    </Grid>              
                                </Grid>
                            </Grid>         
                        </div>
                    </Grid>

                    <Grid item>
                        <Grid container direction="row" spacing={4} className={classes.listContainer}>
                            <Grid item xs={3}>
                                <List component="nav">
                                {shoppingLists.map((list, index) => {
                                        return (
                                            <Link href={`/shoppinglist/${list.id}`} style={{color: "inherit", textDecoration: "none"}}>
                                                <ListItem button style={{backgroundColor: index === 0 ? "#F5F5F5" : "#fff", color: index === 0 ? "#0052CC" : "#000"}}>
                                                    <ListItemText>
                                                        <Typography style={{textTransform: "capitalize"}}>{list.title}</Typography>
                                                    </ListItemText>
                                                </ListItem>
                                            </Link>
                                        )
                                    })}
                                </List>
                            </Grid>

                            <Grid item xs={9}>
                                <Grid container direction="column" spacing={2}>
                                    <Grid item style={{borderBottom: "1px solid #EBECF0"}}>
                                        <Grid container direction="column" spacing={2}>
                                            <Grid item style={{padding: 20}}>
                                                <Grid container direction="row">
                                                    <Grid item xs>
                                                        <Grid container direction="row" alignItems="center" spacing={2}>
                                                            <Grid item>
                                                                <Typography variant="h5" style={{fontWeight: 600, textTransform: "capitalize"}}>
                                                                   {shoppingListActive.title ? shoppingListActive.title : "Shopping List"}
                                                                </Typography>
                                                            </Grid>

                                                            {/* <Grid item >
                                                                <Typography variant="body2">Private</Typography>
                                                            </Grid> */}
                                                        </Grid>
                                                    </Grid>

                                                    <Grid item>
                                                        <Grid container direction="row" alignItems="center" spacing={2}>
                                                            {/* <Grid item className={classes.shareBtn}>
                                                                <CustomButton text="Send to other" classes={commonStyles.btnBlack} handleClick={() => openModal("inviteOthers")} StartIcon={Share} />
                                                            </Grid> */}

                                                            <Grid item>
                                                                <Button onClick={() => openModal("delete list")} className={commonStyles.btnTransparentBlack}>
                                                                    Delete list
                                                                </Button>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            {/* <Grid item container direction="row" justify="space-between" style={{paddingBottom: 20}}> */}
                                                {/* <Grid item className={classes.moreLists}>
                                                    <CustomButton text="More lists" StartIcon={Add} handleClick={handleDrawerToggle} classes={commonStyles().btnBlack}/>
                                                </Grid> */}
                                                {/* <Grid item>
                                                    <CustomButton text="Invite friends" StartIcon={Add} handleClick={() => openModal("inviteOthers")} classes={commonStyles().btnBlue} style={{backgroundColor: "#36B37E", borderColor: "#36B37E"}} />
                                                </Grid> */}
                                            {/* </Grid> */}
                                        </Grid>
                                    </Grid>

                                    <Grid item style={{marginTop: 20}}>
                                        <FilterTopBar type="shoplist" />
                                    </Grid>
                                    
                                    
                                    <Grid item>
                                    {shoppingListItems.length < 1 ? 
                                        <Grid item style={{marginTop: 20}}>
                                            <Typography variant="body2"> <strong>{shoppingListActive.title}</strong> has no items. Browse items and add to list</Typography>
                                        </Grid>
                                    :
                                        <Grid container direction="column" spacing={6}>
                                            { shoppingListItems.map((product, index) => {
                                                return (
                                                    <Grid item style={{borderBottom: index === 0 ? "1px solid #EBECF0": ""}}> 
                                                        <Grid container direction="row" spacing={4} className={classes.productList}>
                                                            <Grid item xs>
                                                                <ProductContainer 
                                                                    type="column"
                                                                    product={product}
                                                                />  
                                                            </Grid>
                                                            <Grid item>
                                                                <Grid container direction="column" spacing={1}>
                                                                    {/* <Grid item>
                                                                        <Typography variant="body2">Item added March 9, 2020</Typography>
                                                                    </Grid> */}

                                                                    <Grid item>
                                                                        <Grid container direction="row" spacing={2}>
                                                                            <Grid item>
                                                                                <ColumnLayoutButtons id={product.id}/>
                                                                            </Grid>
                                                                            <Grid item>
                                                                                <Button style={{backgroundColor: "#DE350B", borderColor: "#DE350B", color: "#fff"}} onClick={() => removeItemFromShoppingList(user.uid, product.id)}>Delete</Button>
                                                                            </Grid>
                                                                        </Grid> 
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>             
                                                    </Grid>
                                                )
                                            }) }
                                        </Grid>
                                        }
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <CustomModal modal={modal} type="noTitle">
                { dialog === "inviteOthers" ? 
                    <InviteOthers closeModal={closeModal} />
                : dialog === "delete list" ?
                    <DeleteShoppingList closeModal={closeModal} />
                :   <CreateShoppingList closeModal={closeModal} />  } 
            </CustomModal >
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        paddingBottom: 100, 
        paddingTop: 50,

        [theme.breakpoints.down(768)]: {
            padding: 0
        }
    },

    shareBtn: {
        [theme.breakpoints.down(768)]: {
            display: "none"
        }
    },

    moreLists: {
        display: "none",
        [theme.breakpoints.down(768)]: {
            display: "flex"
        }
    },

    wishListContainer: {
        border: "1px solid #EBECF0",
        [theme.breakpoints.down(768)]: {
            border: "none"
        }
    },

    wishListHeader: {
        [theme.breakpoints.down(768)]: {
            display: "none"
        }
    },

    productList: {
        [theme.breakpoints.down(800)]: {
            flexDirection: "column"
        }
    },

    listContainer: {
        padding: "0 1rem",
        paddingBottom: "2rem",
        [theme.breakpoints.down(768)]: {
            "& .MuiGrid-grid-xs-3": {
                display: "none",
            },

            "& .MuiGrid-grid-xs-9": {
                minWidth: "100%"
            }
        },

        [theme.breakpoints.down(450)]: {
            padding: 0,
        }
    }
}));

export default observer(ShoppingList);
