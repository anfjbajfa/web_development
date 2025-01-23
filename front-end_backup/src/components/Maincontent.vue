<!-- MainContent.vue -->
<template>
  <div>
    <!-- 根据 showBasemap 显示或隐藏地图容器 -->
    <div v-if="showBasemap" id="map" class="map-container"></div>

    <!-- 文件管理抽屉 -->
    <file-manager-drawer :visible="showFileManagerDrawer" @close="handleClose" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import FileManagerDrawer from "./FileManagerDrawer.vue"

// 导入 ArcGIS JS API 模块
import EsriMap from '@arcgis/core/Map'
import MapView from '@arcgis/core/views/MapView'
import ScaleBar from '@arcgis/core/widgets/ScaleBar'
import Search from '@arcgis/core/widgets/Search'
import Extent from "@arcgis/core/geometry/Extent";
import BasemapGallery from "@arcgis/core/widgets/BasemapGallery.js";
import Expand from "@arcgis/core/widgets/Expand.js";
import Locate from "@arcgis/core/widgets/Locate.js"
// 使用ArcGIS默认的UI样式，需要导入它的CSS：
import "@arcgis/core/assets/esri/themes/light/main.css"

// 接收父组件传进来的 props（或者你直接在这个组件使用也可以）
const props = defineProps({
  showBasemap: Boolean,
  mapId: String,
})

// 文件管理抽屉的开关
const showFileManagerDrawer = ref(false)
function handleClose() {
  showFileManagerDrawer.value = false
}

// 在组件挂载完成后再创建地图视图
onMounted(async () => {
  if (!props.showBasemap) {
    return
  }

  // 1. 创建地图对象
  const map = new EsriMap({
    basemap: "topo-vector",
  })

  // 2. 创建地图视图并指定容器（id="map"）
  const view = new MapView({
    container: "map",
    map,
    center: [120.1551, 30.2741],
    zoom: 12,
  })

  // 3. 等视图加载好，再添加一些常见控件
  view.when(() => {
    let basemapGallery = new BasemapGallery({
      view: view,
    });

    let GalleryExpand = new Expand({
      expandIcon: "basemap",
      view: view,
      content: basemapGallery,
      expanded: false,
    });
    view.ui.add(GalleryExpand, {
      position: "top-right",
    });

    // 3.2 - 比例尺控件
    const scaleBar = new ScaleBar({
      view,
      unit: "dual", // 显示米和英尺
    })
    view.ui.add(scaleBar, {
      position: "bottom-left",
    })

    const locateBtn = new Locate({
      view: view,
    });
    view.ui.add(locateBtn, {
      position: "top-left",
    });
    // 3.3 - 搜索控件
    const searchWidget = new Search({
      view,
      popupEnabled: true, // 是否弹出搜索结果
      includeDefaultSources: true, // 是否包含默认的搜索源
    })
    const searchExpand = new Expand({
      view:view,
      content:searchWidget,
      expanded:false
    })
    view.ui.add(searchExpand, {
      position: "top-left",
    })

  })
})

// 仅用于调试
console.log('showBasemap:', props.showBasemap)
console.log('mapId:', props.mapId)
</script>

<style scoped>
.map-container {
  width: 100% !important;
  height: 86vh !important;
  /* 你想要的样式 */
}

</style>
