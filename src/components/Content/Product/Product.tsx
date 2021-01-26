/* eslint-disable no-restricted-globals */
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Box, Link, IconButton } from '@material-ui/core'
import { Chat } from '@material-ui/icons';
import Carousel from '../../Common/Carousel';
import CommonStyles from '../../Common/CustomStyles';
import { useStore } from '../../../store/useStore';
import { observer } from 'mobx-react';
import { Loader, Button, Icon, Popover, Whisper, Rate } from 'rsuite';
import VariantImage from '../../Common/Product/VariantImage';
import {productActions} from '../../../data/category';
import AddToShoppingList from './Modals/AddToShoppingList';
import CustomModal from '../../Common/CustomModal';
import ReactMarkdownWithHtml from 'react-markdown/with-html';
import AddToWishList from './Modals/AddToWishList';
import RateProduct from './Modals/RateProduct';
import CustomizedDialogs from '../../Common/Modal';
import Login from '../Auth/Login';
import Signup from '../Auth/Signup';
import ResetPassword from '../Auth/ResetPassword';
import { Rating } from '@material-ui/lab';

const Product = () => {
    const classes = useStyles();
    const commonStyles = CommonStyles();
    const [modal, setModal] = useState<boolean>(false);
    const [signinModal, setSigninModal] = useState<boolean>(false);
    const [dialog, setDialog] = useState<string>("");
    const [cartText, setCartText] = useState<boolean>(false);
    const [favoriteText, setFavoriteText] = useState<boolean>(false);
    const store = useStore();
    const {product, showProduct, loading,
        errorMessage, productImages, similarProducts,
        showShoppingListsInProducts, showWishListsInProducts,
        resetChanges} = store.productsStore;
    const {addToCart, itemsToCart, removeItemFromCart} = store.cartStore;
    const {addToFavorites, saveLoading, favoritesInCookie,
         removeItemFromFavorites, getFavoritesInCookie} = store.favoriteStore;
    const {user} = store.authStore;
    
    const rating = Math.round(product.totalRatings / product.totalRaters);

    const openSignin = (value: string) => {
        setDialog(value);
        setSigninModal(true);
    }

    const closeSignIn = () => {
        setSigninModal(false);
    }
    
    const openModal = (value: string) => {
        setDialog(value);
        setModal(true)
    }

    const closeModal = () => {
        resetChanges();
        setModal(false);
    }

    const handleAddToCart = () => {
        setCartText(true);
        addToCart(product.id)
    };

    const handleRemoveFromCart = () => {
        setCartText(false);
        removeItemFromCart(product.id)
    };

    const handleAddToFavorites = () => {
        setFavoriteText(!favoriteText);
        addToFavorites(product.id)
    }

    const handleAddRemoveFromFavorites = () => {
        setFavoriteText(!favoriteText);
        removeItemFromFavorites(user.uid,  product.id);
    }

    useEffect(() => {
       showProduct();
       showShoppingListsInProducts(user.uid);
       showWishListsInProducts(user.uid);
    }, [showProduct, showShoppingListsInProducts, showWishListsInProducts, user]);

    useEffect(() => {
        getFavoritesInCookie(user.uid);
    }, [getFavoritesInCookie, user])

    useEffect(() => {
        const existingCartItem = itemsToCart.find(
            cartItemToAdd => cartItemToAdd.value === product.id
        );

        if (existingCartItem){
            setCartText(true)
        }

    }, [itemsToCart, product, setCartText]);

    useEffect(() => {
        const existingFavorite = favoritesInCookie.find(
            favoriteItemToAdd => favoriteItemToAdd.productId === product.id
        );

        if (existingFavorite){
            setFavoriteText(true)
        }

    }, [favoritesInCookie, product, setFavoriteText, favoriteText]);

    const MoreActions = (
        <Popover>
          <Grid container direction="column" spacing={1}>
            {productActions.map((action) => {
              return (
                <Grid item>
                  <Typography variant="body2" className="hoverTxtPopover">
                      <Link onClick={() => openModal(action.action)} style={{textDecoration: "none", cursor: "pointer"}}>
                        {action.action}           
                      </Link>
                  </Typography>
                </Grid>
              )
            })}
          </Grid>
        </Popover>
      );

    return (
        <div>
            { loading === true ? 
                <Loader center size="md" />     
            : errorMessage ?
                <Grid item style={{textAlign: "center"}}>
                    <Typography>{errorMessage}</Typography>
                </Grid> 
            :
            <Grid>
                <Grid container direction="column" spacing={8} wrap="nowrap">
                    <Grid item>
                        <Grid item container direction="row" spacing={8} className={classes.container}>
                            <Grid item xs={6}>
                                <Grid container direction="column" style={{flexWrap: "nowrap"}}>
                                    <Grid item className={classes.mainProductImage}>
                                    <div style={{maxWidth: "100%", display: "flex", alignItems: "center"}}>
                                        <img src={productImages[0]} alt="" style={{width: "100%"}} />
                                    </div>
                                    </Grid>

                                    <Grid item style={{marginTop: "1rem"}} className={classes.variantContainer}>
                                        <Grid container direction="row" spacing={2} wrap="nowrap" style={{paddingBottom: "0.5rem"}}>
                                            { productImages.map((image: string) => {
                                                return (
                                                    <Grid item className={classes.variantImages} style={{cursor: "pointer"}}>
                                                        <VariantImage image={image} />
                                                    </Grid>
                                                )
                                            }) }  
                                        </Grid>
                                    </Grid>
                                </Grid>   
                            </Grid>

                            <Grid item xs={6}>
                                <Grid container direction="column" spacing={2} wrap="nowrap">
                                    <Grid item>
                                        <Grid container direction="row" spacing={2} justify="space-between">
                                            <Grid item>
                                                {parseInt(product.quantityAvailable) > 0 ? 
                                                    <Typography variant="body2">{product.quantityAvailable} left in stock</Typography>
                                                :   <Button className={commonStyles.btnBlue} style={{ background: "#0052CC", color: "#fff"}}>Out of Stock</Button>
                                                }
                                            </Grid>
                                            <Grid item>
                                                <Whisper placement="bottom" trigger="hover" speaker={MoreActions} enterable>
                                                    <Button className={commonStyles.btnTransparentBlack} style={{background: "transparent", color: "#000"}}>
                                                        <Icon icon='more' />{' '}More
                                                    </Button>
                                                </Whisper>
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    <Grid item>
                                        <Grid item>
                                            <Typography variant="body2" style={{fontSize: "1.2rem", textTransform: "capitalize"}}>{product.title}</Typography>
                                        </Grid>

                                        <Grid container direction="row" alignItems="center" spacing={2} style={{paddingTop: 20}}>
                                            <Grid item>
                                                <Box component="small" borderColor="transparent">
                                                    <Rating size="small" name="pristine" readOnly value={rating} />
                                                </Box>
                                            </Grid>

                                            {product.totalRatings < 1 ? 
                                                <Grid item>
                                                    <Typography variant="body2" style={{color: "#637381"}}>No reviews</Typography>
                                                </Grid>
                                            : null}
                                            
                                        </Grid>    
                                    </Grid>

                                    <Grid item>
                                        <Typography variant="h5" style={{fontWeight: 600, fontSize: "1rem"}}>UGX {product.price}</Typography>
                                    </Grid>

                                    <Grid item> 
                                        <Grid container direction="row" alignItems="center" spacing={4}>
                                            <Grid item>
                                            {cartText === true ?
                                                <Button onClick={handleRemoveFromCart} className={commonStyles.cartBtnClicked} style={{  backgroundColor: "#15141b", color: "#fff"}}>Remove from cart</Button>
                                                :
                                                <Button onClick={handleAddToCart} className={commonStyles.cartBtn} style={{backgroundColor: "transparent", color: "#15141b"}}>Add to cart</Button>
                                            }
                                            </Grid>
                                            {user.uid ? 
                                                <Grid item>
                                                {favoriteText === true ?
                                                    <IconButton onClick={handleAddRemoveFromFavorites} style={{cursor: "pointer", padding: 0}}>
                                                        <Icon icon="heart" style={{fontSize: "0.9em", color: "#15141b"}}/>
                                                    </IconButton> 
                                                    : 
                                                    <IconButton onClick={handleAddToFavorites} style={{cursor: "pointer", padding: 0}}>
                                                        <Icon icon="heart-o" style={{fontSize: "0.9em", color: "#15141b"}}/>
                                                    </IconButton>
                                                }
                                                </Grid>
                                            :   
                                                <Grid item>
                                                    <IconButton onClick={() => openSignin("login")} style={{cursor: "pointer", padding: 0}}>
                                                        <Icon icon="heart-o" style={{fontSize: "0.9em", color: "#15141b"}}/>
                                                    </IconButton>
                                                </Grid> 
                                            }
                                        </Grid>
                                    </Grid>
 
                                    <Grid item>
                                        <div style={{width: "100%"}}>
                                            <Typography variant="body2" style={{fontWeight: 600, fontSize: "1.2rem"}}>Product details</Typography>
                                            <ReactMarkdownWithHtml children={product.description} allowDangerousHtml/>
                                        </div>      
                                    </Grid>

                                    
                                    <Grid item>
                                        <Grid container direction="row">
                                            <Grid item>
                                                <Chat />
                                            </Grid>

                                            <Grid item>
                                                <Typography variant="body2" style={{fontSize: 14}}>
                                                    Need help? 
                                                    <Link style={{color: "inherit", cursor: "pointer"}}> Chat now</Link>
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* <Grid item>
                        <ComparisonTable />
                    </Grid> */}

                    <Grid item style={{marginBottom: 40}}>
                        <Carousel label="Similar deals" products={similarProducts} />
                    </Grid>
                </Grid>
            </Grid>
            }

            <CustomModal modal={modal} handleClose={closeModal}  type="noTitle">
                { dialog === "Add to shopping list" ? 
                    <AddToShoppingList closeModal={closeModal} />
                :dialog === "Add to wish list" ? 
                    <AddToWishList closeModal={closeModal} />
                : dialog === "Add rating" ? 
                    <RateProduct handleClose={closeModal} />
                :null}
            </CustomModal>  

            <CustomizedDialogs type="noTitle" modal={signinModal}>
                { dialog === "login" ? 
                    <Login closeModal={closeSignIn} openSignin={openSignin} /> 
                : dialog === "signup" ?
                    <Signup closeModal={closeSignIn} openSignin={openSignin} />
                : dialog === "forgot password" ?
                    <ResetPassword closeModal={closeSignIn} openSignin={openSignin}/>
                : null
                }
            </CustomizedDialogs>                      
        </div>
    )
}



const useStyles = makeStyles((theme) => ({
    mainProductImage: {
      width: "100%"
    },

    container: {
        [theme.breakpoints.down('sm')]: {
            flexDirection: "column",

            "& .MuiGrid-grid-xs-6": {
                maxWidth: "100%"
            }
        }
    },

    variantContainer: {
       overflowX: "auto",
       overflowY: "hidden",
       "& ::-webkit-scrollbar": {
            background: "transparent"
        }
    },

    variantImages: {
        width: 100,
        minWidth: 100,
    },
}));


export default observer(Product);

