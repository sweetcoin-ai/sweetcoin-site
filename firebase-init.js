
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-app.js";
import { getFirestore, addDoc, collection, getDocs, query, where, updateDoc, doc } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-firestore.js";

const firebaseConfig = {
  "apiKey": "AIzaSyD8xeABxQKvI7q32M1w3XV3Gjtnv94bQvA",
  "authDomain": "sweetcoin-b4af9.firebaseapp.com",
  "projectId": "sweetcoin-b4af9"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, addDoc, collection, getDocs, query, where, updateDoc, doc };
