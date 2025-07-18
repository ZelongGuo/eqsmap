// // Note here using let to defind global variables, so that other scripts like map.js could recall
// // them
// let geotiffUrlAsc = [];
// let geotiffUrlDec = [];

// let geotiffLayerAsc;  // declare outside of parseGeoraster
// let geotiffLayerDec;  // declare outside of parseGeoraster

// if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
//     // local development env
//     geotiffUrlAsc = [ 
//         'http://localhost:8000/data/DINSAR_T072A_GACOS_3_cog.tif',
//         'http://localhost:8000/data/DINSAR_T174A_GACOS_3_cog.tif',
//     ];
//     geotiffUrlDec = [ 
//         'http://localhost:8000/data/DINSAR_T006D_GACOS_3_cog.tif',
//         'http://localhost:8000/data/DINSAR_T079D_GACOS_3_cog.tif',
//     ];
// } else {
//     // deployed at GitHub Pages，using absoluate path
//     // window.location.origin: https://<username>.github.io
//     // window.location.pathname: /<repo-name>/index.html or /<repo-name>/
//     const basePath = window.location.origin + window.location.pathname.replace(/\/[^/]*$/, '');
//     geotiffUrlAsc = [
//         `${basePath}/data/DINSAR_T072A_GACOS_3_cog.tif`,
//         `${basePath}/data/DINSAR_T174A_GACOS_3_cog.tif`,
//     ];
//     geotiffUrlDec = [
//         `${basePath}/data/DINSAR_T006D_GACOS_3_cog.tif`,
//         `${basePath}/data/DINSAR_T079D_GACOS_3_cog.tif`,
//     ];
// }

// // // using parseGeoraster for loading GeoTIFF/COG files
// // parseGeoraster(geotiffUrl).then(georaster => {
// //     // 定义一个颜色比例尺来可视化形变值。
// //     // 假设形变值范围从 -50mm (蓝色) 到 +150mm (红色)。
// //     // 您需要根据您的实际数据范围调整这些值和颜色。
// //     var scale = chroma.scale(['blue', 'cyan', 'green', 'yellow', 'red']).domain([-50, 0, 50, 70, 90]);

// //     // 创建 GeoRasterLayer
// //     var geotiffLayer = new GeoRasterLayer({
// //         georaster: georaster, // 传入解析后的 georaster 对象
// //         opacity: 0.8,        // 设置图层透明度
// //         resolution: 64,      // 调整此值以平衡性能与细节。较小的值会提供更多细节但可能影响性能。
// //                              // 默认值通常是 64 或 128。
// //         pixelValuesToColorFn: function(pixelValues) {
// //             // pixelValues 是一个数组，包含当前像素所有波段的值。
// //             // 假设形变值在第一个波段 (索引 0)。
// //             var deformation = pixelValues; 

// //             // 处理无数据值 (NoData) 或无效值
// //             if (deformation === undefined || deformation === null || isNaN(deformation)) {
// //                 return null; // 返回 null 使这些像素透明
// //             }

// //             // 使用定义的颜色比例尺为形变值着色
// //             return scale(deformation).hex();
// //         }
// //     }).addTo(eqmap);

// //     // 添加点击事件以显示弹出窗口
// //     geotiffLayer.on('click', function(event) {
// //         var latlng = event.latlng; // 获取点击的地理坐标
// //         // 获取点击位置的像素值
// //         geotiffLayer.getValueAtLatLng(latlng.lat, latlng.lng).then(value => {
// //             if (value!== undefined && value!== null) {
// //                 L.popup()
// //                   .setLatLng(latlng)
// //                   .setContent("该点的形变: " + value + " 毫米") // 假设形变值在第一个波段
// //                   .openOn(eqmap);
// //             }
// //         });
// //     });

// //     // 调整地图视图以适应 GeoTIFF 的范围
// //     eqmap.fitBounds(geotiffLayer.getBounds());
// //     //  添加到图层控制器
// //     layerControl.addOverlay(geotiffLayer, "InSAR Deformation");



// // ----------------------------------------------------------------------------------------------------
// function drawColorbar(scale, min, max) {
//     const canvas = document.getElementById('colorbar-canvas');
//     const ctx = canvas.getContext('2d');
//     const width = canvas.width, height = canvas.height;

