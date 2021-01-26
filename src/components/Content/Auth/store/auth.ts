import {action, observable} from "mobx";
import {uuid} from "uuidv4";
import firebase from "firebase/app";
import moment from 'moment';
import RootStore from "../../../../store/rootStore";
import { auth, firestore } from "../../../../config/firebase";
import { useReducer } from "react";
import { deleteCookie, getCookie } from "../../../../Utitlities/cookies";

// Create Auth store
export default class UsersStore {
    private rootStore: RootStore

    id = Date.now();
 
    @observable firstname: string = '';
    @observable lastname: string = '';
    @observable email: string = '';
    @observable password: string = '';
    @observable confirmPassword: string = '';
    @observable dateOfBirth: string = '';
    @observable gender: string = '';
    @observable isDone: boolean = false;
    @observable submit: boolean = false;
    @observable errorMessage: string = '';
    @observable successMessage: string = '';
    @observable loading: boolean = false;
    @observable user: any = {};
    @observable authToken: string = '';
    @observable modal: boolean = false; 
    @observable userAuth: any = {};
    @observable additionalData: any = {};
    @observable role: string = 'normal';
    @observable fullName: string = this.firstname + " " + this.lastname;
    @observable loggedIn: boolean = false;
    

    @action
    toggleIsDone = () => {
        this.isDone = !this.isDone
    }

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @action
    createUserProfileDocument = async (user: any) => {
    	if (!user) return;

        const userRef = await firestore.collection('mansa-users').doc(user.uid);

        const snapShot = await userRef.get();
        
        const {displayName, email, phoneNumber, photoURL, emailVerified, isAnonymous, metadata, tenantId, providerData} = user;
        const {lastSignInTime, creationTime} = metadata;
        const createdAt = new Date();
        
        const names = displayName ? displayName.split(" ") : "";
        
        try {
            const payload = {
                displayName: this.firstname && this.lastname ? this.firstname + " " + this.lastname : displayName,
                firstname: names.length > 0 ? names[0] : this.firstname ,
                lastname: names.length > 1 ? names[1] : this.lastname,
                email,
                photoURL,
                emailVerified,
                lastSignInTime,
                creationTime,
                tenantId,
                isAnonymous,
                createdAt,
                role: this.role,
                signUpMethod: providerData[0]?.providerId,
            }

            if (!snapShot.exists) {
                try {
                    await userRef.set(payload);
                } catch (error){
                    return error
                }
            }
    
        } catch (error){
            return error
        }
        
	}

    @action 
    signUp = async() => {
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

        if (this.password === '' || this.password.length < 1 || !this.password){
            this.loading = false;
            this.errorMessage = "Password is required";
            return false;
        }
        
        if (this.password !== this.confirmPassword) {
            this.loading = false;
            this.errorMessage = "Passwords don't match";
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
            const createdAt = new Date();
            const {user} = await auth.createUserWithEmailAndPassword(this.email, this.password);
			
            if (user) {
                // Persist user in users document in firestore
                const payload = {
                    firstname: this.firstname,
                    lastname: this.lastname,
                    email: this.email,
                    gender: this.gender,
                    role: this.role,
                    dateOfBirth: this.dateOfBirth,
                    creationTime: user.metadata.creationTime,
                    lastSignInTime: user.metadata.lastSignInTime,
                    phoneNumber: user.phoneNumber,
                    photoURL: user.photoURL,
                    emailVerified: user.emailVerified,
                    isAnonymous: user.isAnonymous,
                    displayName: this.firstname + " " + this.lastname,
                    tenantId: user.tenantId,
                    signUpMethod: user.providerData[0]?.providerId,
                    createdAt: createdAt,
                    defaultAddress: "",
                    secondAddress: "",
                    region: "",
                    townOrCity: "",
                    notification: false,
                    makeDefaultAddress: false,
                }
                
                await firestore.collection('mansa-users').doc(user.uid).set(payload);
                await user.updateProfile({displayName: this.firstname + " " + this.lastname});
                
                this.loading = false;     
                this.successMessage = "Successfully created account";
            }

        } catch (error) {
            this.loading = false;
            this.modal = true;
            switch (true){
                case error.code === "auth/email-already-in-use":
                    this.errorMessage = "Email already in use, try a different one"
                    break;
                case error.code === "auth/invalid-email":
                    this.errorMessage = "Please enter a valid email"
                    break;
                case error.code === "auth/operation-not-allowed":
                    this.errorMessage = "Operation not allowed, try again later"
                    break;
                case error.code === "auth/weak-password":
                    this.errorMessage = "Password is not strong enough, include number, uppercase and special character"
                    break;
                default:
                    this.errorMessage = "Server failed to respond, try again later"
                    break
            } 
        }
    }
    
