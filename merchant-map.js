import { db } from './firebase-init-merchant.js';
import { collection, addDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js';
map.on('click', function (e) {
    console.log("点击地图了"); // ← 添加这一行调试用
    const name = prompt("Enter your business name:");
    const wallet = prompt("Enter your wallet address:");

console.log("Firestore db:", db);
const ref = collection(db, "merchants");
console.log("ref:", ref);


const map = L.map('map').setView([43.65107, -79.347015], 12);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);



    } catch (e) {
        console.error("Error adding document: ", e);
    }
});
