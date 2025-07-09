import { db } from './firebase-init.js';
import { collection, addDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js';

import L from 'https://unpkg.com/leaflet@1.9.4/dist/leaflet-src.esm.js';

const map = L.map('map').setView([43.65107, -79.347015], 12);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

map.on('click', async (e) => {
    const name = prompt("Enter your shop name:");
    const wallet = prompt("Enter your wallet address:");

    if (!name || !wallet) return;

    const lat = e.latlng.lat;
    const lng = e.latlng.lng;

    try {
        await addDoc(collection(db, "merchants"), {
            name,
            wallet,
            lat,
            lng,
            status: "pending",
            createdAt: serverTimestamp(),
            remarks: ""
        });
        alert("Submitted for review!");
    } catch (e) {
        console.error("Error adding document: ", e);
    }
});