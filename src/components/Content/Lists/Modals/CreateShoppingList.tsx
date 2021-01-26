import React, { useEffect } from 'react';
import { Grid, Typography } from '@material-ui/core'
import CustomButton from '../../../Common/CustomButton'
import { Link, Email, Close } from '@material-ui/icons'
import { Alert } from '@material-ui/lab';
import CommonStyles from '../../../Common/CustomStyles';
import { useStore } from '../../../../store/useStore';
import { Input, Button, Popover } from 'rsuite';
import { observer } from 'mobx-react';
import CreateList from '../Components/CreateList';

interface AppProps {
    closeModal(): void;
}


const CreateShoppingList = (props: AppProps) => {
    const { closeModal } = props;
    const store = useStore();
    const {changeShoppingListName, shoppingListName, createShoppingList, errorMessage, saveLoading, successMessage} = store.listStore;

    useEffect(() => {
        if (successMessage){
            setTimeout(() => {
                closeModal()
            }, 2000)
        }
    }, [successMessage, closeModal]);

   
    return (
        <CreateList
            title="Create a new Shopping list"
            handleClose={closeModal}
            successMessage={successMessage}
            errorMessage={errorMessage}
            value={shoppingListName}
            handleInputChange={changeShoppingListName}
            handleCreate={createShoppingList}
            loading={saveLoading}
       />
    )
}

export default observer(CreateShoppingList)
