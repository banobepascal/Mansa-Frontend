/* eslint-disable no-restricted-globals */
import {action, observable} from "mobx";
import {uuid} from "uuidv4";
import firebase from "firebase/app";
import RootStore from "../../../../store/rootStore";
import { auth, firestore } from "../../../../config/firebase";
import { persist } from "mobx-persist";


export default class ListStore {
    private rootStore: RootStore;

    id = uuid();
    @observable shoppingList: any[] = [];
    @observable shoppingLists: any[] = [];
    @observable products: any[] = [];
    @observable shoppingListsInProducts: any[] = [];
    @observable shoppingListName: string = '';
    @observable shoppingListActive: any = []; 
    @observable shoppingListItems: any[] = [];
    @observable wishLists: any[] = [];
    @observable wishListName: string = '';
    @observable wishListArray: any = []; 
    @observable wishListItems: any[] = []; 
    @observable wishListActive: any = []; 
    @observable saveLoading: boolean = false;
    @observable errorMessage: string = ''; 
    @observable successMessage: string = '';
    @observable index: any = '';
    @observable loading: boolean = true;
    @observable modal: boolean = false;

    constructor(rootStore: RootStore){
        this.rootStore = rootStore;
    }

    @action
    changeShoppingListName = async (value: string) => {
        this.errorMessage = '';
        this.successMessage = '';
        this.shoppingListName = value;
    }

    @action
    changeWishListName = async (value: string) => {
        this.errorMessage = '';
        this.successMessage = '';
        this.wishListName = value;
    }

    @action
    createShoppingList = async() => {
        this.errorMessage = '';
        this.successMessage = '';

        if ( this.shoppingListName === '' || this.shoppingListName.length < 1 || ! this.shoppingListName){
            this.errorMessage = "Please provide a title inorder to save your shopping list"
            return false;
        }

        if (this.shoppingListName !== '' && this.shoppingListName.length > 0){
            try {
                this.saveLoading = true;

                const payload = {
                    id: this.id,
                    title: this.shoppingListName.toLowerCase(),
                    products: this.products,
                    createdBy: {
                        uid: auth.currentUser?.uid,
                        email: auth.currentUser?.email,
                        role: "normal"
                    },
                    timestamp: new Date().toString(),
                }

                await firestore.collection('shopping-lists').doc(`${auth.currentUser?.uid}`).collection('shopping-lists').doc(this.id).set(payload)
                this.shoppingLists.push(payload);
                this.successMessage = "Successfully created shopping list"
                this.saveLoading = false;
            } catch (errorMessage) {
                this.saveLoading = false;
                const errorM = errorMessage.toString();
                if (errorM.includes("createdBy")){
                 	this.errorMessage = "Please sign in or sign up to create a shopping list";
                 	return
                }
                    this.errorMessage = "Failed to create shopping list, try again later";
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
    showShoppingList = async (id: string) => {
        if (id){
            try {
                const shoppingListsRef = await firestore.collection('shopping-lists').doc(id).collection('shopping-lists');
                const snapShot = await shoppingListsRef.get();
         
                if (snapShot) {
                    const lists = snapShot.docs.map((doc) => ({
                        ...doc.data(),
                    }));
        
                    this.shoppingLists =  lists;
                }
            } catch(error){
                this.loading = false;
                switch (true){
                    case error.code === "unavailable":
                        this.errorMessage = "Looks like you are offline"
                        break;
                    default:
                        this.errorMessage = "Server failed to respond, try again later"
                        break
                } 
            }
        }

    }

    @action
    showItemsInShoppingList = async (id: string) => {
        const listId = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);

        if (id) {
            const shoppingListRef = await firestore.collection('shopping-lists').doc(id).collection('shopping-lists').doc(listId).get().then((doc) => {
                if (doc.data()){
                    this.loading = false;
                }
                const dataArray = {...doc.data()};
                this.shoppingListActive = dataArray;
                dataArray.products.map(async (productId: any) => {
                    firestore.collection("products").doc(productId).get().then((doc) => {
                        if (doc.data()){
                            this.loading = false;
                        }
                        const items = doc.data();
                        this.shoppingListItems.push(items);
                    }).catch((error) => {
                        this.loading = false;
                        switch (true){
                            case error.code === "unavailable":
                                this.errorMessage = "Looks like you are offline"
                                break;
                            default:
                                this.errorMessage = "Server failed to respond, try again later"
                                break
                        } 
                    });
                });
    
            }).catch((error) => {
                this.loading = false;
                switch (true){
                    case error.code === "unavailable":
                        this.errorMessage = "Looks like you are offline"
                        break;
                    default:
                        this.errorMessage = "Server failed to respond, try again later"
                        break
                } 
            });
            
            return shoppingListRef;
        }
    } 

    @action
    removeItemFromShoppingList = async (id: string, value: string) => {
        const listId = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);

        if (id){
            try {
                this.shoppingListItems = this.shoppingListItems.filter(item => item.id !== value);
                const shoppingListRef = await firestore.collection('shopping-lists').doc(id).collection('shopping-lists').doc(listId);

                await shoppingListRef.update({
                    products: firebase.firestore.FieldValue.arrayRemove(value)
                });
                
                this.successMessage = "Successfully deleted item"
                this.saveLoading = true;
            } catch (errorMessage) {
                this.saveLoading = false;
                this.errorMessage = "Failed to create delete item, try again later";
            }
        }
    }

    @action
    deleteShoppingList = async (id: string) => {
        const listId = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);

        if (id) {
            try {
                this.saveLoading = true;
                await firestore.collection('shopping-lists').doc(id).collection('shopping-lists').doc(listId).delete();
                this.shoppingLists = this.shoppingLists.filter(list => list.id !== listId);
                
                this.successMessage = "Successfully deleted item"
                this.saveLoading = false;
            } catch(error) {
                this.saveLoading = false;
                return error;
    
            }
        }
    }

