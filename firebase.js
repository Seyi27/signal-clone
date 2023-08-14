// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLosNSVSiDD1S30cjozarLhjOvViDgl38",
  authDomain: "signal-clone-rn-23204.firebaseapp.com",
  projectId: "signal-clone-rn-23204",
  storageBucket: "signal-clone-rn-23204.appspot.com",
  messagingSenderId: "286159973810",
  appId: "1:286159973810:web:587f365f04c488536ec8ab"
};

// Initialize Firebase
let app;

if(firebase.apps.length===0){
    app= firebase.initializeApp(firebaseConfig);
}else{
    app=firebase.app();
}

const db= app.firestore();
const auth= firebase.auth();

export {db, auth};