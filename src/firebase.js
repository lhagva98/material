import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const config = {
    apiKey: "AIzaSyB_vZ7fAIo0431L67C50KvTy9lvkKYUkuM",
    authDomain: "epes-teki-web-app.firebaseapp.com",
    databaseURL: "https://epes-teki-web-app.firebaseio.com",
    projectId: "epes-teki-web-app",
    storageBucket: "epes-teki-web-app.appspot.com",
    messagingSenderId: "770038283466",
    appId: "1:770038283466:web:79ae7b993a841249100833",
    measurementId: "G-L4CC5ML3GX"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();

export default firebase;