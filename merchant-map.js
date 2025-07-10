import { db } from './firebase-init-merchant.js';
import { collection, addDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js';

let currentLat = null;
let currentLng = null;

// 初始化地图
const map = L.map('map').setView([43.65107, -79.347015], 12);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// 点击地图时显示自定义弹窗
map.on('click', function (e) {
  currentLat = e.latlng.lat;
  currentLng = e.latlng.lng;

  document.getElementById('customModal').style.display = 'block';
});

// 关闭弹窗
document.getElementById('closeBtn').onclick = function () {
  document.getElementById('customModal').style.display = 'none';
};

// 提交表单
document.getElementById('submitBtn').onclick = async function () {
  const name = document.getElementById('nameInput').value.trim();
  const wallet = document.getElementById('walletInput').value.trim();
  const remarks = document.getElementById('remarksInput').value.trim();

  if (!name || !wallet) {
    alert("Business name and wallet address are required.");
    return;
  }

  try {
    await addDoc(collection(db, "merchants"), {
      name,
      wallet,
      remarks,
      lat: currentLat,
      lng: currentLng,
      status: "pending",
      createdAt: serverTimestamp()
    });
    alert("Submitted for review!");
    document.getElementById('customModal').style.display = 'none';
  } catch (err) {
    console.error("Error:", err);
    alert("Failed to submit.");
  }
};