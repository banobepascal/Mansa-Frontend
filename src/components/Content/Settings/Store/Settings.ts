import {action, observable} from "mobx";
import {uuid} from "uuidv4";
import firebase from "firebase/app";
import moment from 'moment';
import RootStore from "../../../../store/rootStore";
import { auth, firestore } from "../../../../config/firebase";
import { useReducer } from "react";
import { uploadToFirebase } from "../../../../Utitlities/upload";
import { deleteCookie } from "../../../../Utitlities/cookies";

// Create Auth store
export default class SettingsStore {
    private rootStore: RootStore

    id = Date.now();
 
    @observable dataUrl: any = '';
    @observable firstname: string = '';
    @observable lastname: string = '';
    @observable email: string = '';
    @observable password: string = '';
    @observable newPassword: string = '';
    @observable confirmPassword: string = '';
    @observable dateOfBirth: string = new Date().toDateString();
    @observable townOrCity: string = '';
    @observable makeDefaultAddress: boolean = false;
    @observable defaultAddress: string = '';
    @observable secondAddress: string = '';
    @observable region: string = '';
    @observable gender: string = '';
    @observable errorMessage: string = '';
    @observable successMessage: string = '';
    @observable phoneNumber: string = "";
    @observable loading: boolean = false;
    @observable user: any = {};
    @observable imageUrl: string = "";
    @observable modal: boolean = false; 
    @observable checked: boolean = false;
    @observable userProfile: any = [];
    @observable pageLoad: boolean = false;
    @observable pageLoadError: string = "";
    @observable saveLoading: boolean = false;
    @observable cancelUpdate: boolean = false;
    @observable passwordSuccess: boolean = false;
    @observable deleteLoading: boolean = false;
    @observable deleteErrorMessage: string = "";
    @observable deleteSuccessMessage: string = "";
    @observable successfulDelete: boolean = false;



    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @action
    getUserProfile = async (id: any) => {
        if (id) {
            try {
                this.pageLoad = true
                const userRef = await firestore.collection('mansa-users').doc(id);
                const snapShot = await userRef.get();
                const data = snapShot.data();
                this.userProfile = data;
                this.pageLoad = false;
                this.cancelUpdate = false;
                if (data) {
                    this.firstname = data.firstname;
                    this.lastname =  data.lastname;
                    this.email = data.email;
                    this.gender = data.gender;
                    this.dateOfBirth = data.dateOfBirth;
                    this.phoneNumber = data.phoneNumber;
                    this.defaultAddress = data.defaultAddress;
                    this.region = data.region;
                    this.townOrCity = data.townOrCity;
                    this.checked = data.notification;
                    this.makeDefaultAddress = data.makeDefaultAddress;
                }

            } catch(error) {
                this.pageLoad = false;
                switch (true){
                    case error.code === "unavailable":
                        this.pageLoadError = "Looks like you are offline"
                        break;
                    case error.code === "auth/requires-recent-login":
                        this.pageLoadError = "Operation requires a recent login. Login again to continue"
                        break;
                    default:
                        this.pageLoadError = "Server failed to respond, try again later"
                        break
                } 
            }
        }
       
    }

    @action
    reAuthenticate = async(user: any) => {
        if(user) {
            try {
                const credential = firebase.auth.EmailAuthProvider.credential(
                        user.email,
                        this.password
                    );
                     
                    await auth.currentUser?.reauthenticateWithCredential(credential);
                    this.passwordSuccess = true
            } catch (error) {
                this.loading = false;
                this.passwordSuccess = false;
                switch (true){
                    case error.code === "auth/wrong-password":
                        this.errorMessage = "Please enter your correct current password"
                        break;
                    case error.code === "auth/operation-not-allowed":
                        this.errorMessage = "Operation not allowed, try again later"
                        break;
                    default:
                        this.errorMessage = "Server failed to respond, try again later"
                        break
                } 
            }
        }
    }

