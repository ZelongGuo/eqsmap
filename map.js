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
// const tk = '072939ab9bd921a6fe546aea63310050'; // blocked with my domian name
const tk = '9110fadd0e38b69680d7ad6ea736e75a'; // for test with local host http.server
const attribution = 'Basemap: &copy; <a href="https://www.tianditu.gov.cn/" target="_blank" rel="noopener">Tianditu (MapWorld)</a>';

  // ----------- Define base map layers -----------------
  const vec = L.tileLayer(`https://t{s}.tianditu.gov.cn/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=${tk}`, {
    subdomains: ['0','1','2','3','4','5','6','7'],
    maxZoom: 18,
    attribution: `${attribution} Vector`
  });

  const img = L.tileLayer(`https://t{s}.tianditu.gov.cn/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=${tk}`, {
    subdomains: ['0','1','2','3','4','5','6','7'],
    maxZoom: 18,
    attribution: `${attribution} Satellite`
  });

  const ter = L.tileLayer(`https://t{s}.tianditu.gov.cn/DataServer?T=ter_w&x={x}&y={y}&l={z}&tk=${tk}`, {
    subdomains: ['0','1','2','3','4','5','6','7'],
    maxZoom: 18,
    attribution: `${attribution} Terrain`
  });

  // ----------- Define annotation (label) layer -----------------
  const label = L.tileLayer(`https://t{s}.tianditu.gov.cn/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=${tk}`, {
    subdomains: ['0','1','2','3','4','5','6','7'],
    maxZoom: 18,
  });


  // ----------- Initialize map -----------------
  // Note: eqmap must be globally accessible, or exported/imported via a module
  // In a browser environment, define it directly in the global scope to be accessible to other scripts
  // const eqmap = L.map('map', {
  let eqmap = L.map('map', {
    center: [35.0, 105.0],  // China
    zoom: 4,
    layers: [vec, label]  // Default layer: vector + labels
  });

  // ----------- Layers control -----------------
  const baseMaps = {
    "Vector Map": vec,
    "Satellite Map": img,
    "Terrain Map": ter
  };

  const overlayMaps = {
    "Contry/City": label,
  };

  const layerControl = L.control.layers(baseMaps, overlayMaps, {
    collapsed: false,
    position: 'topright'
  }).addTo(eqmap);

  // // ----------- Add title to control box -----------------
  // const controlDiv = document.querySelector('.leaflet-control-layers');
  // const title = document.createElement('div');
  // title.innerText = 'Layer Control';
  // title.style.padding = '6px 10px';
  // title.style.fontWeight = 'bold';
  // title.style.background = 'rgba(255,255,255,0.9)';
  // title.style.borderBottom = '1px solid #ccc';
  // controlDiv.insertBefore(title, controlDiv.firstChild);


