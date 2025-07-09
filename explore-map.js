// explore-map.js
import { collection, getDocs, getFirestore, query, where } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";
import { db } from './firebase-init.js';

const map = L.map('map').setView([43.65107, -79.347015], 12);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
}).addTo(map);

async function loadApprovedMerchants() {
  const q = query(collection(db, "merchants"), where("status", "==", "approved"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    if (data.lat && data.lng && data.name) {
      L.marker([data.lat, data.lng])
        .addTo(map)
        .bindPopup(`<b>${data.name}</b><br>${data.wallet || ''}`);
    }
  });
}

loadApprovedMerchants();
