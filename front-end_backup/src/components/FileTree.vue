<template>
  <!-- 文件过滤输入框 -->
  <el-input v-model="filterText" style="width: 260px;" placeholder="Filter keyword" />

  <!-- 文件树形结构展示 -->
  <el-tree
    ref="treeRef"
    style="max-width: 600px"
    class="filter-tree"
    :data="FileData"
    :props="defaultProps"
    default-expand-all
    :filter-node-method="filterNode"
    @node-contextmenu="showContextMenu"
  >
    <!-- 使用默认插槽渲染图标和文件名 -->
    <template #default="{ node, data }">
      <span>
        <el-icon style="margin-right: 3px; margin-top: 10px">
          <component :is="data.directory ? Folder : Document"></component>
        </el-icon>
        <span>{{ data.label }}</span>
      </span>
    </template>
  </el-tree>

  <!-- 引入 RightClickMenu 组件 -->
  <RightClickMenu />
</template>

<script lang="ts" setup>
import { ref, watch, onMounted,onBeforeUnmount } from 'vue';
import { ElTree, ElIcon } from 'element-plus';
import { listFiles } from '../api/file.js';
import { Document, Folder } from '@element-plus/icons-vue';
import RightClickMenu from './RightClickMenu.vue';
import eventBus from '../eventBus.js'; // 引入事件总线

interface TreeNode {
  label: string;
  directory: boolean;
  children: TreeNode[];
  path: string;
}

const filterText = ref('');
const treeRef = ref<InstanceType<typeof ElTree>>();
const defaultProps = { children: 'children', label: 'label' };
const FileData = ref<TreeNode[]>([]);

watch(filterText, (val) => {
  treeRef.value?.filter(val);
});

const filterNode = (value: string, data: TreeNode) => {
  return !value || data.label.includes(value);
};

const showContextMenu = (event: MouseEvent, data: TreeNode, node: any) => {
  event.preventDefault();
  eventBus.emit('show-context-menu', {
    x: event.clientX,
    y: event.clientY,
    data: data,
  });
};

onMounted(async () => {
  try {
    // 初始获取文件列表
    await fetchFileList();
    // 监听刷新事件
    eventBus.on('refresh-file-list', fetchFileList);
  } catch (error) {
    console.error('获取文件数据失败:', error);
  }
});

const fetchFileList = async () => {
  try {
    const response = await listFiles({
      headers: {
        'Cache-Control': 'no-cache'
      }
    });
    FileData.value = [response];
    console.log(FileData.value)
  } catch (error) {
    console.error('获取文件数据失败:', error);
  }
};

onBeforeUnmount(() => {
  eventBus.off('refresh-file-list', fetchFileList);
});
</script>

<style>
.filter-tree {
  margin-top: 10px;
}
</style>
