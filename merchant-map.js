import { db } from './firebase-init-merchant.js';
console.log("db from firebase-init:", db);

import { collection } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
const ref = collection(db, "merchants");
console.log("ref test:", ref); // 看看是否 silent fail


const map = L.map('map').setView([43.65107, -79.347015], 12);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map)；

map.on('click', async (e) => {
    const name = prompt("Enter your shop name:");
    const wallet = prompt("Enter your wallet address:");

    if (!name || !wallet) return;

    const lat = e.latlng.lat;
    const lng = e.latlng.lng;

  try {
  console.log("开始写入 Firebase...");
  await addDoc(collection(db, "merchants"), {
    name,
    wallet,
    lat,
    lng,
    status: 'pending',
    createdAt: serverTimestamp(),
    remarks: ""
  });
  console.log("✅ Firebase 写入成功！");
  alert("Submitted for review!");
} catch (error) {
  console.error("❌ Firebase 写入失败:", error);
}

    }
});
