import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@material-ui/core'
import CustomButton from '../../../Common/CustomButton'
import { Link, Email, Close } from '@material-ui/icons'
import { Alert } from '@material-ui/lab';
import CommonStyles from '../../../Common/CustomStyles';
import { useStore } from '../../../../store/useStore';
import { Input, Button, Popover } from 'rsuite';
import { observer } from 'mobx-react';
import DeleteList from '../Components/DeleteList';

interface AppProps {
    closeModal(): void;
}


const DeleteWishList = (props: AppProps) => {
    const { closeModal } = props;
    const [disabled, setDisabled] = useState(true);
    const store = useStore();
    const {changeWishListName, wishListName, errorMessage, saveLoading, successMessage, wishListActive, deleteWishList} = store.listStore;
    const {user} = store.authStore;

    useEffect(() => {
        if (successMessage){
            setTimeout(() => {
                closeModal()
            }, 2000)
        }
    }, [successMessage, closeModal]);

    useEffect(() => {
        if (wishListName === wishListActive.title){
            setDisabled(false)
        }
    }, [wishListName, wishListActive]);

   
    return (
       <DeleteList
            title="Delete shopping list"
            value={wishListName}
            handleInputChange={changeWishListName}
            successMessage={successMessage}
            errorMessage={errorMessage}
            loading={saveLoading}
            handleDeleteList={() => deleteWishList(user.uid)}
            enabled={disabled}
            handleClose={closeModal}
            activeList={wishListActive.title}
       />
            
    )
}

export default observer(DeleteWishList)
