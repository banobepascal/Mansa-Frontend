import React, { useState, useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';
import ShoppingList from './ShoppingList';
import { observer } from 'mobx-react';
import { useStore } from '../../../store/useStore';
import { Loader } from 'rsuite';
import { Typography, Grid } from '@material-ui/core';


interface AppProps{
    openSignin(value: string): void;
}


const TargetShoppingList = (props: AppProps) => {
    const {openSignin} = props
    const store = useStore();
    const { loading, errorMessage, shoppingListItems, showItemsInShoppingList} = store.listStore;
    const {user} = store.authStore;

    useEffect(() => {
        showItemsInShoppingList(user.uid);
    }, [showItemsInShoppingList, user]);

    return (
        <div>
            {loading === true ?
                <Loader center size="md" /> 
            : errorMessage ?
            <Grid item style={{textAlign: "center"}}>
                <Typography>{errorMessage}</Typography>
            </Grid>
            :
           <ShoppingList openSignin={openSignin}/>
            }
        </div>
    )
}


export default observer(TargetShoppingList);
