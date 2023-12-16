// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth,connectAuthEmulator,signInWithEmailAndPassword } from "firebase/auth";
import {getDatabase} from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "music-web-application-859a1.firebaseapp.com",
    projectId: "music-web-application-859a1",
    storageBucket: "music-web-application-859a1.appspot.com",
    messagingSenderId: "174773712759",
    appId: "1:174773712759:web:bd1df4b1fa0673045cd372",
    measurementId: "G-81H3Z9V0CN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
// connectAuthEmulator(auth,"http://localhost:9099")
export const db = getDatabase(app)