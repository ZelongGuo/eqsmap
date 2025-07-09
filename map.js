// var map = L.map('map').setView([35.0, 105.0], 5); // set initial center and scaling

// // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
// //     maxZoom: 19,
// //     attribution: '© OpenStreetMap contributors'
// // }).addTo(map);


// ---------------------------------------------------------------------------------------

// var vecLayer = L.tileLayer(
//   'https://t{s}.tianditu.gov.cn/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=072939ab9bd921a6fe546aea63310050',
//   {
//     subdomains: ['0','1','2','3','4','5','6','7'],
//     maxZoom: 18,
//     attribution: '&copy; Zelong Guo, Basemap: &copy; Tianditu (MapWorld) contributors'
//   });

// var labelLayer = L.tileLayer(
//   'https://t{s}.tianditu.gov.cn/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=072939ab9bd921a6fe546aea63310050',
//   {
//     subdomains: ['0','1','2','3','4','5','6','7'],
//     maxZoom: 18
//   });

// vecLayer.addTo(map);
// labelLayer.addTo(map); // labelLayer and vecLayer overlapping

// ---------------------------------------------------------------------------------------

// // create Basemap
// // vec map
// var vecLayer = L.tileLayer('https://t{s}.tianditu.gov.cn/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=072939ab9bd921a6fe546aea63310050', {
//     subdomains: ['0','1','2','3','4','5','6','7'],
//     maxZoom: 18,
//     attribution: '&copy; Zelong Guo, Basemap: &copy; Tianditu (MapWorld) contributors'
// });

// // image map
// var imgLayer = L.tileLayer('https://t{s}.tianditu.gov.cn/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=072939ab9bd921a6fe546aea63310050', {
//     subdomains: ['0','1','2','3','4','5','6','7'],
//     maxZoom: 18,
//     attribution: '&copy; Zelong Guo, Basemap: &copy; Tianditu (MapWorld) contributors'
// });

// // Terrine map
// var terLayer = L.tileLayer('https://t{s}.tianditu.gov.cn/DataServer?T=ter_w&x={x}&y={y}&l={z}&tk=072939ab9bd921a6fe546aea63310050', {
//     subdomains: ['0','1','2','3','4','5','6','7'],
//     maxZoom: 18,
//     attribution: '&copy; Zelong Guo, Basemap: &copy; Tianditu (MapWorld) contributors'
// });

// // Label layer
// var labelLayer = L.tileLayer('https://t{s}.tianditu.gov.cn/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=072939ab9bd921a6fe546aea63310050', {
//     subdomains: ['0','1','2','3','4','5','6','7'],
//     maxZoom: 18,
// });

// // set initial center and scaling
// var map = L.map('map', {
//     center: [35, 105], 
//     zoom: 4,
//     layers: [vecLayer, labelLayer] 
// });

// var baseMaps = {
//     "Vector Layer": vecLayer,
//     "Image Layer": imgLayer,
//     "Terrine Layer": terLayer
// };

// var overlayMaps = {
//     "Label": labelLayer
// };

// // layers controler
// L.control.layers(baseMaps, overlayMaps, { 
//     collapsed: false,
//     position: 'topright'  // 'topleft' | 'topright' | 'bottomleft' | 'bottomright'

// }).addTo(map);

// ---------------------------------------------------------------------------------------
const tk = '072939ab9bd921a6fe546aea63310050'; // <<< Replace with actual Tianditu API key

  // ----------- Define base map layers -----------------
  const vec = L.tileLayer(`https://t{s}.tianditu.gov.cn/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=${tk}`, {
    subdomains: ['0','1','2','3','4','5','6','7'],
    maxZoom: 18,
    attribution: '&copy; Zelong Guo, Basemap: &copy; Tianditu (MapWorld) Vector'
  });

  const img = L.tileLayer(`https://t{s}.tianditu.gov.cn/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=${tk}`, {
    subdomains: ['0','1','2','3','4','5','6','7'],
    maxZoom: 18,
    attribution: '&copy; Zelong Guo, Basemap: &copy; Tianditu (MapWorld) Satellite'
  });

  const ter = L.tileLayer(`https://t{s}.tianditu.gov.cn/DataServer?T=ter_w&x={x}&y={y}&l={z}&tk=${tk}`, {
    subdomains: ['0','1','2','3','4','5','6','7'],
    maxZoom: 18,
    attribution: '&copy; Zelong Guo, Basemap: &copy; Tianditu (MapWorld) Terrain'
  });

  // ----------- Define annotation (label) layers -----------------
  const label_vec = L.tileLayer(`https://t{s}.tianditu.gov.cn/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=${tk}`, {
    subdomains: ['0','1','2','3','4','5','6','7'],
    maxZoom: 18,
    attribution: 'Vector Labels'
  });

  const label_img = L.tileLayer(`https://t{s}.tianditu.gov.cn/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=${tk}`, {
    subdomains: ['0','1','2','3','4','5','6','7'],
    maxZoom: 18,
    attribution: 'Satellite Labels'
  });

  const label_ter = L.tileLayer(`https://t{s}.tianditu.gov.cn/DataServer?T=cta_w&x={x}&y={y}&l={z}&tk=${tk}`, {
    subdomains: ['0','1','2','3','4','5','6','7'],
    maxZoom: 18,
    attribution: 'Terrain Labels'
  });

  // ----------- Initialize map -----------------
  const map = L.map('map', {
    center: [35.0, 105.0],
    zoom: 5,
    layers: [vec, label_vec]  // Default layer: vector + labels
  });

  // ----------- Layers control -----------------
  const baseMaps = {
    "Vector Map": vec,
    "Satellite Map": img,
    "Terrain Map": ter
  };

  const overlayMaps = {
    "Vector Labels": label_vec,
    "Satellite Labels": label_img,
    "Terrain Labels": label_ter
  };

  const layerControl = L.control.layers(baseMaps, overlayMaps, {
    collapsed: false,
    position: 'topright'
  }).addTo(map);

  // // ----------- Add title to control box -----------------
  // const controlDiv = document.querySelector('.leaflet-control-layers');
  // const title = document.createElement('div');
  // title.innerText = 'Layer Control';
  // title.style.padding = '6px 10px';
  // title.style.fontWeight = 'bold';
  // title.style.background = 'rgba(255,255,255,0.9)';
  // title.style.borderBottom = '1px solid #ccc';
  // controlDiv.insertBefore(title, controlDiv.firstChild);
