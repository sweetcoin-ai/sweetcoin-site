
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDaK-v3kN4j_nuARwX3Uz2hJbtv81yUosM",
  authDomain: "sweetcoin-map.firebaseapp.com",
  projectId: "sweetcoin-map",
  storageBucket: "sweetcoin-map.appspot.com",
  messagingSenderId: "1064057281541",
  appId: "1:1064057281541:web:0f6e70690c90619b0b7a89",
  measurementId: "G-X7BQD4QEX7"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const map = L.map("map").setView([43.6532, -79.3832], 13);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19
}).addTo(map);

async function loadApprovedMerchants() {
  const q = query(collection(db, "merchants"), where("status", "==", "approved"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach(doc => {
    const m = doc.data();
   L.marker([parseFloat(m.lat), parseFloat(m.lng)])

      .addTo(map)
      .bindPopup(`<b>${m.name}</b><br>Wallet: ${m.wallet}`);
  });
}

loadApprovedMerchants();