    @action 
    updateProfile = async(user: any) => {
        this.successMessage = '';
        this.errorMessage = '';

        if ((this.firstname === '' || this.firstname.length < 1 || !this.firstname) && (this.lastname === '' || this.lastname.length < 1 || !this.lastname)){
            this.loading = false;
            this.errorMessage = "firstname, lastname are required";
            return false;
        }

        if (this.email === '' || this.email.length < 1 || !this.email){
            this.loading = false;
            this.errorMessage = "Email is required";
            return false;
        }

        const dob = moment(this.dateOfBirth, 'DD-MM-YYYY').isValid();

        if (dob === false){
            this.loading = false;
            this.errorMessage = "Date of birth format incorrect";
            return false;
        }

        if (this.gender === '' || this.gender.length < 1 || !this.gender){
            this.loading = false;
            this.errorMessage = "Please set gender";
            return false;
        }

        try {
            this.loading = true;
            const updatedAt = new Date();

            if (user) {
                if (this.dataUrl) {
                    this.imageUrl = await uploadToFirebase(this.dataUrl);
                }
                
                const payload = {
                    firstname: this.firstname,
                    lastname: this.lastname,
                    email: this.email,
                    gender: this.gender,
                    dateOfBirth: this.dateOfBirth,
                    photoURL: this.imageUrl ? this.imageUrl : this.userProfile.photoURL,
                    displayName: this.firstname + " " + this.lastname,
                    defaultAddress: this.defaultAddress,
                    region: this.region,
                    townOrCity: this.townOrCity,
                    updatedAt,
                }

                if (this.phoneNumber) {
                    await firestore.collection('mansa-users').doc(auth.currentUser?.uid).update({phoneNumber: this.phoneNumber});
                }
                
                await auth.currentUser?.updateEmail(this.email);
                await auth.currentUser?.updateProfile(payload);
                await firestore.collection('mansa-users').doc(auth.currentUser?.uid).update(payload);
                this.loading = false;     
                this.successMessage = "Successfully update account";
                this.password = "";
            }

        } catch (error) {
            this.loading = false;
            switch (true){
                case error.code === "auth/invalid-email":
                    this.errorMessage = "Please enter a valid email"
                    break;
                case error.code === "auth/operation-not-allowed":
                    this.errorMessage = "Operation not allowed, try again later"
                    break;
                case error.code === "auth/requires-recent-login":
                    this.errorMessage = "Operation requires a recent login. Login again to continue"
                    break;
                default:
                    this.errorMessage = "Server failed to respond, try again later"
                    break
            } 
        }
    }

    @action 
    updateAccountPassword = async(user: any) => {
        this.successMessage = '';
        this.errorMessage = '';

        if (this.password === '' || this.password.length < 1 || !this.password){
            this.loading = false;
            this.errorMessage = "Password is required";
            return false;
        }

        if (this.newPassword === '' || this.newPassword.length < 1 || !this.password){
            this.loading = false;
            this.errorMessage = "New Password is required";
            return false;
        }
        if (this.newPassword !== this.confirmPassword) {
            this.loading = false;
            this.errorMessage = "New Confirmed Passwords don't match";
            return false;
        }

        try {
            this.loading = true;
            await this.reAuthenticate(user);

            if (user && this.passwordSuccess === true) {
                await auth.currentUser?.updatePassword(this.newPassword);
                this.loading = false;     
                this.successMessage = "Successfully updated Password";
                this.password = "";
                this.newPassword = "";
                this.confirmPassword = "";
            }

        } catch (error) {
            this.loading = false;
            switch (true){
                case error.code === "auth/operation-not-allowed":
                    this.errorMessage = "Operation not allowed, try again later"
                    break;
                case error.code === "auth/weak-password":
                    this.errorMessage = "New Password is not strong enough, include number, uppercase and special character"
                    break;
                case error.code === "auth/requires-recent-login":
                    this.errorMessage = "Operation requires a recent login. Login again to continue"
                    break;
                default:
                    this.errorMessage = "Server failed to respond, try again later"
                    break
            } 
        }
    }

