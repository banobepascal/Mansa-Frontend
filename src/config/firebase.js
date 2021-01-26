import firebase from "firebase";
import "firebase/firestore";
import "firebase/database";
import "firebase/auth";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyD9wrwBUovpAbiCaL68QbKjv5R3nNGUgRM",
  authDomain: "mansa-project-a802e.firebaseapp.com",
  databaseURL: "https://mansa-project-a802e.firebaseio.com",
  projectId: "mansa-project-a802e",
  storageBucket: "mansa-project-a802e.appspot.com",
  messagingSenderId: "864436074314",
  appId: "1:864436074314:web:6ee5db8330be7f62bcf3b3",
  measurementId: "G-82835Q9XXM"
 };

  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

 

const firestore = firebase.firestore();
const db = firebase.database();
const auth = firebase.auth();
const storage = firebase.storage();
const functions = firebase.functions();


export { firestore, db, auth, storage, functions };
