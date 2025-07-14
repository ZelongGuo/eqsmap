// Note here using let to defind global variables, so that other scripts like map.js could recall
// them
let geotiffUrl;
let geotiffLayer;  // declare outside of parseGeoraster

if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    // local development env
    geotiffUrl = 'http://localhost:8000/data/DINSAR_T072A_GACOS_3_cog.tif';
} else {
    // deployed at GitHub Pages，using absoluate path
    // window.location.origin: https://<username>.github.io
    // window.location.pathname: /<repo-name>/index.html or /<repo-name>/
    const basePath = window.location.origin + window.location.pathname.replace(/\/[^/]*$/, '');
    geotiffUrl = `${basePath}/data/DINSAR_T072A_GACOS_3_cog.tif`;
}

// // using parseGeoraster for loading GeoTIFF/COG files
// parseGeoraster(geotiffUrl).then(georaster => {
//     // 定义一个颜色比例尺来可视化形变值。
//     // 假设形变值范围从 -50mm (蓝色) 到 +150mm (红色)。
//     // 您需要根据您的实际数据范围调整这些值和颜色。
//     var scale = chroma.scale(['blue', 'cyan', 'green', 'yellow', 'red']).domain([-50, 0, 50, 70, 90]);

//     // 创建 GeoRasterLayer
//     var geotiffLayer = new GeoRasterLayer({
//         georaster: georaster, // 传入解析后的 georaster 对象
//         opacity: 0.8,        // 设置图层透明度
//         resolution: 64,      // 调整此值以平衡性能与细节。较小的值会提供更多细节但可能影响性能。
//                              // 默认值通常是 64 或 128。
//         pixelValuesToColorFn: function(pixelValues) {
//             // pixelValues 是一个数组，包含当前像素所有波段的值。
//             // 假设形变值在第一个波段 (索引 0)。
//             var deformation = pixelValues; 

//             // 处理无数据值 (NoData) 或无效值
//             if (deformation === undefined || deformation === null || isNaN(deformation)) {
//                 return null; // 返回 null 使这些像素透明
//             }

//             // 使用定义的颜色比例尺为形变值着色
//             return scale(deformation).hex();
//         }
//     }).addTo(eqmap);

//     // 添加点击事件以显示弹出窗口
//     geotiffLayer.on('click', function(event) {
//         var latlng = event.latlng; // 获取点击的地理坐标
//         // 获取点击位置的像素值
//         geotiffLayer.getValueAtLatLng(latlng.lat, latlng.lng).then(value => {
//             if (value!== undefined && value!== null) {
//                 L.popup()
//                   .setLatLng(latlng)
//                   .setContent("该点的形变: " + value + " 毫米") // 假设形变值在第一个波段
//                   .openOn(eqmap);
//             }
//         });
//     });

//     // 调整地图视图以适应 GeoTIFF 的范围
//     eqmap.fitBounds(geotiffLayer.getBounds());
//     //  添加到图层控制器
//     layerControl.addOverlay(geotiffLayer, "InSAR Deformation");



// ----------------------------------------------------------------------------------------------------
function drawColorbar(scale, min, max) {
    const canvas = document.getElementById('colorbar-canvas');
    const ctx = canvas.getContext('2d');
    const width = canvas.width, height = canvas.height;

    document.getElementById('colorbar-title');

    // colorbar plotting
    for (let i = 0; i < width; i++) {
        const value = min + (i / width) * (max - min);
        ctx.fillStyle = scale(value).hex();
        ctx.fillRect(i, 0, 1, height);
    }

    const labels = document.getElementById('colorbar-labels');
    labels.innerHTML = `<span>${min}</span><span>${(min + max) / 2}</span><span>${max}</span>`;

    // // 2. 在色条内部绘制刻度数值
    // ctx.font = "bold 12px sans-serif"; // 字体加粗更清晰
    // ctx.textAlign = "center";     // 水平居中
    // ctx.textBaseline = "middle";  // 垂直居中
    // ctx.fillStyle = "black"; // 覆盖默认的黑色
    // // ctx.fillText(`${min}`, 0.2, height / 2); // 调整 x 坐标
    // // ctx.fillText("test", 0.8, height / 2); // 调整 x 坐标


    // // 定义三个刻度的值和位置
    // const labels = [
    //     { value: min, x: 40 },             // 最左侧（min）
    //     { value: (min + max) / 2, x: width / 2 }, // 中间
    //     { value: max, x: width-40 }           // 最右侧（max）
    // ];

    // labels.forEach(label => {
    //     // 绘制文字（Y 坐标为 height/2，垂直居中）
    //     ctx.fillText(`${label.value}`, label.x, height / 2);
    // });
}

function updateColorLayer(georaster) {
    const min = parseFloat(document.getElementById('colorbar-min').value);
    const max = parseFloat(document.getElementById('colorbar-max').value);
    const scale = chroma.scale('Spectral').domain([max, min]);
    drawColorbar(scale, min, max);

    // 移除旧的 geotiffLayer（如果存在）
    if (geotiffLayer) {
        eqmap.removeLayer(geotiffLayer);
        layerControl.removeLayer(geotiffLayer); // 从 layerControl 中移除
    }

    // 创建新的 geotiffLayer
    geotiffLayer = new GeoRasterLayer({
        georaster,
        opacity: 0.8,
        resolution: 64,
        pixelValuesToColorFn: value => {
            if (value == null || isNaN(value)) return null;
            return scale(value).hex();
        }
    }).addTo(eqmap);

    // 重新添加到 layerControl（仅第一次加载时执行）
    if (!geotiffLayer._addedToControl) {
        // Note you have to add it to layer control so that the deformation map can be shown in
        // different layers
        layerControl.addOverlay(geotiffLayer, "Deformation");
        geotiffLayer._addedToControl = true; // 标记已添加
    }

    eqmap.fitBounds(geotiffLayer.getBounds());
}

parseGeoraster(geotiffUrl).then(georaster => {
    updateColorLayer(georaster);
    document.getElementById('colorbar-min').addEventListener('input', () => updateColorLayer(georaster));
    document.getElementById('colorbar-max').addEventListener('input', () => updateColorLayer(georaster));

}).catch(error => {
    console.error("加载GeoTIFF出错:", error);
});

