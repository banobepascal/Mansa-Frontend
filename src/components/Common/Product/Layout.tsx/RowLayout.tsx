import React, { useState, useEffect } from 'react';
import ProductImage from '../ProductImage';
import { Grid, Typography, Box, Link, makeStyles, IconButton } from '@material-ui/core';
import { Button, Icon, Rate } from 'rsuite';
import { ProductLayoutProps } from '../../../../data/data';
import { useStore } from '../../../../store/useStore';
import { observer } from 'mobx-react';
import CommonStyles from '../../CustomStyles';
import CustomizedDialogs from '../../Modal';
import Login from '../../../Content/Auth/Login';
import Signup from '../../../Content/Auth/Signup';
import ResetPassword from '../../../Content/Auth/ResetPassword';
import { Rating } from '@material-ui/lab';


const RowLayout = (props: any) => {
    const {product} = props;
    const {
        quantityAvailable, id, totalRatings,
        totalRaters, productImages, price, title } = product
    const classes = useStyles();
    const commonStyles = CommonStyles();
    const [modalSiginin, setModalSiginin] = useState<boolean>(false);
    const [dialog, setDialog] = useState<string>("");
    const [cartText, setCartText] = useState<boolean>(false);
    const [favoriteText, setFavoriteText] = useState<boolean>(false);
    const store = useStore();
    const {addToCart, itemsToCart, removeItemFromCart} = store.cartStore;
    const {addToFavorites, saveLoading, favoritesInCookie, removeItemFromFavorites, getFavoritesInCookie} = store.favoriteStore;
    const {user, setModal, removeMessage, successMessage, loggedIn} = store.authStore;

    const openSignin = (value: string) => {
        setDialog(value)
        setModalSiginin(true)
        removeMessage('');
    }

    const closeModal = () => {
        setModalSiginin(false)
        removeMessage('');
    }

    const handleAddToCart = () => {
        setCartText(true);
        addToCart(id);
    };

    const handleRemoveFromCart = () => {
        setCartText(false);
        removeItemFromCart(id);
    };

    const handleAddToFavorites = () => {
        setFavoriteText(!favoriteText);
        addToFavorites(id);
    }

    const handleAddRemoveFromFavorites = () => {
        setFavoriteText(!favoriteText);
        removeItemFromFavorites(user.uid, id);
    }

    useEffect(() => {
        getFavoritesInCookie(user.uid);
    }, [getFavoritesInCookie, user]);

    useEffect(() => {
        if(successMessage){
            setTimeout(() => {
                closeModal();
            }, 2000)
        }
     });
    
    useEffect(() => {
        const existingCartItem = itemsToCart.find(
            cartItemToAdd => cartItemToAdd.value === id
        );

        if (existingCartItem){
            setCartText(true)
        }


    }, [itemsToCart, id, setCartText]);

    useEffect(() => {
    const existingFavorite = favoritesInCookie.find(
        favoriteItemToAdd => favoriteItemToAdd.productId === id
    );

    if (existingFavorite){
        setFavoriteText(true)
    }

    }, [favoritesInCookie, id, setFavoriteText, favoriteText]);

    return (
        <div>
            <Link href={`/product/${id}`} style={{textDecoration: "none", color: "#000"}}>
                <div>
                    <div className={classes.imgContainer}>
                        <img  src={productImages[0]} alt="" className={classes.img} />
                    </div>    
                </div>

                <Grid>
                    <Grid container direction="column" style={{minWidth: 0, overflow: "hidden"}}>
                        <Grid item style={{minWidth: 0, overflow: "hidden", marginTop: 16}}>
                            <Typography align="left" style={{fontSize: 14, textTransform: "capitalize", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden"}}>{title}</Typography>
                        </Grid>

                        <Grid item container direction="row" justify="flex-start">
                            <Box component="small" borderColor="transparent">
                            <Rating size="small" name="pristine" readOnly value={Math.round(totalRatings / totalRaters)} />
                            </Box>
                        </Grid>

                        <Grid item>
                            <Typography align="left" style={{fontSize: 13, fontWeight: "bold"}}>UGX {price}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Link>
            <Grid container style={{marginTop: 10, display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                <div>
                    {cartText === true ?
                        <Button onClick={handleRemoveFromCart} className={commonStyles.cartBtnClicked} style={{  backgroundColor: "#15141b", color: "#fff"}}>Remove from cart</Button>
                        :
                        <Button onClick={handleAddToCart} className={commonStyles.cartBtn}  style={{backgroundColor: "transparent", color: "#15141b"}}>Add to cart</Button>
                    }
                </div>

                {user.uid || loggedIn === true ? 
                    <div className={classes.favoriteIcon}>
                        {favoriteText === true ?
                            <IconButton onClick={handleAddRemoveFromFavorites} style={{cursor: "pointer", padding: 0}}>
                                <Icon icon="heart" style={{fontSize: "0.9em", color: "#15141b"}}/>
                            </IconButton> 
                            : 
                            <IconButton onClick={handleAddToFavorites} style={{cursor: "pointer", padding: 0}}>
                                <Icon icon="heart-o" style={{fontSize: "0.9em"}}/>
                            </IconButton>
                        }
                    </div>
                : 
                    <div className={classes.favoriteIcon}>
                        <IconButton onClick={() => openSignin("login")} style={{cursor: "pointer", padding: 0}}>
                            <Icon icon="heart-o" style={{fontSize: "0.9em"}}/>
                        </IconButton>
                    </div>
                }
            </Grid>

            <CustomizedDialogs type="noTitle" modal={modalSiginin}>
                { dialog === "login" ? 
                    <Login closeModal={closeModal} openSignin={openSignin} /> 
                : dialog === "signup" ?
                    <Signup closeModal={closeModal} openSignin={openSignin} />
                : dialog === "forgot password" ?
                    <ResetPassword closeModal={closeModal} openSignin={openSignin}/>
                : null
                }
            </CustomizedDialogs>
        </div>
    )
}

const useStyles = makeStyles((theme) => ({

    favoriteIcon: {
        [theme.breakpoints.down(700)]: {
          display: "none" 
        },
    },

    img: {
        width: "100%", 
        maxHeight: 208,
        [theme.breakpoints.down(500)]: {
            minHeight: 168, 
            maxHeight: 168, 
        },

        
        [theme.breakpoints.up(2000)]: {
            minHeight: 300, 
            maxHeight: 300, 
        },
    },
 
    imgContainer: {
        maxWidth: "100%", 
        minHeight: 208, 
        maxHeight: 208, 
        display: "flex", 
        alignItems: "center",
        [theme.breakpoints.down(500)]: {
            maxHeight: 168, 
            minHeight: 168, 
        },
        [theme.breakpoints.up(2000)]: {
            maxHeight: 300,
        },
    }
}));

export default observer(RowLayout);
