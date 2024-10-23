<!-- Maincontent.vue -->
<template>
  <div>
    <!-- 根据 showBasemap 显示或隐藏地图容器 -->
    <div v-if="showBasemap" :id="mapId"></div>

    <file-manager-drawer :visible="showFileManagerDrawer" @close="handleClose" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import esriConfig from "@arcgis/core/config";
import Map from "@arcgis/core/Map"
import MapView from "@arcgis/core/views/MapView"
import Extent from "@arcgis/core/geometry/Extent.js"
import BasemapGallery from "@arcgis/core/widgets/BasemapGallery.js";
import Expand from "@arcgis/core/widgets/Expand.js";
import Locate from "@arcgis/core/widgets/Locate.js";
import Search from "@arcgis/core/widgets/Search.js";
import Graphic from '@arcgis/core/Graphic';
import FileManagerDrawer from "./FileManagerDrawer.vue"


// 定义 props 接收 showBasemap 和 mapId
const props = defineProps({
  showBasemap: Boolean,
  mapId: String,
})

console.log('showBasemap:', props.showBasemap)
console.log('mapId:', props.mapId)

// 管理 FileManagerDrawer 的可见性
const showFileManagerDrawer = ref(false)

function handleClose() {
  showFileManagerDrawer.value = false
}

// 定义 MapView 实例变量
let view: MapView | null = null
esriConfig.apiKey = ""

// 初始化地图函数
function initializeMap() {
  if (view) {
    return
  }

  const map = new Map({
    basemap: "satellite"
  })

  const hangzhouExtent = new Extent({
    xmin: 119.92,
    ymin: 30.10,
    xmax: 120.38,
    ymax: 30.43,
    spatialReference: { wkid: 4326 }
  })

  view = new MapView({
    container: props.mapId,
    map: map,
    zoom: 11,
    center: [120.1551, 30.2741],
    extent: hangzhouExtent
  })
  view.ui.components = ["attribution"]; 

  // 设置baseGallery的widget
  let basemapGallery = new BasemapGallery({
    view: view
  });
  const basemapGalleryExpand = new Expand({
    expandIcon: "layers",  // see https://developers.arcgis.com/calcite-design-system/icons/
    expandTooltip: "打开图层选择器",
    view: view,
    content: basemapGallery
  });
  view.ui.add(basemapGalleryExpand, "top-right");
  
  //设置location widget
  let locateWidget = new Locate({
    view: view,   // Attaches the Locate button to the view
    graphic: new Graphic({
      symbol: {
      type: "simple-marker",  // 使用简单标记符号
      style: "circle",        // 可选的图标类型包括：circle, square, diamond, cross, x
      color: "blue",          // 标记颜色
      size: "14px",           // 标记大小
      outline: {
        color: [255, 255, 255],
        width: 2
      }
    }})
  });
  view.ui.add(locateWidget, "top-right");

  //设置search widget
  const searchWidget = new Search({
    view: view,
    allPlaceholder: ""
  });
  view.ui.add(searchWidget, {
    position: "top-left",
    index: 2
  });

  view.when(() => {
    console.log("地图已加载完成")
  }, (error) => {
    console.error("地图加载失败", error)
  })
}

// 销毁地图函数
function destroyMap() {
  if (view) {
    view.destroy()
    view = null
    console.log("地图已销毁")
  }
}

// 在组件挂载时根据 showBasemap 初始化地图
onMounted(async () => {
  if (props.showBasemap) {
    await nextTick()
    initializeMap()
  }
})

// 在组件卸载前销毁地图，防止内存泄漏
onBeforeUnmount(() => {
  destroyMap()
})
</script>

<style scoped>

@import "https://js.arcgis.com/4.30/@arcgis/core/assets/esri/themes/dark/main.css";
@import "https://js.arcgis.com/calcite-components/2.11.1/calcite.css";
/* 使用动态 ID 的通用样式 */
[id^="viewDiv-"] {
  padding: 0;
  margin: 0;
  height: 860px;
  /* 设置一个固定高度，确保地图能够正确显示 */
  width: 100%;
  border: 1px solid #ccc;
  /* 可选：添加边框以便观察 div 是否显示 */
}

/* 自定义输入框样式 */

.esri-search__input {
  color: blue; /* 修改字体颜色 */
}


</style>
