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
          @click="openFile"
          v-if="!isMultiple">
          打开
        </div>
        <div
          class="context-menu-item"
          @click="handleCreateDirectory">
          创建文件夹
        </div>
        <div
          class="context-menu-item"
          @click="copyFile">
          复制
        </div>
        <div class="context-menu-divider"></div>
        <div
          class="context-menu-item"
          @click="downloadFiles"
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
          @click="handleStartRenameFile"
          v-if="!isMultiple"
        >
          重命名
        </div>
        <div
          class="context-menu-item"
          @click="deleteFiles"
        >
          删除
        </div>
      </div>
    </div>
  
    <!-- 隐藏的文件上传控件 -->
    <input multiple ref="fileInput" type="file" style="display: none;" @change="handleFileUpload" />
    
    <!-- 上传进度列表 -->
    <div v-if="Object.keys(uploadProgress).length > 0" class="upload-progress-list">
      <div v-for="(progress, fileName) in uploadProgress" :key="fileName" class="upload-progress-item">
        <span>{{ fileName }}</span>
        <el-progress :percentage="progress" />
      </div>
    </div>

  </template>
  
<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount,nextTick } from 'vue';
import eventBus from '../eventBus.js';
import { downloadFileAPI, uploadFileAPI, deleteFileAPI } from '../api/file.js';
import {ElMessage} from 'element-plus';
import { useSelection } from "../utils/useSelection.js"
const {
  selectedKeys,
  
  clearSelection,
  
} = useSelection();

interface TreeNode {
  label: string;
  directory: boolean;
  children: TreeNode[];
  path: string;
}

const visible = ref(false);
const position = ref({ x: 0, y: 0 });
const selectedNode = ref<TreeNode | null>(null);

const isMultiple = ref(false); // 是否多选


const fileInput = ref<HTMLInputElement | null>(null);
const uploadProgress = ref<Record<string, number>>({});

onMounted(() => {
  eventBus.on('show-context-menu', showMenu);
  document.addEventListener('mousedown', hideContextMenu);
});

onBeforeUnmount(() => {
  eventBus.off('show-context-menu', showMenu);
  document.removeEventListener('mousedown', hideContextMenu);
});


/**
 * 显示右键菜单
 * @param {Object} param0 包含 x, y 坐标和节点数据
 */
 const showMenu = ({ x, y, data, isMultiple: multi }: { x: number; y: number; data: TreeNode; isMultiple: boolean; }) => {
  position.value = { x, y };
  selectedNode.value = data;
  isMultiple.value = multi; // 设置多选状态
  visible.value = true;
};

const hideContextMenu = (event: MouseEvent) => {
  const contextMenuElement = document.querySelector('.context-menu');
  if (contextMenuElement && !contextMenuElement.contains(event.target as Node)) {
    visible.value = false;
  }
};

// 删除选中的文件或文件夹

const deleteFiles = async () => {
  console.log(selectedKeys.value)
  if (selectedKeys.value.length === 0) {
    ElMessage.warning('请先选择要删除的文件或文件夹。');
    return;
  }

  // 定义不可删除的文件夹名称
  const fixedFolderLabels = ['余杭地区', '临平地区'];

  // 收集不可删除的文件夹
  const invalidSelections: string[] = [];
  // 收集可以删除的项
  const deletableKeys: string[] = [];

  selectedKeys.value.forEach((key) => {
    // 假设 key 是文件或文件夹的路径，标签是路径的最后一部分
    const label = key.split('/').pop();
    if (fixedFolderLabels.includes(label)) {
      ElMessage.error(`不能删除固定的目录: ${invalidSelections.join(', ')}`);
      return;
    } else{
      deletableKeys.push(key);
    }
  });


  try {
    // 批量删除文件或文件夹
    const deletePromises = deletableKeys.map((key) => deleteFileAPI(key));
    await Promise.all(deletePromises);

    ElMessage.success(`成功删除 ${deletableKeys.length} 个文件或文件夹`);

    // 删除完成后，刷新文件列表并清除选择
    eventBus.emit('refresh-file-list');
    clearSelection();
  } catch (error) {
    console.error('删除文件失败:', error);
    // 即使删除失败，也刷新文件列表以保持同步
    eventBus.emit('refresh-file-list');
  } finally {
    visible.value = false;
  }
};

const triggerFileUpload = () => {
  fileInput.value?.click();
  visible.value = false;
};

