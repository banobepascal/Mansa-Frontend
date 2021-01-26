import React, { useEffect } from 'react';
import { useStore } from '../../../../store/useStore';
import { observer } from 'mobx-react';
import CreateList from '../Components/CreateList';

interface AppProps {
    closeModal(): void;
}


const CreateWishList = (props: AppProps) => {
    const { closeModal} = props;
    const store = useStore();
    const {changeWishListName, createWishList, errorMessage, saveLoading, successMessage, wishListName} = store.listStore;

    useEffect(() => {
        if (successMessage){
            setTimeout(() => {
                closeModal()
            }, 2000);
        }
    }, [successMessage, closeModal]);

   
    return (
       <CreateList
            title="Create a new wish list"
            handleClose={closeModal}
            successMessage={successMessage}
            errorMessage={errorMessage}
            value={wishListName}
            handleInputChange={changeWishListName}
            handleCreate={createWishList}
            loading={saveLoading}
       />
    )
}

export default observer(CreateWishList)
