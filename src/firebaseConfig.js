// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCeeOj4XTmOKIf_2SPABEXcmlLWkdF5rxU",
  authDomain: "mgm-connect-77f16.firebaseapp.com",
  projectId: "mgm-connect-77f16",
  storageBucket: "mgm-connect-77f16.appspot.com",
  messagingSenderId: "893895799812",
  appId: "1:893895799812:web:b8529284ca187aa6fb3151",
  measurementId: "G-9SSGDVG7RQ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);