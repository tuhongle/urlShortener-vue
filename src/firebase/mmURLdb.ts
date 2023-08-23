import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAKn0YL5WB1VKIOkIe5mck80EwGW1E94_s",
  authDomain: "url-shorten-db.firebaseapp.com",
  projectId: "url-shorten-db",
  storageBucket: "url-shorten-db.appspot.com",
  messagingSenderId: "218593906613",
  appId: "1:218593906613:web:029ce095aa72896068d3fc"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db