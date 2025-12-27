// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCXWCcwLyRWxppaBtS8_nw-yWl91J9ymOk",
  authDomain: "habit-reboot-56fff.firebaseapp.com",
  projectId: "habit-reboot-56fff",
  storageBucket: "habit-reboot-56fff.firebasestorage.app",
  messagingSenderId: "125007406710",
  appId: "1:125007406710:web:60dd706878a881723ae157",
  measurementId: "G-5JXX5HFG5B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);