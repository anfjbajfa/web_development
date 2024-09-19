<template>
  <div id="viewDiv"></div>
  <file-manager-drawer :visible="showFileManagerDrawer" @close="handleClose" />
</template>

<script setup>
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import Extent from "@arcgis/core/geometry/Extent.js";
import FileManagerDrawer from './FileManagerDrawer.vue';
import { onMounted } from "vue";

onMounted(() => {
  // 创建地图对象
  const map = new Map({
    basemap: "streets"  
  });

  // 定义杭州的范围
  const hangzhouExtent = new Extent({
    xmin: 119.92,  // 最小经度
    ymin: 30.10,   // 最小纬度
    xmax: 120.38,  // 最大经度
    ymax: 30.43,   // 最大纬度
    spatialReference: { wkid: 4326 }  // WGS 84 坐标系
  });

  // 定义视图对象
  const view = new MapView({
    container: "viewDiv", 
    map: map,
    zoom: 11,
    center: [120.1551, 30.2741],  // 设置杭州的中心点
    extent: hangzhouExtent         // 限制地图显示的范围
  });

  // 如果需要设置地图初始缩放以刚好展示整个范围
  view.extent = hangzhouExtent;
});
  

</script>

<style scoped>
#viewDiv {
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
  
}

</style>
