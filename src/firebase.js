import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const config = {
    apiKey: "AIzaSyBfYcb83Uoupzr1dwbXRLijTDaMNRbxaHg",
    authDomain: "material-22f40.firebaseapp.com",
    projectId: "material-22f40",
    storageBucket: "material-22f40.appspot.com",
    messagingSenderId: "641133879737",
    appId: "1:641133879737:web:262af749fcaf158c2a1668",
    measurementId: "G-8JZ99YBD7H"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();

export default firebase;