// handleFileUpload 函数，支持批量上传
const handleFileUpload = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  const files = target.files;

  if (files && files.length > 0 && selectedNode.value) {
    try {
      let targetPath = selectedNode.value.path;

      if (!selectedNode.value.directory) {
        // 如果选中的节点是文件，获取其父目录路径
        const pathSegments = targetPath.split(/[\\/]/);
        pathSegments.pop(); // 移除最后一个元素（文件名）
        targetPath = pathSegments.join('/');
      }

      console.log('上传到路径:', targetPath);

      const fileArray = Array.from(files);

      // 初始化上传进度
      fileArray.forEach(file => {
        uploadProgress.value[file.name] = 0;
      });

      // 设置并发上传数
      const concurrency = 3; // 可根据需求调整
      let index = 0;

      const uploadNext = async () => {
        if (index >= fileArray.length) return;

        const file = fileArray[index++];
        try {
          await uploadFileAPI(file, targetPath, (progress: number) => {
            uploadProgress.value[file.name] = progress;
          });
        } catch (error) {
          console.error(`上传文件失败: ${file.name}`, error);
          ElMessage.error(`上传文件失败: ${file.name}`);
        }
        await uploadNext();
      };

      const pool = [];
      for (let i = 0; i < concurrency && i < fileArray.length; i++) {
        pool.push(uploadNext());
      }

      await Promise.all(pool);

      // 上传完成后，刷新文件列表并显示成功消息
      eventBus.emit('refresh-file-list');
      ElMessage.success(`成功上传 ${fileArray.length} 个文件`);

      // 清除上传进度
      uploadProgress.value = {};
    } catch (error) {
      console.error('上传文件失败:', error);
      ElMessage.error('上传文件失败，请稍后再试');
    }

    // 重置文件输入框的值，以便可以重新上传相同的文件
    target.value = '';
  } else {
    ElMessage.error('请选择一个或多个文件和目标目录进行上传');
  }

  // 关闭上传对话框（根据您的逻辑）
  visible.value = false;
};


/**
 * 下载选中的文件或文件夹
 */
 const downloadFiles = async () => {
    if (selectedKeys.value.length === 0) {
        ElMessage.warning('请先选择要下载的文件或文件夹');
        return;
    }

    try {
        const response = await downloadFileAPI(selectedKeys.value);
        const contentDisposition = response.headers['content-disposition'];
        let fileName = 'download'; // 默认文件名

        if (contentDisposition) {
            // 尝试匹配 filename*=
            const filenameStarMatch = contentDisposition.match(/filename\*=UTF-8''([^;]+)$/i);
            if (filenameStarMatch && filenameStarMatch[1]) {
                fileName = decodeURIComponent(filenameStarMatch[1]);
            } else {
                // 尝试匹配 filename=""
                const filenameMatch = contentDisposition.match(/filename="([^"]+)"/i);
                if (filenameMatch && filenameMatch[1]) {
                    fileName = filenameMatch[1];
                }
            }
        }

        // 判断返回的文件类型是否为 zip
        const isZip = response.headers['content-type'] === 'application/zip';
        if (isZip && !fileName.endsWith('.zip')) {
            fileName += '.zip';
        } else if (!isZip && selectedKeys.value.length === 1) {
            // 如果是单文件下载，确保文件名是原始文件名
            const filePath = selectedKeys.value[0];
            const pathParts = filePath.split(/[/\\]/); // 支持 Windows 和 Unix 路径分隔符
            const originalFileName = pathParts[pathParts.length - 1];
            fileName = originalFileName || fileName;
        }

        const blob = new Blob([response.data], { type: response.headers['content-type'] });
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = fileName || 'download';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
        console.error('下载文件失败:', error);
        ElMessage.error('下载文件失败，请稍后再试');
    }

    visible.value = false;
};


const emit = defineEmits(['startCreateDirectory','startRenameFile']);
// 启动创建文件夹流程
const handleCreateDirectory = () => {
  if (selectedNode.value) {
    visible.value = false;
    // 向父组件发送事件，传递选中的节点
    emit('startCreateDirectory', selectedNode.value);
  }
};


const handleStartRenameFile = () =>{
  visible.value = false;
  // 向父组件发送事件，传递选中的节点
  emit('startRenameFile', selectedNode.value);
  console.log(selectedNode.value)
}

</script>

  
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

.upload-progress-list {
  margin-top: 10px;
}

.upload-progress-item {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}

.upload-progress-item span {
  flex: 1;
  margin-right: 10px;
}
</style>
