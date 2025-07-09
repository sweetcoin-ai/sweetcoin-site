
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";
import { firebaseConfig } from './firebase-init.js';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const map = L.map('map').setView([43.6532, -79.3832], 12);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

async function loadApprovedMerchants() {
  const querySnapshot = await getDocs(collection(db, "merchants"));
  console.log("Total merchants fetched:", querySnapshot.size);

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    console.log("Merchant data:", data);

    if (data.status === "approved" && data.lat && data.lng) {
      L.marker([data.lat, data.lng])
        .addTo(map)
        .bindPopup(`<b>${data.name || 'Unnamed Merchant'}</b>`);
    }
  });
}

loadApprovedMerchants();
