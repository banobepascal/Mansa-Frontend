import React, { useEffect } from 'react';
import { Grid, Typography, InputLabel, FormControl } from '@material-ui/core'
import CustomButton from '../../../Common/CustomButton'
import { Link, Email, Close } from '@material-ui/icons'
import { Alert } from '@material-ui/lab';
import CommonStyles from '../../../Common/CustomStyles';
import { Input, Button, Popover, CheckPicker } from 'rsuite';
import { observer } from 'mobx-react';
import AddToList from '../Components/AddToList';
import { useStore } from '../../../../store/useStore';

interface AppProps {
    closeModal(): void;
}


const AddToWishLists = (props: AppProps) => {
    const { closeModal } = props;
    const store = useStore();
    const {wishListsInProducts, errorMessage, saveLoading, successMessage, changeWishList, wishLists,  addToWishList } = store.productsStore;
    const {user} = store.authStore;

    useEffect(() => {
        if (successMessage){
            setTimeout(() => {
                closeModal()
            }, 2000)
        }
    }, [successMessage, closeModal]);

   
    return (
       <AddToList
            title="Add to wish list"
            successMessage={successMessage}
            errorMessage={errorMessage}
            loading={saveLoading}
            data={wishListsInProducts}
            value={wishLists}
            handleInputChange={changeWishList}
            handleClose={closeModal}
            handleAddToList={() => addToWishList(user.uid)}
       />
    )
}

export default observer(AddToWishLists)
