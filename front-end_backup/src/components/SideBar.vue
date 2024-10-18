<template>
  <el-aside :width="sidebarWidth1 + 'px'" class="resizable-aside">
    <el-scrollbar :wrap-style="{ overflowX: 'hidden' }" class="custom-scrollbar">
      <el-menu :default-openeds="[]" :collapse="isCollapsed" @select="handleSelect">
        <el-sub-menu index="1" title>
          <template #title>
            <el-icon>
              <D class="icon-adjust" />
            </el-icon>
            文件
          </template>
          <el-menu-item index="1-1">云端文件管理</el-menu-item>
          <el-menu-item index="1-2">待定</el-menu-item>
          <el-menu-item index="1-3">待定</el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="2">
          <template #title>
            <el-icon>
              <IconMenu class="icon-adjust" />
            </el-icon>
            工具栏
          </template>
          <el-menu-item-group>
            <template #title>图层</template>
            <el-menu-item index="2-1">变更底图</el-menu-item>
            <el-menu-item index="2-2">添加图层</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="Group 2">
            <el-menu-item index="2-3">Option 3</el-menu-item>
          </el-menu-item-group>
          <el-sub-menu index="2-4">
            <template #title>Option 4</template>
            <el-menu-item index="2-4-1">Option 4-1</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>

        <el-sub-menu index="3">
          <template #title>
            <el-icon>
              <Setting class="icon-adjust" />
            </el-icon>
            设置
          </template>
          <el-menu-item-group>
            <template #title>Group 1</template>
            <el-menu-item index="3-1">Option 1</el-menu-item>
            <el-menu-item index="3-2">Option 2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="Group 2">
            <el-menu-item index="3-3">Option 3</el-menu-item>
          </el-menu-item-group>
          <el-sub-menu index="3-4">
            <template #title>Option 4</template>
            <el-menu-item index="3-4-1">Option 4-1</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
      </el-menu>

      <el-button @click="toggleCollapse" style="margin: 1px">
        <el-icon v-if="!isCollapsed">
          <DArrowLeft />
        </el-icon>
        <el-icon v-else>
          <DArrowRight />
        </el-icon>
      </el-button>
    </el-scrollbar>

    <!-- 用于拖动的divider -->
    <div class="drag-divider" @mousedown="startDragging1"></div>
    
   
  </el-aside>

  
</template>

<script setup>
import { ref} from "vue";
import { DArrowLeft, DArrowRight, Document as D, Menu as IconMenu, Message, Setting } from "@element-plus/icons-vue";
import FileManagerDrawer from './FileManagerDrawer.vue';


const emit = defineEmits(['show-file-manager']);

const handleSelect = (index) => {
  if (index === "1-1") {
    emit('show-file-manager'); // 通知父组件显示抽屉
  }
  // if(index ==="2-1"){

  // }
  // 处理其他菜单项
};

const isCollapsed = ref(false);
const sidebarWidth1 = ref(200); // 默认宽度
let isDragging = false;

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value;
  sidebarWidth1.value = isCollapsed.value ? 45 : 200; // 切换折叠状态时自动调整宽度
};

// 拖动事件
const startDragging1 = (event) => {
  isDragging = true;
  const startX = event.clientX;
  const startWidth = sidebarWidth1.value;

  const onMouseMove = (moveEvent) => {
    if (isDragging) {
      const newWidth = startWidth + (moveEvent.clientX - startX);
      if (newWidth >= 45 && newWidth <= 400) {
        // 限制宽度范围在45px到400px之间
        sidebarWidth1.value = newWidth;
      }
    }
  };

  const onMouseUp = () => {
    isDragging = false;
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  };

  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);
};

</script>

<style scoped>
.icon-adjust {
  margin-left: -8px;
}

.el-aside {
  max-height: 90vh;
  /* 设置最大高度为 90% 的视口高度 */
  overflow: hidden;
  /* 防止内容超出边界 */
  position: relative;
  display: flex;
  flex-direction: column;
  z-index: 1000;
}

.custom-scrollbar {
  overflow-x: hidden !important;
  /* 禁止横向滚动条 */
}

.drag-divider {
  width: 5px;
  background-color: #d3d3d3;
  cursor: col-resize;
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
}
</style>
