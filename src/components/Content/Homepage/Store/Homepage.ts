import {action, observable} from "mobx";
import {uuid} from "uuidv4";
import firebase from "firebase/app";
import moment from 'moment';
import RootStore from "../../../../store/rootStore";
import { auth, firestore } from "../../../../config/firebase";

export default class HomepageStore {
    private rootStore: RootStore

    @observable collectionArray: any[] = [];
    @observable homepageProducts: any[] = [];
    @observable popularCategories: any[] = [];

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

        this.popularCategories = collections;
    }

    @action
    showHomepageProducts = async () => {
        try {
            const productsRef = await firestore.collection('collections').where('title', "==", "daily deals");
            const snapShot = await productsRef.get();

            const ids = snapShot.docs.map((doc) => ({
                ...doc.data().products,
            }));

            this.collectionArray = Object.values(ids[0]);

            this.collectionArray.map(async (value) => {
                firestore.collection("products").doc(value).get().then((doc) => {
                    const dataArray = doc.data();
                    this.homepageProducts.push(dataArray);
                }).catch((error) => {
                    return error
                });
            });

        } catch (error) {
            return error;
        }
    }
}