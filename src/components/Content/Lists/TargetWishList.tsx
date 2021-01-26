import React, { useState, useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';
import WishList from './WishList';
import { observer } from 'mobx-react';
import { useStore } from '../../../store/useStore';
import { Loader } from 'rsuite';
import { Typography, Grid } from '@material-ui/core';


interface AppProps{
    openSignin(value: string): void;
}


const TargetWishList = (props: AppProps) => {
    const {openSignin} = props
    const store = useStore();
    const { loading, errorMessage, wishListItems, showItemsInWishList} = store.listStore;
    const {user} = store.authStore;

    useEffect(() => {
        showItemsInWishList(user.uid);
    }, [showItemsInWishList, user]);

    return (
        <div>
            {loading === true ?
                <Loader center size="md" /> 
            : errorMessage ?
            <Grid item style={{textAlign: "center"}}>
                <Typography>{errorMessage}</Typography>
            </Grid>
            :
           <WishList openSignin={openSignin}/>
            }
        </div>
    )
}


export default observer(TargetWishList);
