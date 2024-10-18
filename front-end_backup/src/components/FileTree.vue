<template>
  <!-- 文件过滤输入框 -->
  <el-input v-model="filterText" style="width: 260px;" placeholder="Filter keyword" />

  <!-- 文件树形结构展示 -->
  <div ref="treeContainerRef" class="tree-container">
  <el-tree ref="treeRef" class="filter-tree" :data="FileData" :props="defaultProps" node-key="path" default-expand-all
    :filter-node-method="filterNode" @node-contextmenu="showContextMenu" draggable @node-drop="handleNodeDrop" @node-drag-start="handleDragStart"
    :highlight-current="false">
    <!-- 使用默认插槽渲染图标和文件名 -->
    <template #default="{ node, data }">
      <div :class="['el-tree-node__content', { 'selected-node': isSelected(data.path) }]"
        @click="handleNodeClick(data, $event)">
        <span class="custom-tree-node">
          <el-icon style="margin-right: 3px;">
            <component :is="data.directory ? Folder : Document"></component>
          </el-icon>
          <!-- 判断是否处于编辑状态 -->
          <!-- 判断是否处于编辑状态 -->
          <template v-if="data.isEditing">
            <!-- 重命名文件 -->
            <template v-if="renamingNode && renamingNode.path === data.path">
              <input
                v-model="renamingNode.baseName"
                @keydown.enter.prevent="confirmRenameFile"
                @keydown.esc.stop.prevent="cancelRenameFile"
                ref="renameInputRef"
                class="rename-input"
              />
              <span class="rename-extension">{{ renamingNode.extension }}</span>
            </template>
            <!-- 创建新文件夹 -->
            <template v-else>
              <input
                v-model="data.label"
                @keydown.enter.prevent="confirmCreateDirectory(data)"
                @keydown.esc.stop.prevent="cancelCreateDirectory(data)"
                ref="createFolderInputRef"
                class="create-folder-input"
              />
            </template>
          </template>
          <template v-else>
            <span>{{ data.label }}</span>
          </template>
        </span>
      </div>
    </template>
  </el-tree>
  </div>

  <!-- 引入 RightClickMenu 组件，并监听 startCreateDirectory 事件 -->
  <RightClickMenu @startCreateDirectory="handleStartCreateDirectory" @startRenameFile="handleStartRenameFile"/>

  <!-- 引入 DragDropHandler 组件 -->
  <DragDropHandler v-if="dragging" :sourcePaths="selectedPaths" :targetPath="dropTargetPath"
    @move-success="handleMoveSuccess" @move-failed="handleMoveFailed" />
</template>


<script lang="ts" setup>
import { ref, watch, onMounted, onBeforeUnmount, nextTick } from 'vue';
import { ElTree, ElIcon, ElMessage } from 'element-plus';
import { listFiles, createDirectoryAPI, renameFileAPI } from '../api/file.js';
import { Document, Folder } from '@element-plus/icons-vue';
import RightClickMenu from './RightClickMenu.vue';
import DragDropHandler from './DragDropHandler.vue';
import eventBus from '../eventBus.js';
import { findParentNode,findNodeByPath } from '../utils/findParentNode';
import { useGlobalClickHandler } from '../utils/handleGlobalClick';
import { useSelection } from '../utils/useSelection';



interface TreeNode {
  label: string;
  directory: boolean;
  children: TreeNode[];
  path: string;
  isEditing?: boolean;
  isNew?: boolean;
}
// 这里防止eltree在移动文件时的自动效果
const originalFileData = ref<TreeNode[]>([]); // 备份 FileData

const handleDragStart = (draggingNode: any, ev: any) => {
  originalFileData.value = JSON.parse(JSON.stringify(FileData.value)); // 深拷贝
};
const filterText = ref('');
const treeRef = ref<InstanceType<typeof ElTree>>();
const treeContainerRef = ref(null);
const defaultProps = { children: 'children', label: 'label' };
const FileData = ref<TreeNode[]>([]);

const dragging = ref(false); // 是否正在拖拽
const selectedPaths = ref<string[]>([]); // 要移动的文件路径
const dropTargetPath = ref<string>(''); // 目标文件夹路径

  // 管理当前正在新建的节点
const currentCreatingNode = ref<TreeNode | null>(null);

