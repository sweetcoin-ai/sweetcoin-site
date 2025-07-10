import { db } from './firebase-init-merchant.js';
import { collection, addDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js';

// 初始化地图
const map = L.map('map').setView([43.65107, -79.347015], 12);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// 点击地图添加商家
map.on('click', async function (e) {
  const name = prompt("Enter your business name:");
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
  } catch (error) {
    console.error("Error adding document:", error);
  }
});