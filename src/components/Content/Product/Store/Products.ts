/* eslint-disable no-restricted-globals */
import {action, observable} from "mobx";
import RootStore from "../../../../store/rootStore";
import { auth, firestore } from "../../../../config/firebase";
import aggregateShoppingListData from "../../../../Utitlities/aggregate";
import firebase from "firebase/app";

export default class  ProductsStore {
    private rootStore: RootStore

    @observable products: any[] = [];
    @observable similarProducts: any[] = [];
    @observable itemsToCart: any[] = [];
    @observable productType: string = '';
    @observable product: any = '';
    @observable productImages: any[] = [];
    @observable loading: boolean = true;
    @observable saveLoading: boolean = false;
    @observable errorMessage: string = '';
    @observable successMessage: string = '';
    @observable shoppingListsInProducts: any[] = [];
    @observable shoppingLists: any[] = [];
    @observable wishListsInProducts: any[] = [];
    @observable wishLists: any[] = [];
    @observable rating: number = 1;

    constructor(rootStore: RootStore){
        this.rootStore = rootStore
    }

    @action
    showAllProducts = async () => {
        try {
            this.loading = true;
            const productsRef = await firestore.collection('products');
            const snapShot = await productsRef.get();
    
            if (snapShot){
                this.loading = false;
                const productsArray = snapShot.docs.map((doc) => ({
                    ...doc.data(),
                }));
    
                this.products = productsArray;
            }

        } catch(errorMessage){
            this.loading = false;
            switch (true){
                case errorMessage.code === "unavailable":
                    this.errorMessage = "Looks like you are offline"
                    break;
                default:
                    this.errorMessage = "Server failed to respond, try again later"
                    break
            } 
        }
    }

   
    @action
    showProduct = async () => {
        const id = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);

        const productRef = firestore.collection('products').doc(id).get().then((doc) => {
            if (doc.data()){
                this.loading = false;
                this.product = doc.data();
                this.productImages = [...doc.data()?.productImages];
                this.productType = doc.data()?.productType;
                this.showSimilarProducts();
            }
        }).catch((errorMessage) => {
            this.loading = false;
            switch (true){
                case errorMessage.code === "unavailable":
                    this.errorMessage = "Looks like you are offline"
                    break;
                default:
                    this.errorMessage = "Server failed to respond, try again later"
                    break
            } 
        });
        
        return productRef;
    }

    @action
    showSimilarProducts = async () => {
        try {
            const productsRef = await firestore.collection('products').where('productType', "==", `${this.productType}`);
            const snapShot = await productsRef.get();

            const ids = snapShot.docs.map((doc) => ({
                ...doc.data(),
            }));

            this.similarProducts = [...ids];
        } catch (errorMessage) {
            return errorMessage;
        }
    }

    @action
    resetChanges = () => {
        this.successMessage = "";
        this.errorMessage = "";
        this.saveLoading = false;
        this.shoppingLists = [];
        this.wishLists = [];
    }

    @action
    changeShoppingList = (value: any) => {
        this.shoppingLists = [...value];
    }

    @action
    showShoppingListsInProducts = async (id: string) => {
        if(id) {
            try {
                const shoppingListsRef = await firestore.collection('shopping-lists').doc(id).collection('shopping-lists');
                const snapshot = await shoppingListsRef.get();
    
                let tempArray: any[] = []
                snapshot.forEach((doc) => {
                    tempArray.push(doc.data())
                });
    
                let lists = aggregateShoppingListData(tempArray);
                this.shoppingListsInProducts = [...this.shoppingListsInProducts, ...lists];
            } catch (errorMessage) {
                return errorMessage;
            }
        }
    }

    @action
    addToShoppingList = async (id: string) => {
        this.errorMessage = '';
        this.successMessage = '';
        const productId = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);

        if (this.shoppingLists.length < 0){
            this.errorMessage = "Please enter a shopping list"
            return false;
        }

        if (this.shoppingLists.length > 0){
            try {
                this.saveLoading = true;
                this.shoppingLists.forEach( async(value) => {
                    const ref =  await firestore.collection('shopping-lists').doc(id).collection('shopping-lists').doc(value);
                    ref.update({
                        products: firebase.firestore.FieldValue.arrayUnion(productId),
                    });
                    });
                    
                this.successMessage = "Successfully added to shopping list"
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
    changeWishList = (value: any) => {
        this.wishLists = [...value];
    }

    @action
    showWishListsInProducts = async (id: string) => {
        if (id) {
            try {
                const wishListsRef = await firestore.collection('wish-lists').doc(id).collection('wish-lists');
                const snapshot = await wishListsRef.get();
    
                let tempArray: any[] = []
                snapshot.forEach((doc) => {
                    tempArray.push(doc.data())
                });
    
                let lists = aggregateShoppingListData(tempArray);
                this.wishListsInProducts = [...this.wishListsInProducts, ...lists];
            } catch (errorMessage) {
                return errorMessage;
            }
        }
    }

    @action
    addToWishList = async (id: string) => {
        this.errorMessage = '';
        this.successMessage = '';
        const productId= location.pathname.substring(location.pathname.lastIndexOf('/') + 1);

        if (this.wishLists.length < 0){
            this.errorMessage = "Please enter a wish list"
            return false;
        }

        if (this.wishLists.length > 0){
            try {
                this.saveLoading = true;
                this.wishLists.forEach( async(value) => {
                    const ref = await firestore.collection('wish-lists').doc(id).collection('wish-lists').doc(value);
                        ref.update({
                            products: firebase.firestore.FieldValue.arrayUnion(productId),
                        });
                    });
                    
                this.successMessage = "Successfully added to wish list";
                this.saveLoading = false;
            } catch (errorMessage) {
                this.saveLoading = false;
                const errorM = errorMessage.toString();
                if (errorM.includes("createdBy")){
                        this.errorMessage = "Please sign in or sign up to create a wish list";
                        return
                }
                    this.errorMessage = "Failed to create wish list, try again later";
            }
        }
    }

    @action
    setRating = (value: number) => {
        this.rating = value;
    };

    @action
    submitRating = async () => {
        const id = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);

        try{
            this.saveLoading = true; 
            const productRef = await firestore.collection('products').doc(id);

            productRef.update({
                totalRatings: firebase.firestore.FieldValue.increment(this.rating),
                totalRaters:  firebase.firestore.FieldValue.increment(1)
            });

            this.successMessage = "Successfully rated product";
            this.saveLoading = false;
        } catch (error) {
            this.saveLoading = false;
        }
        
    }
}
