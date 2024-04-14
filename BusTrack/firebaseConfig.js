// firebaseConfig.js

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "firebase/database"; 

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Export the initialized Firebase app and analytics instance
export { app};
