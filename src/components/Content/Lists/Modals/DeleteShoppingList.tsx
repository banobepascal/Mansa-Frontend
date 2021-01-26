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


const DeleteShoppingList = (props: AppProps) => {
    const { closeModal } = props;
    const [disabled, setDisabled] = useState(true);
    const store = useStore();
    const {changeShoppingListName, shoppingListName, errorMessage, saveLoading, successMessage, shoppingListActive, deleteShoppingList} = store.listStore;
    const {user} = store.authStore;

    useEffect(() => {
        if (successMessage){
            setTimeout(() => {
                closeModal()
            }, 2000)
        }
    }, [successMessage, closeModal]);

    useEffect(() => {
        if (shoppingListName === shoppingListActive.title){
            setDisabled(false)
        }
    }, [shoppingListName, shoppingListActive]);

   
    return (
       <DeleteList
            title="Delete shopping list"
            value={shoppingListName}
            handleInputChange={changeShoppingListName}
            successMessage={successMessage}
            errorMessage={errorMessage}
            loading={saveLoading}
            handleDeleteList={() => deleteShoppingList(user.uid)}
            enabled={disabled}
            handleClose={closeModal}
            activeList={shoppingListActive.title}
       />
            
    )
}

export default observer(DeleteShoppingList)