    @action
    deletePasswordAccountAddress = async (user: any) => {
        this.successMessage = '';
        this.errorMessage = '';
        this.deleteErrorMessage = "";
        this.deleteSuccessMessage = ""

        if (this.password === '' || this.password.length < 1 || !this.password){
            this.loading = false;
            this.deleteErrorMessage = "Password is required";
            return false;
        }

        try {
            this.deleteLoading = true;
            const updatedAt = new Date();
            await this.reAuthenticate(user);

            if (user && this.passwordSuccess === true) {
                const payload = {
                    makeDefaultAddress: false,
                    defaultAddress: "",
                    secondAddress: "",
                    region: "",
                    townOrCity: "",
                    updatedAt,
                }

                await firestore.collection('mansa-users').doc(auth.currentUser?.uid).update(payload);
                this.deleteLoading = false;     
                this.deleteSuccessMessage = "Successfully deleted address";
                this.modal = false;
                this.password = "";
            }

        } catch (error) {
            
            this.deleteLoading = false;
            this.modal = false;
            switch (true){
                case error.code === "auth/operation-not-allowed":
                    this.deleteErrorMessage = "Operation not allowed, try again later"
                    break;
                default:
                    this.deleteErrorMessage = "Server failed to respond, try again later"
                    break
            } 
        }
    }

    @action
    deleteProviderAccountAddress = async (user: any) => {
        this.successMessage = '';
        this.errorMessage = '';
        this.deleteErrorMessage = "";
        this.deleteSuccessMessage = ""

        try {
            this.deleteLoading = true;
            const updatedAt = new Date();

            if (user) {
                const payload = {
                    makeDefaultAddress: false,
                    defaultAddress: "",
                    secondAddress: "",
                    region: "",
                    townOrCity: "",
                    updatedAt,
                }

                await firestore.collection('mansa-users').doc(user.uid).update(payload);
                this.deleteLoading = false;     
                this.deleteSuccessMessage = "Successfully update account";
                this.modal = false;
                this.password = "";
            }

        } catch (error) {
            this.deleteLoading = false;
            this.modal = false;
            switch (true){
                case error.code === "auth/operation-not-allowed":
                    this.deleteErrorMessage = "Operation not allowed, try again later"
                    break;
                default:
                    this.deleteErrorMessage = "Server failed to respond, try again later"
                    break
            } 
        }
    }

    @action
    setCancelUpdate = () => {
        this.cancelUpdate = true;
    }

    @action
    resetMessages = () => {
        this.errorMessage = "";
        this.successMessage = "";
        this.deleteErrorMessage = "";
        this.deleteSuccessMessage = "";
    }

    @action
    changeDataUrl = (value: any) => {
        this.dataUrl = value;
    }

    @action
    updateFirstname = (firstname: string) => {
    	this.resetMessages();
        this.firstname = firstname.trim();
    }

    @action
    updateLastname = (lastname: string) => {
    	this.resetMessages();
        this.lastname = lastname.trim();
    }

    @action
    updateEmail = (email: string) => {
    	this.resetMessages();
        this.email = email.trim();
    }

    @action
    updateMobileNumber = (value: any) => {
    	this.resetMessages();
        this.phoneNumber = value;
    }

    @action
    updatePassword = (password: string) => {
    	this.resetMessages();
        this.password = password;
    }

    @action
    updateNewPassword = (password: string) => {
    	this.resetMessages();
        this.newPassword = password;
    }


    @action
    updateConfirmPassword = (password: string) => {
    	this.resetMessages();
        this.confirmPassword = password;
    }

    @action
    updateDOB = (dateOfBirth: string) => {
    	this.resetMessages();
        this.dateOfBirth = dateOfBirth;
    }

    @action 
    updateGender = (gender: string) => {
    	this.resetMessages();
        this.gender = gender;
    }

    @action 
    updateDefaultAddress = (value: string) => {
    	this.resetMessages();
        this.defaultAddress = value;
    }

    @action 
    updateSecondAddress = (value: string) => {
    	this.resetMessages();
        this.secondAddress = value;
    }

    @action 
    updateTownOrCity = (value: string) => {
    	this.resetMessages();
        this.townOrCity = value;
    }

    @action 
    updateRegion = (region: string) => {
    	this.resetMessages();
        this.region = region;
    }

    @action 
    removeMessage = (value: string) => {
    	this.errorMessage = value;
    	this.successMessage = value;
    }