// 输入框的 ref
const renameInputRef = ref<HTMLInputElement | null>(null);
const createFolderInputRef = ref<HTMLInputElement | null>(null);

// 使用 useSelection 管理多选状态
const {
  selectedKeys,
  selectSingle,
  selectRange,
  toggleSelect,
  clearSelection,
  setSelectedKeys,
  lastSelectedKey,
} = useSelection();

// 中央取消函数
const cancelAllEdits = () => {
  // 取消重命名
  if (renamingNode.value) {
    const node = findNodeByPath(FileData.value, renamingNode.value.path);
    if (node) {
      node.isEditing = false;
    }
    renamingNode.value = null;
  }

  // 取消创建文件夹
  if (currentCreatingNode.value) {
    cancelCreateDirectory(currentCreatingNode.value);
  }
};
// ---------------------------------------------------------------------------
// 创建扁平化的节点列表
const flatNodeList = ref<string[]>([]);

// 构建扁平化节点列表的函数
const buildFlatNodeList = (nodes: TreeNode[], list: string[] = []) => {
  nodes.forEach(node => {
    list.push(node.path);
    if (node.children && node.children.length > 0) {
      buildFlatNodeList(node.children, list);
    }
  });
  return list;
};

// 生成扁平化的节点列表
watch(
  () => FileData.value,
  (newVal) => {
    flatNodeList.value = buildFlatNodeList(newVal);
  },
  { immediate: true, deep: true }
);

// 处理节点点击事件，实现 Shift + Click 和 Ctrl/Cmd + Click
const handleNodeClick = (data: TreeNode, event: MouseEvent) => {
  event.stopPropagation(); // 防止事件冒泡，避免触发全局点击事件
  cancelAllEdits();
  const currentKey = data.path;
  if (event.shiftKey && lastSelectedKey.value) {
    // Shift + Click 逻辑
    const currentIndex = flatNodeList.value.indexOf(currentKey);
    const lastIndex = flatNodeList.value.indexOf(lastSelectedKey.value);
    if (currentIndex === -1 || lastIndex === -1) {
      toggleSelect(currentKey);
    } else {
      const [start, end] = currentIndex > lastIndex ? [lastIndex, currentIndex] : [currentIndex, lastIndex];
      const rangeKeys = flatNodeList.value.slice(start, end + 1);
      selectRange(rangeKeys);
    }
  } else if (event.ctrlKey || event.metaKey) {
    // Ctrl/Cmd + Click 逻辑
    toggleSelect(currentKey);
    lastSelectedKey.value = currentKey;
  } else {
    // 单击逻辑，清除其他选中并选中当前
    selectSingle(currentKey);
    lastSelectedKey.value = currentKey;
  }
};

// 判断节点是否被选中
const isSelected = (key: string) => {
  return selectedKeys.value.includes(key);
};

const handleNodeDrop = async (
  draggingNode: any,
  dropNode: any,
  type: string,
  ev: any
) => {
  if (dragging.value) {
    // 已经在处理一个拖拽操作，阻止新的拖拽
    ElMessage.warning('正在处理另一个移动操作，请稍后再试');
    return;
  }

  let targetNode = dropNode;

  // 如果目标节点不存在或不是文件夹，找到最近的父目录
  if (!dropNode || !dropNode.data.directory) {
    const parentNode = findParentNode(FileData.value, dropNode.data);
    if (parentNode) {
      targetNode = { data: parentNode };
    } else {
      ElMessage.error('无法找到目标文件夹。');
      eventBus.emit('refresh-file-list');
      return;
    }
  }

  // 获取选中的文件路径
  const selectedPathsTemp =
    selectedKeys.value.length > 0
      ? selectedKeys.value
      : [draggingNode.data.path];

  // 设置拖拽相关的状态
  selectedPaths.value = selectedPathsTemp;
  dropTargetPath.value = targetNode.data.path;
  dragging.value = true; // 触发 DragDropHandler 组件显示

  // 恢复 FileData 以撤销 ElTree 自动更新
  FileData.value = JSON.parse(JSON.stringify(originalFileData.value));

};


// 处理移动成功
const handleMoveSuccess = async () => {
  dragging.value = false;
  clearSelection(); // 清空选中的节点
  selectedPaths.value = [];
  dropTargetPath.value = '';
  await fetchFileList(); // 刷新文件树数据
};

