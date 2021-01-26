import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useStore } from '../../../../store/useStore';
import SettingsDelete from '../Components/SettingsDelete';
import { useHistory } from 'react-router-dom';

interface AppProps {
    handleClose(): void;
}


const DeleteProviderAccountAddress = (props: AppProps) => {
    let history = useHistory();
    const { handleClose} = props;
    const store = useStore();
    const {deleteProviderAccountAddress, deleteSuccessMessage, deleteErrorMessage, deleteLoading, getUserProfile, resetMessages, successfulDelete} = store.settingsStore;
    const {user} = store.authStore;

    useEffect(() => {
        resetMessages();
    }, [resetMessages]);

    useEffect(() => {
        if (deleteSuccessMessage) {
           getUserProfile(user.uid)
        }
     }, [deleteSuccessMessage, getUserProfile, user]);

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
            title="Delete Address"
            loading={deleteLoading}
            successMessage={deleteSuccessMessage}
            errorMessage={deleteErrorMessage}
            handleClose={handleClose}
            handleDelete={() => deleteProviderAccountAddress(user)}
            subText="Confirm to delete your account addresses"
        />
    )
}

export default observer(DeleteProviderAccountAddress)
