// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getDatabase, ref } from "firebase/database"; // Import the ref function
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyDg3Jnx_UarEYP_iHNBMNJObRWxiFeIQVk",
  authDomain: "my-project-1f5d8.firebaseapp.com",
  databaseURL: "https://my-project-1f5d8-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "my-project-1f5d8",
  storageBucket: "my-project-1f5d8.appspot.com",
  messagingSenderId: "654136579877",
  appId: "1:654136579877:web:06874258a82a391826eccc",
  measurementId: "G-KJDNB2W266"
};



const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
const db = getDatabase(app);
const databaseRef = ref(db); // Set ref to the database root

export { app, auth, db, databaseRef, ref }; // Export the ref function along with other Firebase objects
