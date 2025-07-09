var map = L.map('eqsmap').setView([35.0, 105.0], 5); // set initial center and scaling

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
}).addTo(map);