    @action
    login = async() => {
        this.successMessage = '';
        this.errorMessage = '';

        if ((this.email === '' || this.email.length < 1 || !this.email) && (this.password === '' || this.password.length < 1 || !this.password)){
            this.loading = false;
            this.errorMessage = "Email and Password are required";
            return false;
        }

        if (this.email === '' || this.email.length < 1 || !this.email){
            this.loading = false;
            this.errorMessage = "Email is required";
            return false;
        }

        if (this.password === '' || this.password.length < 1 || !this.password){
            this.loading = false;
            this.errorMessage = "Password is required";
            return false;
        }

        if (this.email !== '' && this.email.length > 0 && this.password !== '' && this.password.length > 0){
            try {
                this.loading = true;

                const response = await auth.signInWithEmailAndPassword(this.email, this.password);
                if (response) {
                    this.successMessage = "Successfully logged in";
                    this.loading = false;
                }

            } catch (error) {
                this.loading = false;
                this.modal = true;
                switch (true){
                    case error.code === "auth/user-disabled":
                        this.errorMessage = "Failed to signup, account might be disabled"
                        break;
                    case error.code === "auth/invalid-email":
                        this.errorMessage = "Please enter a valid email"
                        break;
                    case error.code === "auth/user-not-found":
                        this.errorMessage = "User not found, signup now to login"
                        break;
                    case error.code === "auth/wrong-password":
                        this.errorMessage = "Wrong email or password"
                        break;
                    default:
                        this.errorMessage = "Server failed to respond, try again later"
                        break
                }     
            }
        }     
    }

    @action
    signOut = async () => {
		try {
            await auth.signOut();
            deleteCookie("user_details");
            this.gender = '';
            this.dateOfBirth = '';
               
		} catch (error) {
			return error
		}	
    }

    @action
    passwordReset = async () => {

        if (this.email === '' || this.email.length < 1 || !this.email){
            this.loading = false;
            this.errorMessage = "Email is required";
            return false;
        }

        if (this.email !== '' && this.email.length > 0){
            try {
                this.loading = true;
                const response = await auth.sendPasswordResetEmail(this.email);

                if (response !== null) {
                    this.successMessage = "Email sent";
                    this.loading = false;
                }

            } catch(error) {
                this.loading = false;
                this.modal = true;
                switch (true){
                    case error.code === "auth/invalid-email":
                        this.errorMessage = "Please enter a valid email"
                        break;
                    case error.code === "auth/invalid-continue-uri":
                        this.errorMessage = "Invalid domain"
                        break;
                    case error.code === "auth/missing-continue-uri ":
                        this.errorMessage = "Missing domain name"
                        break;
                    default:
                        this.errorMessage = "Server failed to respond, try again later"
                        break
                }  
            }
        }
    }

    @action
    setModal = (modal: boolean) => {
		if(this.modal === false) {
			this.successMessage = "";
			this.errorMessage = "";
		}
       this.modal = modal;
       
    }

    @action
    googleSignIn = async () => {
		try {
		     const provider =  new firebase.auth.GoogleAuthProvider();
		     provider.setCustomParameters({ prompt: "select_account" });
             await firebase.auth().signInWithPopup(provider);
		     
		     this.successMessage = "Successfully logged in";
       } catch (error) {
		    switch (true){
		        case error.code === "auth/email-already-in-use":
		            this.errorMessage = "Email already in use, try a different one"
		            break;
		        case error.code === "auth/invalid-email":
		            this.errorMessage = "Please enter a valid email"
		            break;
		        case error.code === "auth/operation-not-allowed":
		            this.errorMessage = "Operation not allowed, try again later"
		            break;
		        case error.code === "auth/weak-password":
		            this.errorMessage = "Password is not strong enough, include number, uppercase and special character"
		            break;
		        default:
		            this.errorMessage = "Server failed to respond, try again later"
		            break
		        } 
       	  }
    }

    @action 
    setUser = (user: any) => {
        this.user = user
    }

    @action 
    setLoggedIn = (value: boolean) => {
        this.loggedIn = value
    }

    @action
    setToken = (token: string) => {
        this.authToken = token
    }

    @action
    updateFirstname = (firstname: string) => {
    	this.errorMessage = "";
        this.firstname = firstname.trim();
    }

    @action
    updateLastname = (lastname: string) => {
    	this.errorMessage = "";
        this.lastname = lastname.trim();
    }

    @action
    updateEmail = (email: string) => {
    	this.errorMessage = "";
        this.email = email.trim();
    }

    @action
    updatePassword = (password: string) => {
    	this.errorMessage = "";
        this.password = password;
    }

    @action
    updateConfirmPassword = (confirmPassword: string) => {
    	this.errorMessage = "";
        this.confirmPassword = confirmPassword;
    }

    @action
    updateDOB = (dateOfBirth: string) => {
    	this.errorMessage = "";
        this.dateOfBirth = dateOfBirth;
    }

    @action 
    updateGender = (gender: string) => {
    	this.errorMessage = "";
        this.gender = gender;
    }

    @action 
    removeMessage = (value: string) => {
    	this.errorMessage = value;
    	this.successMessage = value;
    }
    
}
