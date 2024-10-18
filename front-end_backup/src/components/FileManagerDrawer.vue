<template>
  <div :style="{ '--sidebar-width': sidebarWidth + 'px' }">
    <el-drawer
      v-model="localVisible"
      title="云端文件管理"
      direction="rtl"
      size="100%"
      :modal="false"
      :append-to-body="false"
      modal-class="custom-modal" 
      :width="sidebarWidth + 'px'"
      class="resizable-drawer"
    >
      <!-- 添加一个包裹容器，启用滚动条 -->
      <div class="drawer-content">
        <FileTree></FileTree>
      </div>
      <!-- 用于拖动的divider -->
      <div class="drag-divider_drawer" @mousedown="startDragging"></div>
    </el-drawer>
  </div>
</template>


<script setup>

import { ref, watch } from 'vue';
import FileTree from './FileTree.vue';

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(['update:visible']);

const localVisible = ref(props.visible);

watch(
  () => props.visible,
  (newVal) => {
    localVisible.value = newVal;
  }
);

watch(
  () => localVisible.value,
  (newVal) => {
    emits('update:visible', newVal);
  }
);

const sidebarWidth = ref(420); 
let isDragging = false;

const startDragging = (event) => {
  isDragging = true;
  const startX = event.clientX;
  const startWidth = sidebarWidth.value;

  const onMouseMove = (moveEvent) => {
    if (isDragging) {
      const deltaX = startX - moveEvent.clientX; // 注意这里的计算方式
      const newWidth = startWidth + deltaX;
      if (newWidth >= 250 && newWidth <= 600) {
        sidebarWidth.value = newWidth;
      }
    }
  };

  const onMouseUp = () => {
    isDragging = false;
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
};
</script>


<style>
.custom-modal {
  width: var(--sidebar-width); /* 使用 CSS 变量 */
  pointer-events: auto;
  left: auto !important;
}

/* 设置内容区域的滚动条 */
.drawer-content {
  height: 100%;
  overflow: auto !important; /* 启用纵向和横向滚动 */
}

.drag-divider_drawer {
  width: 5px;
  background-color: #d3d3d3;
  cursor: col-resize;
  position: absolute;
  left: 0; /* 将 divider 放在左侧 */
  top: 0;
  bottom: 0;
}
</style>
