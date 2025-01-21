<!-- MainContent.vue -->
<template>
  <div>
    <!-- 根据 showBasemap 显示或隐藏地图容器 -->
    <div v-if="showBasemap" id="map" class="map-container"></div>

    <!-- 文件管理抽屉 -->
    <file-manager-drawer
      :visible="showFileManagerDrawer"
      @close="handleClose"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import FileManagerDrawer from "./FileManagerDrawer.vue"

// 导入 ArcGIS JS API 模块
import EsriMap from '@arcgis/core/Map'
import MapView from '@arcgis/core/views/MapView'
import BasemapToggle from '@arcgis/core/widgets/BasemapToggle'
import ScaleBar from '@arcgis/core/widgets/ScaleBar'
import Search from '@arcgis/core/widgets/Search'

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
    center: [120.1551, 30.2741], // 深圳坐标 [经度, 纬度]
    zoom: 12,
  })

  // 3. 等视图加载好，再添加一些常见控件
  view.when(() => {
    // 3.1 - 底图切换控件
    const basemapToggle = new BasemapToggle({
      view,
      nextBasemap: "satellite",
    })
    view.ui.add(basemapToggle, "top-right")

    // 3.2 - 比例尺控件
    const scaleBar = new ScaleBar({
      view,
      unit: "dual", // 显示米和英尺
    })
    view.ui.add(scaleBar, {
      position: "bottom-left",
    })

    // 3.3 - 搜索控件
    const searchWidget = new Search({
      view,
      popupEnabled: true, // 是否弹出搜索结果
      includeDefaultSources: true, // 是否包含默认的搜索源
    })
    view.ui.add(searchWidget, {
      position: "top-left",
      index: 0,
    })

  })
})

// 仅用于调试
console.log('showBasemap:', props.showBasemap)
console.log('mapId:', props.mapId)
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 86vh;
  /* 你想要的样式 */
}
</style>
