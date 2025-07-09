import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";
import { firebaseConfig } from "./firebase-init.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Leaflet map setup
const map = L.map('map').setView([43.6532, -79.3832], 12);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Load approved merchants
async function loadApprovedMerchants() {
  const querySnapshot = await getDocs(collection(db, "merchants"));
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    if (data.status === "approved") {
      const marker = L.marker([data.lat, data.lng]).addTo(map);
      marker.bindPopup(`<b>${data.name}</b><br>${data.wallet}`);
    }
  });
}

loadApprovedMerchants();
