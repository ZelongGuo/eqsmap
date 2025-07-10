// ----------- Custom Copyright Control (from copyright.js) -----------------
// Make sure eqmap is defined when this file is loaded (by loading map.js first in index.html)
if (typeof eqmap !== 'undefined') {
    const customCopyrightControl = L.control({position: 'bottomleft'});

    customCopyrightControl.onAdd = function (map) {
        // Create a div element and add the Leaflet default 'info legend' class name
        // In addition, add a custom 'custom-copyright-box' class name for further CSS control
        this._div = L.DomUtil.create('div', 'info legend custom-copyright-box');

        // Set background transparency
        // Leaflet's default .leaflet-control-attribution or .info.legend classes usually have a background color.
        // To make the custom control transparent, we can set the background style for the div directly in onAdd, or set it for .custom-copyright-box in the CSS file.
        // Here we set the style directly, and the last value of background-color is the alpha transparency
        this._div.style.backgroundColor = 'rgba(255, 255, 255, 0.8)'; // white, 80% transparency
        this._div.style.padding = '0px 5px 0px 5px'; // margin padding: top right bottom left
        this._div.style.borderRadius = '5px'; // circle corner

        // --- Get current year ---
        const currentYear = new Date().getFullYear();

        // Add text and image, the image size could be ajusted with width and height
        this._div.innerHTML = `
            <img src="./img/Asset.png" alt="My Logo" style="width: 34px; height: auto; vertical-align: middle; margin-right: 5px;">
            <span style="
                font-family: sans-serif, Arial; /* Set font,  sans-serif used firstly, otherwise Arial */
                font-size: 15px;
            ">Earthquake Deformation Map, &copy; <a href="https://zelongguo.github.io/" target="_blank" rel="noopener" style="text-decoration: none;">Zelong Guo</a> (${currentYear})</span>
        `;
        return this._div;
    };

    customCopyrightControl.addTo(eqmap);
} else {
    console.error("Leaflet map (eqmap) is not defined. Ensure map.js is loaded before copyright.js.");
}
