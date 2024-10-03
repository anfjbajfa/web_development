<!-- RightClickMenu.vue -->
<template>
    <!-- 自定义右键菜单 -->
    <div
      v-if="visible"
      :style="{ top: `${position.y}px`, left: `${position.x}px` }"
      class="context-menu"
      @contextmenu.prevent
      @mousedown.stop
    >
      <!-- 无需使用 el-card，直接使用原生元素 -->
      <div class="context-menu-card">
        <div
          class="context-menu-item"
          @click="openFile">
          打开
        </div>
        <div
          class="context-menu-item"
          @click="startCreatingDirectory">
          创建文件夹
        </div>
        <div class="context-menu-divider"></div>
        <div
          class="context-menu-item"
          @click="downloadFile"
        >
          下载
        </div>
        <div
          class="context-menu-item"
          @click="triggerFileUpload"
        >
          上传
        </div>
        <!-- 添加分隔线 -->
        <div class="context-menu-divider"></div>
        <div
          class="context-menu-item"
          @click="renameFile"
        >
          重命名
        </div>
        <div
          class="context-menu-item"
          @click="deleteFile"
        >
          删除
        </div>
      </div>
    </div>
  
    <!-- 隐藏的文件上传控件 -->
    <input ref="fileInput" type="file" style="display: none;" @change="handleFileUpload" />

    <div v-if="isCreating" class="create-folder-container">
      <input 
        v-model="newFolderName" 
        @keyup.enter="confirmCreateDirectory" 
        @keyup.esc="cancelCreateDirectory"
        ref="newFolderInput"
        class="create-folder-input"
        placeholder="输入文件夹名称"
      />
    </div>
  </template>
  
<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount,nextTick } from 'vue';
import eventBus from '../eventBus.js';
import { downloadFileAPI, uploadFileAPI, deleteFileAPI,createDirectoryAPI } from '../api/file.js';

interface TreeNode {
  label: string;
  directory: boolean;
  children: TreeNode[];
  path: string;
}

const visible = ref(false);
const position = ref({ x: 0, y: 0 });
const selectedNode = ref<TreeNode | null>(null);
const fileInput = ref<HTMLInputElement | null>(null);

onMounted(() => {
  eventBus.on('show-context-menu', showMenu);
  document.addEventListener('mousedown', hideContextMenu);
});

onBeforeUnmount(() => {
  eventBus.off('show-context-menu', showMenu);
  document.removeEventListener('mousedown', hideContextMenu);
});

const showMenu = ({ x, y, data }: { x: number; y: number; data: TreeNode }) => {
  position.value = { x, y };
  selectedNode.value = data;
  visible.value = true;
};

const hideContextMenu = (event: MouseEvent) => {
  const contextMenuElement = document.querySelector('.context-menu');
  if (contextMenuElement && !contextMenuElement.contains(event.target as Node)) {
    visible.value = false;
  }
};
// const openFile = async () => {
//   if (selectedNode.value) {
//     try {
//      //TODO
//     } catch (error) {
//       console.error('打开文件失败:', error);
//     }
//   }
//   visible.value = false;
// };

const deleteFile = async () => {
  if (selectedNode.value) {
    // 检查是否是固定的目录
    const fixedFolders = ['余杭地区', '临平地区'];
    if (
      selectedNode.value.directory &&
      fixedFolders.includes(selectedNode.value.label)
    ) {
      alert('不能删除固定的目录。');
      return;
    }
    try {
      console.log(selectedNode.value.path);
      await deleteFileAPI(selectedNode.value.path);
      eventBus.emit('refresh-file-list');
    } catch (error) {
      console.error('删除文件失败:', error);
    }
  }
  visible.value = false;
};


const triggerFileUpload = () => {
  fileInput.value?.click();
  visible.value = false;
};

const handleFileUpload = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file && selectedNode.value) {
    try {
      let targetPath = selectedNode.value.path;
      if (!selectedNode.value.directory) {
        // 如果选中的节点是文件，获取其父目录路径
        const pathSegments = targetPath.split(/[\\/]/);
        pathSegments.pop(); // 移除最后一个元素（文件名）
        targetPath = pathSegments.join('/');
      }
      console.log('上传到路径:', targetPath);
      // 调用上传接口，传递文件和目标路径
      await uploadFileAPI(file, targetPath);
      eventBus.emit('refresh-file-list');
    } catch (error) {
      console.error('上传文件失败:', error);
    }
    target.value = '';
  } else {
    alert('请选择一个文件和目标目录进行上传。');
  }
  visible.value = false;
};


