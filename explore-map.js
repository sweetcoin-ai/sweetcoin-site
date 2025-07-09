import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

// ✅ 你的 Firebase 配置，保持不变
const firebaseConfig = {
  apiKey: "AIzaSyDaK-v3kN4j_nuARwX3Uz2hJbtv81yUosM",
  authDomain: "sweetcoin-map.firebaseapp.com",
  projectId: "sweetcoin-map",
  storageBucket: "sweetcoin-map.appspot.com",
  messagingSenderId: "1064057281541",
  appId: "1:1064057281541:web:0f6e70690c90619b0b7a89",
  measurementId: "G-X7BQD4QEX7"
};

// ✅ 初始化 Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ✅ 初始化 Leaflet 地图
const map = L.map("map").setView([43.6532, -79.3832], 13);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19
}).addTo(map);

// ✅ 从 Firebase 加载所有 status = "approved" 的商家并在地图显示
async function loadApprovedMerchants() {
  try {
    const q = query(collection(db, "merchants"), where("status", "==", "approved"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc => {
      const data = doc.data();
      if (data.lat && data.lng) {
        const marker = L.marker([data.lat, data.lng]).addTo(map);
        marker.bindPopup(`<b>${data.name}</b><br>Wallet: ${data.wallet || "N/A"}`);
      }
    });
  } catch (error) {
    console.error("Error loading approved merchants:", error);
  }
}

loadApprovedMerchants();
