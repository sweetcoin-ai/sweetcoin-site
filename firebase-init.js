// firebase-init.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCkAVCai3qijzM1y0PS9eJeyTZcB9Ov15c",
  authDomain: "sweetcoin-b4af9.firebaseapp.com",
  projectId: "sweetcoin-b4af9",
  storageBucket: "sweetcoin-b4af9.appspot.com",
  messagingSenderId: "258870437381",
  appId: "1:258870437381:web:36b90c86ae39e63267ce8e"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
