import {action, observable} from "mobx";
import {uuid} from "uuidv4";
import RootStore from "../../../../../store/rootStore";
import { auth, firestore } from "../../../../../config/firebase";
import { getCookie } from "../../../../../Utitlities/cookies";

export default class FavoritesStore {
    private rootStore: RootStore;

    id = uuid();
    @observable favoritesInCookie: any[] = [];
    @observable favoriteProducts: any[] = [];
    @observable loading: boolean = true;
    @observable errorMessage: string = '';
    @observable successMessage: string = '';
    @observable saveLoading: boolean = false;
    @observable index: any = '';
    @observable favoriteBtnText: string = "Favorite";

    constructor(rootStore: RootStore){
        this.rootStore = rootStore;
    }

    @action
    getFavoritesInCookie = (id: any) => {
        if (id) {
            this.showFavoritesFromDB(id);
    
            const currentCookie = getCookie("favoritesInCookie");
            if (currentCookie){
                const currentCookieParsed = JSON.parse(currentCookie);
                this.favoritesInCookie = currentCookieParsed;
            }
    
            if (!currentCookie) {
                return document.cookie = `favoritesInCookie=${JSON.stringify([])}; path=/`;
            }
        }
    }

    @action
    addToFavorites = async (value: any) => {
        this.errorMessage = '';
        this.successMessage = '';

            try {
                this.saveLoading = true;
                const payload = {
                    productId: value,
                    createdBy: {
                        uid: auth.currentUser?.uid,
                        email: auth.currentUser?.email,
                        role: "basic"
                    },
                    timestamp: new Date().toString(),
                }

                await firestore.collection('favorites').doc(`${auth.currentUser?.uid}`).collection('favorites').doc(value).set(payload)
                // this.set
                this.successMessage = "Successfully added to favorites"
                this.saveLoading = false;
                this.favoriteBtnText = "Remove from favorite"
            } catch (error) {
                this.saveLoading = false;
                this.errorMessage = "Failed to add product to favorites, try again later"
            }
    }

    @action
    removeItemFromCookie = (value: any) => {
        const currentCookie = getCookie("favoritesInCookie");
        if (currentCookie){
            let currentCookieParsed = JSON.parse(currentCookie);
            currentCookieParsed = currentCookieParsed.filter((item: any)=> item.productId !== value);
            document.cookie = `favoritesInCookie=${JSON.stringify(currentCookieParsed )}; path=/`;
        }
    }


    @action
    removeItemFromFavorites = async (userId: string, id: string) => {
       if (userId && id){
           try {
               this.saveLoading = true;
               await firestore.collection('favorites').doc(userId).collection('favorites').doc(id).delete();
               this.favoritesInCookie = this.favoritesInCookie.filter(item => item.productId !== id);
               this.favoriteProducts =  this.favoriteProducts.filter(item => item.id !== id);
               this.removeItemFromCookie(id);
               this.successMessage = "Successfully deleted items from favorites"
               this.saveLoading = false;
               this.favoriteBtnText = "Favorite"
           } catch (error) {
               this.saveLoading = false;
               this.errorMessage = "Failed to delete, try again later"
           }
       }
    }

    @action
    showFavoritesFromDB = async (id: any) =>  {
        if (id) {
            const collectionsRef = await firestore.collection('favorites').doc(id).collection('favorites');
            const snapShot = await collectionsRef.get();
    
            const favorites = snapShot.docs.map((doc) => ({
                ...doc.data(),
            }));
            
            this.favoritesInCookie = favorites;
    
            if (favorites.length < 1) {
                this.loading = false;
                this.errorMessage = "You have no favorites, browse products and add them to favorites"
            }
    
            document.cookie = `favoritesInCookie=${JSON.stringify(favorites)}; path=/`;
        }
    }

    @action
    showFavoriteItems = async (id: any) => {
        if (id) {
            try {
                const collectionsRef = await firestore.collection('favorites').doc(id).collection('favorites');
                const snapShot = await collectionsRef.get();
        
                const favorites = snapShot.docs.map((doc) => ({
                    ...doc.data(),
                }));
                
                if (favorites.length < 1) {
                    this.loading = false;
                    this.errorMessage = "You have no favorites, browse products and add them to favorites"
                }

                document.cookie = `favoritesInCookie=${JSON.stringify(favorites)}; path=/`;

                    favorites.map(async (product: any) => {
                        await firestore.collection("products").doc(product.productId).get().then((doc) => {
                            if (doc.data()){
                                this.loading = false;
                            }
                            const products = doc.data();
                            this.favoriteProducts.push(products);
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
            } catch(error) {
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
}