//     document.getElementById('colorbar-title');

//     // colorbar plotting
//     for (let i = 0; i < width; i++) {
//         const value = min + (i / width) * (max - min);
//         ctx.fillStyle = scale(value).hex();
//         ctx.fillRect(i, 0, 1, height);
//     }

//     const labels = document.getElementById('colorbar-labels');
//     labels.innerHTML = `<span>${min}</span><span>${(min + max) / 2}</span><span>${max}</span>`;

//     // // 2. 在色条内部绘制刻度数值
//     // ctx.font = "bold 12px sans-serif"; // 字体加粗更清晰
//     // ctx.textAlign = "center";     // 水平居中
//     // ctx.textBaseline = "middle";  // 垂直居中
//     // ctx.fillStyle = "black"; // 覆盖默认的黑色
//     // // ctx.fillText(`${min}`, 0.2, height / 2); // 调整 x 坐标
//     // // ctx.fillText("test", 0.8, height / 2); // 调整 x 坐标


//     // // 定义三个刻度的值和位置
//     // const labels = [
//     //     { value: min, x: 40 },             // 最左侧（min）
//     //     { value: (min + max) / 2, x: width / 2 }, // 中间
//     //     { value: max, x: width-40 }           // 最右侧（max）
//     // ];

//     // labels.forEach(label => {
//     //     // 绘制文字（Y 坐标为 height/2，垂直居中）
//     //     ctx.fillText(`${label.value}`, label.x, height / 2);
//     // });
// }

// // ----------------------------------------------------------------------------------------------------
// function updateColorLayerAsc(georaster) {

//     const min = parseFloat(document.getElementById('colorbar-min').value);
//     const max = parseFloat(document.getElementById('colorbar-max').value);
//     const scale = chroma.scale('Spectral').domain([max, min]);
//     drawColorbar(scale, min, max);

//     // 移除旧的 geotiffLayerAsc（如果存在）
//     if (geotiffLayerAsc) {
//         eqmap.removeLayer(geotiffLayerAsc);
//         layerControl.removeLayer(geotiffLayerAsc); // 从 layerControl 中移除
//     }

//     // 创建新的 geotiffLayerAsc
//     geotiffLayerAsc = new GeoRasterLayer({
//         georaster,
//         opacity: 0.8,
//         resolution: 64,
//         pixelValuesToColorFn: value => {
//             if (value == null || isNaN(value)) return null;
//             return scale(value).hex();
//         }
//     }).addTo(eqmap);

//     // 重新添加到 layerControl（仅第一次加载时执行）
//     if (!geotiffLayerAsc._addedToControl) {
//         // Note you have to add it to layer control so that the deformation map can be shown in
//         // different layers
//         layerControl.addOverlay(geotiffLayerAsc, "Ascending");
//         geotiffLayerAsc._addedToControl = true; // 标记已添加
//     }

//     eqmap.fitBounds(geotiffLayerAsc.getBounds());
// }

// function updateColorLayerDec(georaster) {

//     const min = parseFloat(document.getElementById('colorbar-min').value);
//     const max = parseFloat(document.getElementById('colorbar-max').value);
//     const scale = chroma.scale('Spectral').domain([max, min]);
//     drawColorbar(scale, min, max);

//     // 移除旧的 geotiffLayerDec（如果存在）
//     if (geotiffLayerDec) {
//         eqmap.removeLayer(geotiffLayerDec);
//         layerControl.removeLayer(geotiffLayerDec); // 从 layerControl 中移除
//     }

//     // 创建新的 geotiffLayerDec
//     geotiffLayerDec = new GeoRasterLayer({
//         georaster,
//         opacity: 0.8,
//         resolution: 64,
//         pixelValuesToColorFn: value => {
//             if (value == null || isNaN(value)) return null;
//             return scale(value).hex();
//         }
//     }).addTo(eqmap);

//     // 重新添加到 layerControl（仅第一次加载时执行）
//     if (!geotiffLayerDec._addedToControl) {
//         // Note you have to add it to layer control so that the deformation map can be shown in
//         // different layers
//         layerControl.addOverlay(geotiffLayerDec, "Descending");
//         geotiffLayerDec._addedToControl = true; // 标记已添加
//     }

//     // eqmap.fitBounds(geotiffLayerDec.getBounds());
// }

