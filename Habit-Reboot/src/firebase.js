import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCXWCcwLyRWxppaBtS8_nw-yWl91J9ymOk",
  authDomain: "habit-reboot-56fff.firebaseapp.com",
  projectId: "habit-reboot-56fff",
  storageBucket: "habit-reboot-56fff.firebasestorage.app",
  messagingSenderId: "125007406710",
  appId: "1:125007406710:web:60dd706878a881723ae157",
  measurementId: "G-5JXX5HFG5B"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);