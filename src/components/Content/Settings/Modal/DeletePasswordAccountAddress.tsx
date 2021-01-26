import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useStore } from '../../../../store/useStore';
import SettingsDelete from '../Components/SettingsDelete';

interface AppProps {
    handleClose(): void;
}

const DeleteAddresses = (props: AppProps) => {
    const { handleClose} = props;
    const store = useStore();
    const {deletePasswordAccountAddress, deleteSuccessMessage, deleteErrorMessage, deleteLoading, updatePassword, resetMessages, getUserProfile} = store.settingsStore;
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
   
    return (
        <SettingsDelete
            title="Delete Address"
            loading={deleteLoading}
            successMessage={deleteSuccessMessage}
            errorMessage={deleteErrorMessage}
            password={true}
            updatePassword={updatePassword}
            handleClose={handleClose}
            handleDelete={() => deletePasswordAccountAddress(user)}
            subText="Confirm to delete your account addresses"
        />
    )
}

export default observer(DeleteAddresses)
