import {action, observable} from "mobx";
import RootStore from "../../../../store/rootStore";
import { firestore } from "../../../../config/firebase";


export default class OrderStore {
    private rootStore: RootStore;

    @observable orders: any = [];
    @observable loading: boolean = false;
    @observable error: string = "";


    constructor(rootStore: RootStore){
        this.rootStore = rootStore;
    }

    @action
    getOrders = async (user: any, type: string) => {
        let ordersFetched: any[] = [];
        if (user && user.uid) {
            const collectionsSnapshot = await firestore.collection('orders').doc(user.uid).collection('orders').get();
        
            if (type === "all") {
                ordersFetched = collectionsSnapshot.docs.map((doc) => { 
                    return {
                        id: doc.id,
                        trackingId: doc.id.split("-")[0],
                        ...doc.data(),
                    } 
                });
            }

            if (type === "pending" || type === "approved" || type === "declined") {
                ordersFetched = collectionsSnapshot.docs.map((doc) => { 
                    if (doc.data().status === type) {
                        return {
                            id: doc.id,
                            trackingId: doc.id.split("-")[0],
                            ...doc.data(),
                        } 
                    }
                });
            } 
            
            this.orders = ordersFetched.filter((element) => element !== undefined);
        }
    }  
}