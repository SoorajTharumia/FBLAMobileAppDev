import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import "firebase/compat/firestore";
import { initializeApp } from 'firebase/app'
import { getFirestore, setDoc, doc } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyADREIX2CHnAp-h2dgQO5R4CTm-Zhpthxk",
  authDomain: "parklandcommunityapp.firebaseapp.com",
  projectId: "parklandcommunityapp",
  storageBucket: "parklandcommunityapp.appspot.com",
  messagingSenderId: "31839694854",
  appId: "1:31839694854:web:3b9d78f51543dfc40d5387",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const app = initializeApp(firebaseConfig);

export { app, firebase };