// 处理移动失败
const handleMoveFailed = (error: any) => {
  dragging.value = false;

  if (error !== 'cancel') {
    ElMessage.error('文件移动失败，请稍后再试');
  } else {
    ElMessage.info('文件移动已取消');
  }

  // 恢复 FileData 到拖拽前的状态
  FileData.value = JSON.parse(JSON.stringify(originalFileData.value));
  
  // 清空选中状态和目标路径
  clearSelection();
  selectedPaths.value = [];
  dropTargetPath.value = '';
};

// 过滤功能
watch(filterText, (val) => {
  treeRef.value?.filter(val);
});

const filterNode = (value: string, data: TreeNode) => {
  return !value || data.label.includes(value);
};


const showContextMenu = (event: MouseEvent, data: TreeNode, node: any) => {
  event.preventDefault();
  cancelAllEdits();
  // 如果没有选中任何项，则默认选中当前项
  if (selectedKeys.value.length === 0) {
    selectSingle(data.path);
    lastSelectedKey.value = data.path;
  }

  // 判断是否为多选以及是否所有选中的节点都是文件夹
  const isMultiple = selectedKeys.value.length > 1;

  // 通过 eventBus 传递额外的信息
  eventBus.emit('show-context-menu', {
    x: event.clientX,
    y: event.clientY,
    data: data,
    isMultiple: isMultiple,
  });
};
// -------------------------------------------------------------
// 生命周期钩子
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

onBeforeUnmount(() => {
  eventBus.off('refresh-file-list', fetchFileList);
});

// 使用增强版的全局点击处理钩子
useGlobalClickHandler(
  [treeContainerRef, renameInputRef, createFolderInputRef],
  () => {
    // 点击了输入框之外的区域
    selectedKeys.value = [];

    // 如果正在重命名，取消重命名
    if (renamingNode.value) {
      cancelRenameFile();
    }

    // 如果正在新建文件夹，取消新建
    if (currentCreatingNode.value) {
      cancelCreateDirectory(currentCreatingNode.value);
    }
  }
);

const fetchFileList = async () => {
  try {
    const response = await listFiles();
    FileData.value = [response];
  } catch (error) {
    ElMessage.error('获取文件数据失败:', error);
  }
};

// ----------------------------------------------
// 创建文件夹逻辑
const handleStartCreateDirectory = async (targetNode: TreeNode) => {
  cancelAllEdits();
  if (!targetNode) {
    ElMessage.error('未指定创建文件夹的目标节点');
    return;
  }

  let parentNode = targetNode;
  if (!targetNode.directory) {
    // 如果是文件，找到父节点
    parentNode = findParentNode(FileData.value, targetNode);
    if (!parentNode) {
      ElMessage.error('无法找到父目录');
      return;
    }
  }

  const newNode: TreeNode = {
    label: '',
    directory: true,
    children: [],
    path: '',
    isNew: true,
    isEditing: true,
  };

  if (!parentNode.children) {
    parentNode.children = [];
  }
  parentNode.children.unshift(newNode);

  // 展开父节点
  const treeNode = treeRef.value?.getNode(parentNode);
  if (treeNode) {
    treeNode.expand();
  }

  // 设置当前正在创建的节点
  currentCreatingNode.value = newNode;

  await nextTick();
  // 自动聚焦输入框
  if (createFolderInputRef.value) {
    createFolderInputRef.value.focus();
  }
};

