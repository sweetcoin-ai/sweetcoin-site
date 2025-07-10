import { db } from './firebase-init-merchant.js';
import { collection, addDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js';

// 初始化地图
const map = L.map('map').setView([43.65107, -79.347015], 12);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// 监听地图点击
map.on('click', function (e) {
  const lat = e.latlng.lat;
  const lng = e.latlng.lng;

  const formHtml = `
    <b>Apply to Join Sweetcoin Map</b><br>
    <input id="nameInput" type="text" placeholder="Business name" style="width: 100%; margin-top: 5px;"><br>
    <input id="walletInput" type="text" placeholder="Wallet address" style="width: 100%; margin-top: 5px;"><br>
    <textarea id="remarksInput" placeholder="Remarks" style="width: 100%; margin-top: 5px;"></textarea><br>
    <button id="submitBtn" style="width: 100%; margin-top: 5px; background: green; color: white;">Submit</button>
  `;

  const popup = L.popup()
    .setLatLng(e.latlng)
    .setContent(formHtml)
    .openOn(map);

  setTimeout(() => {
    document.getElementById('submitBtn').onclick = async function () {
      const name = document.getElementById('nameInput').value.trim();
      const wallet = document.getElementById('walletInput').value.trim();
      const remarks = document.getElementById('remarksInput').value.trim();

      if (!name || !wallet) {
        alert("Business name and wallet are required.");
        return;
      }

      try {
        await addDoc(collection(db, "merchants"), {
          name,
          wallet,
          remarks,
          lat,
          lng,
          status: "pending",
          createdAt: serverTimestamp()
        });
        alert("Submitted for review!");
        map.closePopup();
      } catch (error) {
        console.error("Error adding document:", error);
        alert("Failed to submit.");
      }
    };
  }, 100); // 延迟确保 DOM 元素加载完
});