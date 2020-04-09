import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyBWo-5cKvg6TIkEh8fS-wEPozXuk5nk2fc",
    authDomain: "crown-db-ef169.firebaseapp.com",
    databaseURL: "https://crown-db-ef169.firebaseio.com",
    projectId: "crown-db-ef169",
    storageBucket: "crown-db-ef169.appspot.com",
    messagingSenderId: "533484078754",
    appId: "1:533484078754:web:9560133cd59028e0aab9fb",
    measurementId: "G-BFW2N4WS53"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

//Authentication Providers
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
googleAuthProvider.setCustomParameters({ prompt: 'select_account' });

//Export the signInWithGoogle function so that it can be used outside
export const signInWithGoogle = () => auth.signInWithPopup(googleAuthProvider);

export default firebase;