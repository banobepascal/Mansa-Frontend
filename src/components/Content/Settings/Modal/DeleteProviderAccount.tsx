import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useStore } from '../../../../store/useStore';
import SettingsDelete from '../Components/SettingsDelete';
import { useHistory } from 'react-router-dom';

interface AppProps {
    handleClose(): void;
}


const DeleteProviderAccount = (props: AppProps) => {
    let history = useHistory();
    const { handleClose} = props;
    const store = useStore();
    const {deleteProviderAccount, deleteSuccessMessage, deleteErrorMessage, deleteLoading, updatePassword, resetMessages, successfulDelete} = store.settingsStore;
    const {user} = store.authStore;

    useEffect(() => {
        resetMessages();
    }, [resetMessages]);

    useEffect(() => {
        if (deleteSuccessMessage || deleteErrorMessage) {
            setTimeout(() => {
                resetMessages();
            }, 4000);
        }
     }, [deleteSuccessMessage, deleteErrorMessage, resetMessages]);

     useEffect(() => {
        if (successfulDelete === true) {
            history.push("/");
        }
    });
   
    return (
        <SettingsDelete
            title="Delete Account"
            loading={deleteLoading}
            successMessage={deleteSuccessMessage}
            errorMessage={deleteErrorMessage}
            handleClose={handleClose}
            handleDelete={() => deleteProviderAccount(user)}
            subText="Once deleted, Account is not retrievable"
        />
    )
}

export default observer(DeleteProviderAccount)
