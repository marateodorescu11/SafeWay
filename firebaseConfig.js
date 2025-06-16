import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from "firebase/app";
//@ts-ignore
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDPstg1vFB3Nbk5vdZVZoTuVxXqbfTz-P0",
  authDomain: "safeway-77bff.firebaseapp.com",
  projectId: "safeway-77bff",
  storageBucket: "safeway-77bff.firebasestorage.app",
  messagingSenderId: "1008954336489",
  appId: "1:1008954336489:web:77e63b5a51b767fc0cfc78",
  measurementId: "G-88MX0CXXLH"
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});