// // parseGeoraster(geotiffUrl).then(georaster => {
// //     updateColorLayer(georaster);
// //     document.getElementById('colorbar-min').addEventListener('input', () => updateColorLayer(georaster));
// //     document.getElementById('colorbar-max').addEventListener('input', () => updateColorLayer(georaster));

// // }).catch(error => {
// //     console.error("加载GeoTIFF出错:", error);
// // });

// // 加载所有文件并渲染
// geotiffUrlAsc.forEach((url, index) => {
//     parseGeoraster(url)
//         .then(georaster => {
//             console.log(`文件 ${index + 1} 加载成功`, georaster);
//             updateColorLayerAsc(georaster); // 更新图层

//             // 监听动态调整（可选：可以为每个文件绑定独立的监听器）
//             document.getElementById('colorbar-min').addEventListener('input', () => {
//                 updateColorLayerAsc(georaster);
//             });
//             document.getElementById('colorbar-max').addEventListener('input', () => {
//                 updateColorLayerAsc(georaster);
//             });
//         })
//         .catch(error => {
//             console.error(`文件 ${index + 1} 加载失败:`, error);
//         });
// });

// geotiffUrlDec.forEach((url, index) => {
//     parseGeoraster(url)
//         .then(georaster => {
//             console.log(`文件 ${index + 1} 加载成功`, georaster);
//             updateColorLayerDec(georaster); // 更新图层

//             // 监听动态调整（可选：可以为每个文件绑定独立的监听器）
//             document.getElementById('colorbar-min').addEventListener('input', () => {
//                 updateColorLayerDec(georaster);
//             });
//             document.getElementById('colorbar-max').addEventListener('input', () => {
//                 updateColorLayerDec(georaster);
//             });
//         })
//         .catch(error => {
//             console.error(`文件 ${index + 1} 加载失败:`, error);
//         });
// });



// ========== 全局变量 ==========
let geotiffUrlAsc = [];
let geotiffUrlDec = [];
let ascLayer = null;  // 升轨图层
let decLayer = null;  // 降轨图层

// ========== 环境配置 ==========
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    geotiffUrlAsc = [
        'http://localhost:8000/data/DINSAR_T072A_GACOS_3_cog.tif',
        'http://localhost:8000/data/DINSAR_T174A_GACOS_3_cog.tif',
    ];
    geotiffUrlDec = [
        'http://localhost:8000/data/DINSAR_T006D_GACOS_3_cog.tif',
        'http://localhost:8000/data/DINSAR_T079D_GACOS_3_cog.tif',
    ];
} else {
    const basePath = window.location.origin + window.location.pathname.replace(/\/[^/]*$/, '');
    geotiffUrlAsc = [
        `${basePath}/data/DINSAR_T072A_GACOS_3_cog.tif`,
        `${basePath}/data/DINSAR_T174A_GACOS_3_cog.tif`,
    ];
    geotiffUrlDec = [
        `${basePath}/data/DINSAR_T006D_GACOS_3_cog.tif`,
        `${basePath}/data/DINSAR_T079D_GACOS_3_cog.tif`,
    ];
}

// ========== 色条绘制函数 ==========
function drawColorbar(scale, min, max) {
    const canvas = document.getElementById('colorbar-canvas');
    if (!canvas) {
        console.error("找不到 #colorbar-canvas 元素");
        return;
    }

    const ctx = canvas.getContext('2d');
    const width = canvas.width, height = canvas.height;

    // 清除画布
    ctx.clearRect(0, 0, width, height);

    // 绘制色条
    for (let i = 0; i < width; i++) {
        const value = min + (i / width) * (max - min);
        ctx.fillStyle = scale(value).hex();
        ctx.fillRect(i, 0, 1, height);
    }

    // 更新标签
    const labels = document.getElementById('colorbar-labels');
    if (labels) {
        labels.innerHTML = `<span>${min.toFixed(1)}</span>
                                <span>${((min + max) / 2).toFixed(1)}</span>
                                <span>${max.toFixed(1)}</span>`;
    }
}

