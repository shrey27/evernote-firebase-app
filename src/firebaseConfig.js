import firebase from 'firebase/app';
import 'firebase/firestore';

firebase.initializeApp({
    apiKey: "AIzaSyBTytrsGLtAp-IJxQ6w4YWAfQsEgyfsYnk",
    authDomain: "evernote-app-2912f.firebaseapp.com",
    projectId: "evernote-app-2912f",
    storageBucket: "evernote-app-2912f.appspot.com",
    messagingSenderId: "1044034821695",
    appId: "1:1044034821695:web:cb5a1d331a3b2c3bc6a28a"
});

const firestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { firestore, timestamp };