/* eslint-disable no-restricted-globals */
import {action, observable} from "mobx";
import RootStore from "../../../../store/rootStore";
import { firestore } from "../../../../config/firebase";

export default class CaregoriesStore {
    private rootStore: RootStore

    @observable categories: any[] = [];
    @observable categoryProducts: any[] = [];
    @observable categoryMenuProducts: any[] = [];
    @observable menuCategory: any = [];
    @observable loading: boolean = false;
    @observable error: string = '';
    @observable category: any = [];
    @observable filterQueries: string[] = [];
    @observable filteredArrayOfProducts: any[] = [];
    @observable cachedFilteredProducts: any[] = [];

    constructor(rootStore: RootStore){
        this.rootStore = rootStore
    }

    @action
    showCategories = async () => {
        const collectionsRef = await firestore.collection('collections');
        const snapShot = await collectionsRef.get();

        const collections = snapShot.docs.map((doc) => ({
            ...doc.data(),
        }));

        this.categories = collections;
        // this.categoriesMenu = collections;
    }

    @action
    sortFilters = (filter: string) => {
        let sortedProducts;
        if (filter === "Price: Low to High") {
            sortedProducts = this.categoryProducts.sort((a, b) => a.price - b.price);
            this.categoryProducts = sortedProducts;
        }

        if (filter === "Price: High to Low") {
            sortedProducts = this.categoryProducts.sort((a, b) => b.price - a.price);
            this.categoryProducts = sortedProducts;
        }

        if (filter === "Average rating") {
            sortedProducts = this.categoryProducts.sort((a, b) => b.totalRatings - a.totalRatings);
            this.categoryProducts = sortedProducts;
        }

        if (filter === "None") {
            sortedProducts = this.categoryProducts.sort((a, b) => a.price - b.price);
            this.categoryProducts = sortedProducts;
            // this.categoryProducts = this.categoryProducts;
        }
    }


    @action
    resetCategoryMenuProducts = () => {
        this.categoryMenuProducts = [];
        this.menuCategory = [];
    }

    @action
    showCategoryProductsInMenu = async (id: string) => {
        this.loading = true;
        const collectionsRef = await firestore.collection('collections').doc(id).get().then((doc) => {
            if (doc.data()){
                this.loading = false;
            }
            const dataArray = {...doc.data()};
            this.menuCategory = dataArray;
            this.menuCategory.products.map(async (productId: any) => {
                firestore.collection("products").doc(productId).get().then((doc) => {
                    if (doc.data()){
                        this.loading = false;
                    }
                    this.categoryMenuProducts.push(doc.data());
                }).catch((error) => {
                    this.loading = false;
                    switch (true){
                        case error.code === "unavailable":
                            this.error = "Looks like you are offline"
                            break;
                        default:
                            this.error = "Server failed to respond, try again later"
                            break
                    } 
                });
            });

        }).catch((error) => {
            this.loading = false;
            switch (true){
                case error.code === "unavailable":
                    this.error = "Looks like you are offline"
                    break;
                default:
                    this.error = "Server failed to respond, try again later"
                    break
            } 
        });
        
        return collectionsRef;
    }

    @action
    getCategoryProducts = async () => {
        const id = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);
        this.loading = true;

        const collectionsRef = await firestore.collection('collections').doc(id).get().then((doc) => {
            if (doc.data()){
                this.loading = false;
            }
            const dataArray = {...doc.data()};
            this.category = dataArray;
            dataArray.products.map(async (productId: any) => {
                firestore.collection("products").doc(productId).get().then((doc) => {
                    if (doc.data()){
                        this.loading = false;
                    }
                    const products = doc.data();
                    this.categoryProducts.push(products);

                }).catch((error) => {
                    this.loading = false;
                    switch (true){
                        case error.code === "unavailable":
                            this.error = "Looks like you are offline"
                            break;
                        default:
                            this.error = "Server failed to respond, try again later"
                            break
                    } 
                });
            });
            
        }).catch((error) => {
            this.loading = false;
            switch (true){
                case error.code === "unavailable":
                    this.error = "Looks like you are offline"
                    break;
                default:
                    this.error = "Server failed to respond, try again later"
                    break
            } 
        });
        
        return collectionsRef;
    }

    @action 
    filterProducts = (filters: any[]) => {
        // Cache array data
        this.cachedFilteredProducts = filters;
        const filteredProductArray: any[] = [];
        
        for (const filter of filters) {
            const filteredProduct = checkForProductExistence(filter, this.categoryProducts);
            if (filteredProductArray !== undefined) {
                filteredProductArray.push(filteredProduct)
            }
        }

        this.filteredArrayOfProducts = filteredProductArray.filter((product) => product !== undefined);
    }
}

const checkForProductExistence = (filter: any, products: any[]) => {
    for (const product of products) {
        if (filter.type === "brand" && product.brand === filter.name) {
            return product
        }

        if (filter.type === "ratings" && Math.round(product.totalRatings / product.totalRaters) === parseInt(filter.name)) {
            return product
        }
    }
    return 
}