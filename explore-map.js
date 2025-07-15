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

  // ➕ 添加：如果没有任何 approved 商家，显示提示
  if (querySnapshot.empty) {
    const info = document.createElement("p");
    info.textContent = "We are currently reviewing merchant submissions.";
    info.style.textAlign = "center";
    info.style.marginTop = "10px";
    document.body.appendChild(info);
  }

  // 原有商家标注逻辑
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    if (data.lat && data.lng && data.name) {
      L.marker([data.lat, data.lng])
        .addTo(map)
        .bindPopup(`<b>${data.name}</b><br>${data.wallet || ''}`);
    }
  });
}

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
