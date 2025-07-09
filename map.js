var map = L.map('map').setView([35.0, 105.0], 5); // set initial center and scaling

// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     maxZoom: 19,
//     attribution: '© OpenStreetMap contributors'
// }).addTo(map);


// L.tileLayer('https://webrd0{s}.is.autonavi.com/appmaptile?style=7&x={x}&y={y}&z={z}', {
//     subdomains: '1234',
//     maxZoom: 18,
//     attribution: 'Map data &copy; 高德地图'
// }).addTo(map);

// <script src="http://api.tianditu.gov.cn/api?v=4.0&tk=您的密钥" type="text/javascript"></script>


L.tileLayer('https://t{s}.tianditu.gov.cn/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=072939ab9bd921a6fe546aea63310050', {
    subdomains: ['0','1','2','3','4','5','6','7'],
    maxZoom: 18,
    attribution: '天地图'
}).addTo(map);


