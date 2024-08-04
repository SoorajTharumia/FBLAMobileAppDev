import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import "firebase/compat/firestore";
import { initializeApp } from 'firebase/app'
import { getFirestore, setDoc, doc } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  // gamingwizard account details
  
  apiKey: "AIzaSyD8fqUwHG725Gq5PrO4WBQ4in5BV7okPdM",
  authDomain: "parklandcommunityapp-7d8d2.firebaseapp.com",
  projectId: "parklandcommunityapp-7d8d2",
  storageBucket: "parklandcommunityapp-7d8d2.appspot.com",
  messagingSenderId: "64218480246",
  appId: "1:64218480246:web:7275b71a42f1e91bb8e957",







  // sendsooraj account details
  // apiKey: "AIzaSyADREIX2CHnAp-h2dgQO5R4CTm-Zhpthxk",
  // authDomain: "parklandcommunityapp.firebaseapp.com",
  // projectId: "parklandcommunityapp",
  // storageBucket: "parklandcommunityapp.appspot.com",
  // messagingSenderId: "31839694854",
  // appId: "1:31839694854:web:3b9d78f51543dfc40d5387",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const app = initializeApp(firebaseConfig);

export { app, firebase };