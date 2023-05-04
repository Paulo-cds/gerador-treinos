
//import { initializeApp } from "firebase/app"; Assim veio do firebase

import firebase from "firebase/compat/app"
import 'firebase/compat/auth'
import "firebase/storage"
import "firebase/compat/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB9QhUdm0DGfK7Cjbj1QPBc73iBQsmAL24",
  authDomain: "gerador-treinos.firebaseapp.com",
  projectId: "gerador-treinos",
  storageBucket: "gerador-treinos.appspot.com",
  messagingSenderId: "212023744594",
  appId: "1:212023744594:web:294ae199e9c5ea022be78b"
};


//const app = initializeApp(firebaseConfig); Assim veio do firebase

firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()



export {db, firebaseConfig}