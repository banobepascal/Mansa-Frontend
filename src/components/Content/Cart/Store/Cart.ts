import {action, observable} from "mobx";
import RootStore from "../../../../store/rootStore";
import { firestore } from "../../../../config/firebase";
import { getCookie, deleteCookie } from "../../../../Utitlities/cookies";
import { SyntheticEvent } from "react";
import axios from 'axios';
import { uuid } from "uuidv4";
import { emailRegex, nameRegex, phoneRegex } from "../../../../Utitlities/regexes";

export default class CartStore {
    private rootStore: RootStore;

    @observable itemsToCart: any[] = [];
    @observable cartItems: any[] = [];
    @observable cartItemsCookie: any = [];
    @observable loading: boolean = true;
    @observable error: string = '';
    @observable index: any = '';
    @observable cartBtnText: string = 'Add to cart';
    @observable promoCodeText: string = '';
    @observable isPromoApplied: boolean = false;
    @observable total: string | number = 0;
    @observable shipping: string | number = 0;
    @observable taxes: string | number = 0;
    @observable subtotal: string | number = 0;
    @observable productQuantity: string | number = 1;
    @observable pickUpAddress: string = "";
    @observable firstName: string = "";
    @observable lastName: string = "";
    @observable address: string = "";
    @observable companyOrSuite: string = "";
    @observable city: string = "";
    @observable district: string = "";
    @observable email: string = "";
    @observable phoneNumber: string = "";
    @observable isPickUpAddress: boolean = false
    @observable isShippingAddress: boolean = true;
    @observable isCompanyOrSuite: boolean = false;
    @observable paymentMethod: string = "momo";
    @observable card: string = "";
    @observable expDate: any = "";
    @observable securityCode: any = "";
    @observable deliveryError: string = "";
    @observable paymentError: string = "";
    @observable deliveryInstructions: string = "";
    @observable successMessage: string = "";
    @observable modal: boolean = false;

    constructor(rootStore: RootStore){
        this.rootStore = rootStore;
        
    }

    @action
    setItemsInCart = (value: any )=> {
        const currentCookie = getCookie("itemsInCart");
        if (currentCookie){
            const currentCookieParsed = JSON.parse(currentCookie);
            currentCookieParsed.push(value);
            document.cookie = `itemsInCart=${JSON.stringify(currentCookieParsed )}; path=/`;
        }
    }

    @action
    getItemsInCart = () => {
        const currentCookie = getCookie("itemsInCart");
        if (currentCookie){
            const currentCookieParsed = JSON.parse(currentCookie);
            this.itemsToCart = currentCookieParsed;
        }

        if (!currentCookie) {
            return document.cookie = `itemsInCart=${JSON.stringify([])}; path=/`;
        }
    }
    
    selectPaymentMethod = (value: string) => {
        this.paymentMethod = value;
    }

    @action
    handleCardChange = (value: any) => {
        if (isNaN(value)){
            return false
        }
        this.card = value;
    }

    @action
    handleExpirationDate = (value: any) => {
        this.expDate = value;
    }

    @action
    handleSecurityCard = (value: any) => {
        this.securityCode = value;
    }

    @action
    selectDeliveryMethod = (method: string) => {
        if (method === "pickup") {
            this.isShippingAddress = false;
            this.isPickUpAddress = true
        }

        if (method === "shipping") {
            this.isPickUpAddress = false
            this.isShippingAddress = true
        }
    }

    @action
    removeItemFromCookie = (value: any) => {
        const currentCookie = getCookie("itemsInCart");
        if (currentCookie){
            let currentCookieParsed = JSON.parse(currentCookie);
            currentCookieParsed = currentCookieParsed.filter((item: any)=> item.value !== value);
            document.cookie = `itemsInCart=${JSON.stringify(currentCookieParsed )}; path=/`;
        }
    }

    @action
    setItems = (value: any)=> {
        this.itemsToCart = value;
    }
    handleFirstName = (value: any) => {
        this.firstName = value;
    }

    @action
    handleLastName = (value: any) => {
        this.lastName = value;
    }

    @action
    handleAddress = (value: any) => {
        this.address = value;
    }

    @action
    handleCity = (value: any) => {
        this.city = value;
    }

    @action
    handleDistrict = (value: any) => {
        this.district = value;
    }

    @action
    handleEmail = (value: string) => {
        this.email = value;
    }

    @action
    handlePhoneNumber = (value: any) => {
        if (isNaN(value)){
            return false
        }

        if (value.length > 10) {
            return false;
        }
        this.phoneNumber = value
    }

    @action
    handlePickUpAddress = (value: string) => {
        this.pickUpAddress = value;
    }

    @action
    handleDeliveryInstructions = (value: string) => {
        this.deliveryInstructions = value;
    }


    @action
    addToCart = async (value: any) => {
        const existingCartItem = this.itemsToCart.find(
            cartItemToAdd => cartItemToAdd.value === value
        );

        if (existingCartItem) {
            return this.itemsToCart.map(cartItemToAdd =>
                cartItemToAdd.value === value
                ? cartItemToAdd
                : null
                );
        }
      
        this.itemsToCart = [...this.itemsToCart, {value}];
        return this.setItemsInCart({value})
    }