const downloadFile = async () => { 
    if (selectedNode.value) {
        try {
            const response = await downloadFileAPI(selectedNode.value.path);
            const contentDisposition = response.headers['content-disposition'];
            const fileNameMatch = contentDisposition && contentDisposition.match(/filename\*=UTF-8''(.+)$/);
            const fileName = fileNameMatch ? decodeURIComponent(fileNameMatch[1]) : selectedNode.value.label;
            const blob = new Blob([response.data], { type: response.headers['content-type'] });
            const downloadUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = fileName; // 使用文件的实际名称
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(downloadUrl);
        } catch (error) {
            console.error('下载文件失败:', error);
            // 可以在这里添加用户提示
            alert('下载文件失败，请稍后再试。');
        }
    }
    visible.value = false;
};

const isCreating = ref(false);
const newFolderName = ref('');
const newFolderInput = ref<HTMLInputElement | null>(null);

// 启动创建文件夹流程
const startCreatingDirectory = async () => {
  if (selectedNode.value) {
    isCreating.value = true;
    newFolderName.value = '';
    visible.value = false;
    // 等待 DOM 更新后，自动聚焦输入框
    await nextTick();
    newFolderInput.value?.focus();
  }
};

// 确认创建文件夹
const confirmCreateDirectory = async () => {
  if (!newFolderName.value.trim()) {
    alert('文件夹名称不能为空。');
    return;
  }

  // 可选：添加更严格的验证，如禁止特殊字符
  const invalidChars = /[<>:"/\\|?*\x00-\x1F]/;
  if (invalidChars.test(newFolderName.value)) {
    alert('文件夹名称包含非法字符。');
    return;
  }

  if (selectedNode.value) {
    try {
      let parentPath = selectedNode.value.path;
      if (!selectedNode.value.directory) {
        // 如果选中的节点是文件，获取其父目录路径
        const pathSegments = parentPath.split(/[\\/]/);
        pathSegments.pop(); // 移除最后一个元素（文件名）
        parentPath = pathSegments.join('/');
      }

      // 调用创建文件夹的 API
      await createDirectoryAPI(parentPath, newFolderName.value.trim());
      alert('文件夹创建成功');
      eventBus.emit('refresh-file-list');
      isCreating.value = false;
      newFolderName.value = '';
    } catch (error) {
      console.error('创建文件夹失败:', error);
      alert('创建文件夹失败，请稍后再试。');
    }
  } else {
    alert('未选择目标目录。');
    isCreating.value = false;
  }
};

// 取消创建文件夹
const cancelCreateDirectory = () => {
  isCreating.value = false;
  newFolderName.value = '';
};
</script>

  
/* RightClickMenu.vue */
<style>
@import '@vscode/codicons/dist/codicon.css';

.context-menu {
  position: fixed;
  z-index: 1000;
  background-color: #919194;
  border: 1px solid #454545;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.7);
  border-radius: 2px;
  padding: 4px 0;
  width: 150px;
  color: #cccccc;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: 13px;
}

.context-menu-card {
  padding: 0 !important;
  background-color: transparent;
  box-shadow: none;
}

.context-menu-item {
  width: 100%;
  color: #ffffff;
  display: flex;
  align-items: center;
  text-align: left !important;
  font-size: 13px;
  padding: 5px 10px;
  line-height: 1.5;
  cursor: pointer;
  border: none;
  background-color: transparent;
  transition: background-color 0.2s;
}

.context-menu-item:hover {
  background-color: #094771;
}

.context-menu-item i {
  margin-right: 8px;
  font-size: 16px;
  vertical-align: middle;
}

.context-menu-divider {
  height: 1px;
  margin: 4px 0;
  background-color: #191818;
}

.create-folder-container {
  position: absolute;
  /* 根据需要调整位置，使其在目录视图中合适的位置 */
  top: 50px; /* 示例位置 */
  left: 50px; /* 示例位置 */
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 10px;
  z-index: 1001;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
}

.create-folder-input {
  width: 200px;
  padding: 5px;
  margin-right: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
