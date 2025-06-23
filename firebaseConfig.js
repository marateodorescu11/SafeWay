import AsyncStorage from '@react-native-async-storage/async-storage'; // Correct import
import { initializeApp } from 'firebase/app';
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPstg1vFB3Nbk5vdZVZoTuVxXqbfTz-P0",
  authDomain: "safeway-77bff.firebaseapp.com",
  projectId: "safeway-77bff",
  storageBucket: "safeway-77bff.firebasestorage.app",
  messagingSenderId: "1008954336489",
  appId: "1:1008954336489:web:77e63b5a51b767fc0cfc78",
  measurementId: "G-88MX0CXXLH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication with persistence
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage), // Correct usage of AsyncStorage
});
