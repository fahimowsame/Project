// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCYrZI9Mg-n-qN-1KlbXRzGaD0kw6Sb7_g",
    authDomain: "comment-system-4e71c.firebaseapp.com",
    projectId: "comment-system-4e71c",
    storageBucket: "comment-system-4e71c.appspot.com",
    messagingSenderId: "168569951748",
    appId: "1:168569951748:web:18f25f2099592a39980751",
    measurementId: "G-5HTYC6FH9Y"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

const googleProvider = new GoogleAuthProvider();

export { auth, db, storage, googleProvider };
