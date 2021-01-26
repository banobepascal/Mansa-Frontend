import React, { useEffect } from 'react';
import { useStore } from '../../../../store/useStore';
import { observer } from 'mobx-react';
import AddToList from '../Components/AddToList';

interface AppProps {
    closeModal(): void;
}


const AddToShoppingList = (props: AppProps) => {
    const { closeModal } = props;
    const store = useStore();
    const {shoppingListsInProducts, errorMessage, saveLoading, successMessage, changeShoppingList, shoppingLists,  addToShoppingList } = store.productsStore;
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
            title="Add to shopping list"
            successMessage={successMessage}
            errorMessage={errorMessage}
            loading={saveLoading}
            data={shoppingListsInProducts}
            value={shoppingLists}
            handleInputChange={changeShoppingList}
            handleClose={closeModal}
            handleAddToList={() => addToShoppingList(user.uid)}
        />
    )
}

export default observer(AddToShoppingList)
