import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "employeeapp-35482.firebaseapp.com",
  projectId: "employeeapp-35482",
  storageBucket: "employeeapp-35482.appspot.com",
  messagingSenderId: "444331556617",
  appId: "1:444331556617:web:2196a27ba2429808ce9dd8"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const colRef = collection(db, 'URLs');