// ========== 创建单个图层 ==========
async function createSingleLayer(url, layerName) {
    try {
        const georaster = await parseGeoraster(url);
        console.log(`${layerName} 文件加载成功: ${url}`, georaster);

        // 获取当前色条设置
        const min = parseFloat(document.getElementById('colorbar-min').value);
        const max = parseFloat(document.getElementById('colorbar-max').value);
        const scale = chroma.scale('Spectral').domain([max, min]);

        return new GeoRasterLayer({
            georaster: georaster,
            opacity: 0.8,
            resolution: 64,
            pixelValuesToColorFn: value => {
                if (value == null || isNaN(value)) return null;
                return scale(value).hex();
            }
        });
    } catch (error) {
        console.error(`${layerName} 文件加载失败: ${url}`, error);
        throw error;
    }
}

// ========== 创建图层组 ==========
async function createLayerGroup(urls, groupName) {
    try {
        const layers = [];

        // 为每个URL创建图层
        for (const url of urls) {
            const layer = await createSingleLayer(url, groupName);
            layers.push(layer);
        }

        // 创建图层组
        const layerGroup = L.layerGroup(layers);

        // 添加到地图
        layerGroup.addTo(eqmap);

        return layerGroup;
    } catch (error) {
        console.error(`创建 ${groupName} 图层组失败:`, error);
        throw error;
    }
}

// ========== 更新所有图层 ==========
function updateAllLayers() {
    const minInput = document.getElementById('colorbar-min').value;
    const maxInput = document.getElementById('colorbar-max').value;
    
    if (!minInput || !maxInput) return; // 防止空值
    
    const min = parseFloat(minInput);
    const max = parseFloat(maxInput);
    
    if (isNaN(min) || isNaN(max)) {
        console.error("Invalid colorbar range values");
        return;
    }

    const scale = chroma.scale('Spectral').domain([max, min]);
    drawColorbar(scale, min, max);

    // 更新升轨图层
    if (ascLayer) {
        ascLayer.eachLayer(layer => {
            layer.options.pixelValuesToColorFn = value => 
                (value == null || isNaN(value)) ? null : scale(value).hex();
            layer.redraw();
        });
    }

    // 更新降轨图层
    if (decLayer) {
        decLayer.eachLayer(layer => {
            layer.options.pixelValuesToColorFn = value => 
                (value == null || isNaN(value)) ? null : scale(value).hex();
            layer.redraw();
        });
    }
}

// ========== 初始化地图 ==========
async function initMap() {
    // 初始化色条
    const initialMin = parseFloat(document.getElementById('colorbar-min').value);
    const initialMax = parseFloat(document.getElementById('colorbar-max').value);
    const initialScale = chroma.scale('Spectral').domain([initialMax, initialMin]);
    drawColorbar(initialScale, initialMin, initialMax);

    try {
        // 创建并添加升轨图层组
        ascLayer = await createLayerGroup(geotiffUrlAsc, "Ascending");
        layerControl.addOverlay(ascLayer, "Ascending");

        // 创建并添加降轨图层组
        decLayer = await createLayerGroup(geotiffUrlDec, "Descending");
        layerControl.addOverlay(decLayer, "Descending");

        // 设置初始视图（以升轨图层组的第一个图层的范围为准）
        const firstLayer = ascLayer.getLayers()[0];
        if (firstLayer) {
            eqmap.fitBounds(firstLayer.getBounds());
        }

        // 添加点击事件
        ascLayer.eachLayer(layer => {
            layer.on('click', function(event) {
                handleLayerClick(event, layer, "Ascending");
            });
        });

        decLayer.eachLayer(layer => {
            layer.on('click', function(event) {
                handleLayerClick(event, layer, "Descending");
            });
        });

    } catch (error) {
        console.error("初始化图层失败:", error);
    }

    // 添加统一的事件监听器
    document.getElementById('colorbar-min').addEventListener('input', updateAllLayers);
    document.getElementById('colorbar-max').addEventListener('input', updateAllLayers);
}

// ========== 处理图层点击事件 ==========
function handleLayerClick(event, layer, layerName) {
    const latlng = event.latlng;

    layer.getValueAtLatLng(latlng.lat, latlng.lng).then(value => {
        if (value !== undefined && value !== null) {
            L.popup()
                .setLatLng(latlng)
                .setContent(`${layerName} 形变值: ${value.toFixed(2)} mm`)
                .openOn(eqmap);
        }
    });
}

// ========== 执行初始化 ==========
initMap();
