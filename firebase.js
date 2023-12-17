// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref as storageRef } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDkTBlypw11IpJI884Y3grxE5-VkVtyF0o",
    authDomain: "chatpdf-37f4a.firebaseapp.com",
    projectId: "chatpdf-37f4a",
    storageBucket: "chatpdf-37f4a.appspot.com",
    messagingSenderId: "138539108336",
    appId: "1:138539108336:web:6bf4ce65738487ed12bf35",
    measurementId: "G-DZV4GVC8EZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const firestore = getFirestore(app);
export { storage, storageRef, firestore }