    @action
    removeItemFromCart = async (value: any) => {
        this.cartItems = this.cartItems.filter(cartItem => cartItem.id !== value);
        this.itemsToCart =  this.itemsToCart.filter(item => item.value !== value);
        this.removeItemFromCookie(value);
    }

    @action
    showCartItems = async () => {
        const items = getCookie('itemsInCart');
        if (items) {
            this.loading = true;
            const parsedItems = JSON.parse(items);
            parsedItems.map(async (productId: any) => {
                await firestore.collection("products").doc(productId.value).get()
                .then((doc) => {
                    if (doc.data()) {
                        this.loading = false;
                    }
                    const products = doc.data();
                    this.cartItems.push(products);
                })
                .catch((error) => {
                    this.loading = false;
                    switch (true){
                        case error.code === "unavailable":
                            this.error = "Looks like you are offline"
                            break;
                        default:
                            this.error = "Server failed to respond, try again later"
                            break
                    } 
                })
            })
        }

    }

    @action
    handlePromoCodeChange = (value: any) => {
        this.isPromoApplied = false
        this.promoCodeText = value;
    }

    @action
    applyPromoCode = () => {
        if (!this.promoCodeText || this.promoCodeText === "") {
            return false
        }

        if (this.isPromoApplied === false) {
            this.isPromoApplied = true;
            return true;
        }
        this.isPromoApplied = false;
    }

    @action
    fetchSummary = () => {
        let productSubTotal = 0;
        
        if (this.cartItems && this.cartItems.length > 0) {
            for (let i=0; i < this.cartItems.length; i++) {
                if (Number(this.cartItems[i].quantityToBuy)){
                    productSubTotal += Number(this.cartItems[i].price * this.cartItems[i].quantityToBuy);
                }
                productSubTotal += Number(this.cartItems[i].price * 1);
            }
            
            this.total = productSubTotal;
            this.subtotal = productSubTotal;
            return true
        }
    } 

    @action
    selectQuantity = (eventKey: any, event: SyntheticEvent<any>, uniqueIndex: any) => {
        if (uniqueIndex) {
            this.productQuantity = eventKey;
        }
    }

    @action
    editProductAndQuantity = (quantity: any, uniqueKey: number) => {
        const newCartItems = this.cartItems.map((item, index) => {
            if (index === uniqueKey) {
                return {
                    ...item,
                    quantityToBuy: quantity,
                }
            }
            return item            
        });
        this.cartItems = newCartItems;
        this.fetchSummary();
    }

    @action
    requestMomoPayment = async () => {
        try {
            const userID = uuid();
        } catch (error) {
            return error;
        }  
    }

    @action
    openModal = () => {
        if (this.cartItems.length < 1) {
            return false;
        }
        this.modal = true
    }

    @action
    closeModal = () => {
        this.modal = false
    }

    @action
    placeOrder = async (user: any) => {
        if (user){
            try {
                if (this.isShippingAddress){
                    switch (true) {
                        case !this.firstName || this.firstName === "" || !this.lastName || this.lastName === "" ||
                            !this.address || this.address === "" || !this.city || this.city === "" || !this.district ||
                            this.district === "" || !this.phoneNumber || this.phoneNumber === "":
                                this.deliveryError = "Firstname, lastname, address, city, district, email and phone number are required"
                                return false
                        case nameRegex.test(this.firstName) === false || nameRegex.test(this.lastName) === false ||
                            nameRegex.test(this.city) === false || nameRegex.test(this.district) === false:
                            this.deliveryError = "Firstname, lastname, city and district can only contain alphabets"
                            return false
                        case emailRegex.test(this.email) === false:
                            this.deliveryError = "Please enter a valid email"
                            return false;
                        case phoneRegex.test(this.phoneNumber) === false:
                            this.deliveryError = "Please enter a valid phone number"
                            return false;
                    }
                }
        
                if (this.isPickUpAddress) {
                    if (!this.pickUpAddress || this.pickUpAddress === "") {
                        this.deliveryError = "Please provide a pickup address";
                        return false;
                    }
                }
    
                const payload = {
                    createdBy: {
                        displayName: user.displayName,
                        id: user.uid,
                        email: user.email,
                        photoURL: user.photoURL,
                    },
                    orderedBy: {
                        firstName: this.firstName,
                        lastName: this.lastName,
                        email: this.email,
                        phoneNumber: this.phoneNumber
                    },
                    address: this.address,
                    city: this.city,
                    status: 'pending',
                    products: this.cartItems,
                    pickUpAddress: this.pickUpAddress,
                    promoCode: this.promoCodeText,
                    bill: this.total,
                    paymentMethod: this.paymentMethod,
                    createdOn: new Date().toString(),
                    deliveryInstructions: this.deliveryInstructions,
                }
    
                await firestore.collection('orders').doc(user.uid).collection('orders').doc(uuid()).set(payload);
                deleteCookie('itemsInCart');
                this.itemsToCart = [];
                this.cartItems = [];
                this.total = 0;
                this.subtotal = 0;
                this.successMessage = "Successfully placed order";
                this.modal = false;
                
            } catch (error) {
                this.paymentError = "Failed to place order, try again later";
                return error
            }
        }
    }
}
