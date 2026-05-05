// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBjFf_xH4DnMA_mGxCunyvnfXz1FRtwZv8",
    authDomain: "listacompras-a6597.firebaseapp.com",
    projectId: "listacompras-a6597",
    storageBucket: "listacompras-a6597.firebasestorage.app",
    messagingSenderId: "410780931574",
    appId: "1:410780931574:web:34498c2ca4c7a1b40fa3d7",
    measurementId: "G-LX01KE5G9G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);