    @action
    createWishList = async() => {
        this.errorMessage = '';
        this.successMessage = '';

        if ( this.wishListName === '' || this.wishListName.length < 1 || ! this.wishListName){
            this.errorMessage = "Please provide a title inorder to save your wish list"
            return false;
        }

        if (this.wishListName !== '' && this.wishListName.length > 0){
            try {
                this.saveLoading = true;

                const payload = {
                    id: this.id,
                    title: this.wishListName.toLowerCase(),
                    products: this.products,
                    createdBy: {
                        uid: auth.currentUser?.uid,
                        email: auth.currentUser?.email,
                        role: "normal"
                    },
                    timestamp: new Date().toString(),
                }

                await firestore.collection('wish-lists').doc(`${auth.currentUser?.uid}`).collection('wish-lists').doc(this.id).set(payload);
                this.wishLists.push(payload);
                this.successMessage = "Successfully created wish list"
                this.saveLoading = false;
            } catch (errorMessage) {
                this.saveLoading = false;
                const errorM = errorMessage.toString();
                if (errorM.includes("createdBy")){
                 	this.errorMessage = "Please sign in or sign up to create a wishlist";
                 	return
                }
                    this.errorMessage = "Failed to create wish list, try again later";
        	}
    	}
    }

    @action
    showWishList = async (id: string) => {
        if (id) {
            try {
                const wishListsRef = await firestore.collection('wish-lists').doc(id).collection('wish-lists');
                const snapShot = await wishListsRef.get();
        
                if (snapShot) {
                    const lists = snapShot.docs.map((doc) => ({
                        ...doc.data(),
                    }));
        
                    this.wishLists = lists;
                }
            } catch (error){
                this.loading = false;
                switch (true){
                    case error.code === "unavailable":
                        this.errorMessage = "Looks like you are offline"
                        break;
                    default:
                        this.errorMessage = "Server failed to respond, try again later"
                        break
                } 
            }
        }
    }

    @action
    showItemsInWishList = async (id: string) => {
        const listId = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);

        if (id) {
            const wishListsRef = await firestore.collection('wish-lists').doc(id).collection('wish-lists').doc(listId).get().then((doc) => {
                if (doc.data()){
                    this.loading = false;
                }
                const dataArray = {...doc.data()};
                this.wishListActive = dataArray;
                dataArray.products.map(async (productId: any) => {
                    firestore.collection("products").doc(productId).get().then((doc) => {
                        if (doc.data()){
                            this.loading = false;
                        }
                        const items = doc.data();
                        this.wishListItems.push(items);
                    }).catch((error) => {
                        this.loading = false;
                        switch (true){
                            case error.code === "unavailable":
                                this.errorMessage = "Looks like you are offline"
                                break;
                            default:
                                this.errorMessage = "Server failed to respond, try again later"
                                break
                        } 
                    });
                });
    
            }).catch((error) => {
                this.loading = false;
                switch (true){
                    case error.code === "unavailable":
                        this.errorMessage = "Looks like you are offline"
                        break;
                    default:
                        this.errorMessage = "Server failed to respond, try again later"
                        break
                } 
            });
            
            return wishListsRef;
        }
    } 

    @action
    removeItemFromWishList = async (id: string, value: string) => {
        const listId = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);

        if (id) {
                try {
                    const wishListRef = await firestore.collection('wish-lists').doc(`${auth.currentUser?.uid}`).collection('wish-lists').doc(listId);
                    this.wishListItems = this.wishListItems.filter(item => item.id !== value);

                await wishListRef.update({
                    products: firebase.firestore.FieldValue.arrayRemove(value)
                });
                
                this.successMessage = "Successfully deleted item"
                this.saveLoading = true;
            } catch (errorMessage) {
                this.saveLoading = false;
                this.errorMessage = "Failed to create delete item, try again later";
            }
        }
    }

    @action
    deleteWishList = async (id: string) => {
        const listId = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);

        if (id) {
            try {
                this.saveLoading = true;

                await firestore.collection('wish-lists').doc(id).collection('wish-lists').doc(listId).delete();
                this.wishLists = this.wishLists.filter(list => list.id !== listId);
                
                this.successMessage = "Successfully deleted item"
                this.saveLoading = false;
            } catch(error) {
                this.saveLoading = false;
                return error;
    
            }
        }
    }

}