<!-- Maincontent.vue -->
<template>
  <div>
    <!-- 根据 showBasemap 显示或隐藏地图容器 -->
    <div v-if="showBasemap"></div>

    <file-manager-drawer :visible="showFileManagerDrawer" @close="handleClose" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
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

</script>

<style scoped>

</style>
