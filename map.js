
const map = L.map('map').setView([43.65107, -79.347015], 12); // Toronto

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

const merchants = [
  {
    name: "Sweet Treats Toronto",
    wallet: "0x123...abc",
    lat: 43.6532,
    lng: -79.3832
  },
  {
    name: "Crypto Ice Cream NYC",
    wallet: "0x456...def",
    lat: 40.7128,
    lng: -74.0060
  },
  {
    name: "Frozen Chain Seoul",
    wallet: "0x789...ghi",
    lat: 37.5665,
    lng: 126.9780
  }
];

merchants.forEach(m => {
  L.marker([m.lat, m.lng])
    .addTo(map)
    .bindPopup(`<b>${m.name}</b><br>Wallet: ${m.wallet}`);
});