// 确认创建文件夹
const confirmCreateDirectory = async (nodeData: TreeNode) => {
  if (!nodeData.label.trim()) {
    ElMessage.error('文件夹名称不能为空');
    return;
  }

  // 检查非法字符
  const invalidChars = /[<>:"/\\|?*\x00-\x1F]/;
  if (invalidChars.test(nodeData.label)) {
    ElMessage.error('文件夹名称包含非法字符');
    return;
  }

  const parentNode = findParentNode(FileData.value, nodeData);
  if (!parentNode) {
    ElMessage.error('无法找到父目录');
    return;
  }

  try {
    const parentPath = parentNode.path;
    await createDirectoryAPI(parentPath, nodeData.label.trim());
    nodeData.isEditing = false;
    nodeData.isNew = false;
    nodeData.path = `${parentPath}/${nodeData.label.trim()}`;
    eventBus.emit('refresh-file-list');
    ElMessage.success('文件夹创建成功');

    // 清空当前正在创建的节点
    currentCreatingNode.value = null;
  } catch (error) {
    console.error('创建文件夹失败:', error);
    ElMessage.error('创建文件夹失败，请稍后再试');
  }
};

// 取消创建文件夹
const cancelCreateDirectory = (nodeData: TreeNode) => {
  const parentNode = findParentNode(FileData.value, nodeData);
  if (parentNode && parentNode.children) {
    const index = parentNode.children.indexOf(nodeData);
    if (index !== -1) {
      parentNode.children.splice(index, 1);
    }
  }

  // 清空当前正在创建的节点
  if (currentCreatingNode.value === nodeData) {
    currentCreatingNode.value = null;
  }
};

// ---------------------------------------------------------
// 新增：管理当前正在重命名的节点
const renamingNode = ref<{ path: string, baseName: string, extension: string } | null>(null);

const handleStartRenameFile = (nodeData: TreeNode) => {    //nodeData是传入的节点
  cancelAllEdits();

  if (renamingNode.value) {
    ElMessage.warning('另一个重命名操作正在进行');
    return;
  }

  const label = nodeData.label;
  const lastDotIndex = label.lastIndexOf('.');
  let baseName = label;
  let extension = '';
  if (lastDotIndex !== -1) {
    baseName = label.substring(0, lastDotIndex);
    extension = label.substring(lastDotIndex);
  }

  renamingNode.value = { path: nodeData.path, baseName, extension };
  nodeData.isEditing = true;

  nextTick(() => {
    if (renameInputRef.value) {
      renameInputRef.value.focus();
      renameInputRef.value.select(); // 可选
    }
  });
};

// 新增：确认重命名文件
const confirmRenameFile = async () => {
  if (!renamingNode.value) return;
  const { path, baseName, extension } = renamingNode.value;
  if (!baseName.trim()) {
    ElMessage.error('文件名称不能为空');
    return;
  }

  // 检查非法字符
  const invalidChars = /[<>:"/\\|?*\x00-\x1F]/;
  if (invalidChars.test(baseName)) {
    ElMessage.error('文件名称包含非法字符');
    return;
  }

  const node = findNodeByPath(FileData.value, path);
  if (!node) {
    ElMessage.error('无法找到文件');
    return;
  }

  console.log("path是"+path)
  const newLabel = baseName + extension;
  const parentNode = findParentNode(FileData.value, node);
  console.log("父路径是："+ parentNode.path)
  if (!parentNode) {
    ElMessage.error('无法找到父目录');
    return;
  }

  try {
    await renameFileAPI(node.path, `${parentNode.path}/${newLabel}`);
    node.label = newLabel;
    node.path = `${parentNode.path}/${newLabel}`;
    node.isEditing = false;
    renamingNode.value = null;
    eventBus.emit('refresh-file-list');
    ElMessage.success('文件重命名成功');
  } catch (error) {
    console.error('重命名文件失败:', error);
    ElMessage.error('重命名文件失败，请稍后再试');
  }
};

// 新增：取消重命名文件
const cancelRenameFile = () => {
  if (!renamingNode.value) return;
  const { path } = renamingNode.value;
  const node = findNodeByPath(FileData.value, path);
  if (node) {
    node.isEditing = false;
  }
  renamingNode.value = null;
};


</script>

<style scoped>

.filter-tree {
  margin-top: 10px;
  min-width: 120%; /* 设置一个超过父容器的宽度 */
}

/* 让节点内容占满整行 */
.el-tree-node__content {
  display: flex;
  align-items: center;
  width: 100%;
  padding-right: 8px;
  /* 可根据需要调整右侧内边距 */
  box-sizing: border-box;
}

/* 高亮选中的节点 */
.selected-node {
  background-color: #b5d7fa !important;
  /* 浅蓝色背景 */
  color: #000 !important;
  /* 黑色文字 */

}

/* 自定义节点内容布局 */
.custom-tree-node {
  display: flex;
  align-items: center;
}

/* 自定义输入框样式 */
.create-folder-input {
  width: 150px;
  padding: 5px;
  margin-left: 5px;
  border: 1px solid #ccc;
  height: 20px;
}

.rename-input {
  width: auto;
  padding: 5px;
  margin-left: 5px;
  border: 1px solid #ccc;
  height: 20px;
}

.rename-extension {
  margin-left: 5px;
  line-height: 20px;
}
</style>