    @action
    setModal = (modal: boolean) => {
		if(this.modal === false) {
			this.resetMessages();
		}
       this.modal = modal;
    }

    @action
    deletePasswordAccount = async (user: any) => {
        this.deleteErrorMessage = "";
        this.deleteSuccessMessage = ""

        if (this.password === '' || this.password.length < 1 || !this.password){
            this.loading = false;
            this.deleteErrorMessage = "Password is required";
            return false;
        }

        try {
            this.deleteLoading = true;
            await this.reAuthenticate(user);

            if (user && this.passwordSuccess === true) {
                await firestore.collection("mansa-users").doc(user.uid).delete();
                await auth.currentUser?.delete();
                await auth.signOut();
                deleteCookie("user_details");
                this.deleteSuccessMessage = "Successfully deleted account";
                this.successfulDelete = true;
                this.modal = false;
                this.deleteLoading = false
            }
        } catch (error) {
            this.modal = false;
            this.deleteLoading = false;
            this.successfulDelete = false;
             switch (true){
                case error.code === "auth/operation-not-allowed":
                    this.deleteErrorMessage = "Operation not allowed, try again later"
                    break;
                default:
                    this.deleteErrorMessage = "Server failed to respond, try again later"
                    break
            } 
        }
    }

    @action
    deleteProviderAccount = async (user: any) => {
        this.deleteErrorMessage = "";
        this.deleteSuccessMessage = ""

        try {
            this.deleteLoading = true;

            await firestore.collection("mansa-users").doc(user.uid).delete();
            await auth.currentUser?.delete();
            await auth.signOut();
            deleteCookie("user_details");
            this.deleteSuccessMessage = "Successfully deleted account";
            this.successfulDelete = true;
            this.modal = false;
            this.deleteLoading = false;

        } catch (error) {
            this.modal = false;
            this.deleteLoading = false;
            this.successfulDelete = false;
             switch (true){
                case error.code === "auth/operation-not-allowed":
                    this.deleteErrorMessage = "Operation not allowed, try again later"
                    break;
                default:
                    this.deleteErrorMessage = "Server failed to respond, try again later"
                    break
            } 
        }
    }

    @action
    setChecked = () => {
        this.resetMessages();
        this.checked = !this.checked;
    }

    @action
    setMakeDefaultAddress = () => {
        this.resetMessages();
        this.makeDefaultAddress = !this.makeDefaultAddress;
    }

    @action
    updateAddressess = async () => {
        this.successMessage = '';
        this.errorMessage = '';

        if ((this.defaultAddress === '' || this.defaultAddress.length < 1 || !this.defaultAddress)){
            this.loading = false;
            this.errorMessage = "Address 1 is required";
            return false;
        }

        try {
            this.loading = true;
            const updatedAt = new Date();
            const user = this.rootStore.authStore.user;

            if (user) {
                const payload = {
                    makeDefaultAddress: this.makeDefaultAddress,
                    defaultAddress: this.defaultAddress,
                    secondAddress: this.secondAddress,
                    region: this.region,
                    townOrCity: this.townOrCity,
                    updatedAt,
                }

                await firestore.collection('mansa-users').doc(auth.currentUser?.uid).update(payload);
                this.loading = false;     
                this.successMessage = "Successfully update address";
            }

        } catch (error) {
            this.loading = false;
            switch (true){
                case error.code === "auth/invalid-email":
                    this.errorMessage = "Please enter a valid email"
                    break;
                case error.code === "auth/operation-not-allowed":
                    this.errorMessage = "Operation not allowed, try again later"
                    break;
                case error.code === "auth/requires-recent-login":
                    this.errorMessage = "Operation requires a recent login. Login again to continue"
                    break;
                default:
                    this.errorMessage = "Server failed to respond, try again later"
                    break
            } 
        }
    }

    @action
    subscribeToNotifications = async (user: any) => {
        try {
            this.loading = true;
            await firestore.collection('mansa-users').doc(user.uid).update({notification: this.checked});
            this.loading = false;     
            this.successMessage = "Successfully updated notification status";
        } catch (error) {
            this.loading = false;
            this.errorMessage = "Server failed to respond, try again later"
        }
    }
    
}
