// 注意这里使用 let 声明全局变量，以便其他脚本（如 map.js）也可以访问
let geotiffUrl;
let geotiffLayer;  // 声明在 parseGeoraster 外部！

if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    // 本地开发环境
    geotiffUrl = 'http://localhost:8000/data/DINSAR_T072A_GACOS_3_cog.tif';
} else {
    // 部署到 GitHub Pages 等线上环境，使用绝对路径
    // window.location.origin 是 https://<username>.github.io
    // window.location.pathname 是 /<repo-name>/index.html 或 /<repo-name>/
    const basePath = window.location.origin + window.location.pathname.replace(/\/[^/]*$/, '');
    geotiffUrl = `${basePath}/data/DINSAR_T072A_GACOS_3_cog.tif`;
}



// 使用 parseGeoraster 加载 GeoTIFF/COG 文件
parseGeoraster(geotiffUrl).then(georaster => {
    // 定义一个颜色比例尺来可视化形变值。
    // 假设形变值范围从 -50mm (蓝色) 到 +150mm (红色)。
    // 您需要根据您的实际数据范围调整这些值和颜色。
    var scale = chroma.scale(['blue', 'cyan', 'green', 'yellow', 'red']).domain([-50, 0, 50, 70, 90]);

    // 创建 GeoRasterLayer
    var geotiffLayer = new GeoRasterLayer({
        georaster: georaster, // 传入解析后的 georaster 对象
        opacity: 0.8,        // 设置图层透明度
        resolution: 64,      // 调整此值以平衡性能与细节。较小的值会提供更多细节但可能影响性能。
                             // 默认值通常是 64 或 128。
        pixelValuesToColorFn: function(pixelValues) {
            // pixelValues 是一个数组，包含当前像素所有波段的值。
            // 假设形变值在第一个波段 (索引 0)。
            var deformation = pixelValues; 

            // 处理无数据值 (NoData) 或无效值
            if (deformation === undefined || deformation === null || isNaN(deformation)) {
                return null; // 返回 null 使这些像素透明
            }

            // 使用定义的颜色比例尺为形变值着色
            return scale(deformation).hex();
        }
    }).addTo(eqmap);

    // 添加点击事件以显示弹出窗口
    geotiffLayer.on('click', function(event) {
        var latlng = event.latlng; // 获取点击的地理坐标
        // 获取点击位置的像素值
        geotiffLayer.getValueAtLatLng(latlng.lat, latlng.lng).then(value => {
            if (value!== undefined && value!== null) {
                L.popup()
                  .setLatLng(latlng)
                  .setContent("该点的形变: " + value + " 毫米") // 假设形变值在第一个波段
                  .openOn(eqmap);
            }
        });
    });

    // 调整地图视图以适应 GeoTIFF 的范围
    eqmap.fitBounds(geotiffLayer.getBounds());
    //  添加到图层控制器
    layerControl.addOverlay(geotiffLayer, "InSAR Deformation");
 
}).catch(error => {
    console.error("加载GeoTIFF出错:", error);
});

