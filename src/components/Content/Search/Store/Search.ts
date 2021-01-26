/* eslint-disable no-restricted-globals */
import {action, observable} from "mobx";
import RootStore from "../../../../store/rootStore";
import { firestore } from "../../../../config/firebase";
import { searchClient } from "../../../../Utitlities/search";


export default class SearchStore {
    private rootStore: RootStore

    @observable categories: any[] = [];
    @observable products: any[] = [];
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
    showSearchedProducts = async (query: string) => {
        const index = searchClient.initIndex('mansa')
        const result = await index.search(query);
        const hits = result.hits;
        this.products = hits
    }

    @action 
    filterSearchProducts = (filters: any[]) => {
        // Cache array data
        this.cachedFilteredProducts = filters;
        document.cookie = `filtered_products=${JSON.stringify(filters)}; path=/`;
        
        const filteredProductArray: any[] = [];

        for (const filter of filters) {
            const filteredProduct = checkForProductExistence(filter, this.products);
            if (filteredProductArray !== undefined) {
                filteredProductArray.push(filteredProduct)
            }
        }

        this.filteredArrayOfProducts = filteredProductArray.filter((product) => product !== undefined);
    }

    @action
    sortSearchFilters = (filter: string) => {
        let sortedProducts;
        if (filter === "Price: Low to High") {
            sortedProducts = this.products.sort((a, b) => a.price - b.price);
            this.products = sortedProducts;
        }

        if (filter === "Price: High to Low") {
            sortedProducts = this.products.sort((a, b) => b.price - a.price);
            this.products = sortedProducts;
        }

        if (filter === "Average rating") {
            sortedProducts = this.products.sort((a, b) => b.totalRatings - a.totalRatings);
            this.products = sortedProducts;
        }

        if (filter === "None") {
            sortedProducts = this.products.sort((a, b) => a.price - b.price);
            this.products = sortedProducts;
            // this.products = this.products;
        }
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