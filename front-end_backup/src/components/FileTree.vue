<template>
  <el-input
    v-model="filterText"
    style="width: 260px;"
    placeholder="Filter keyword"
  />

  <el-tree
    ref="treeRef"
    style="max-width: 600px"
    class="filter-tree"
    :data="FileData"
    :props="defaultProps"
    default-expand-all
    :filter-node-method="filterNode"
  >
    <!-- 使用 render-content 插槽 -->
    <template #default="{ node, data }">
      <span>
        <!-- 根据节点类型显示不同的图标 -->
        <el-icon style="margin-right: 3px; margin-top: 10px">
          <component :is="data.directory ? Folder : Document"></component>
        </el-icon>
        <span>{{ data.label }}</span>
      </span>
    </template>
  </el-tree>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue';
import { ElTree, ElIcon } from 'element-plus';
import { listFiles } from '../api/file.js';
import { Document, Folder } from '@element-plus/icons-vue';

interface TreeNode {
  label: string;
  directory: boolean;
  children: TreeNode[];
}

const filterText = ref('');
const treeRef = ref<InstanceType<typeof ElTree>>();
const defaultProps = {
  children: 'children',
  label: 'label',
};
const FileData = ref<TreeNode[]>([]);

watch(filterText, (val) => {
  treeRef.value?.filter(val);
});

const filterNode = (value: string, data: TreeNode) => {
  if (!value) return true;
  return data.label.includes(value);
};

onMounted(async () => {
  try {
    const response = await listFiles();
    console.log('Response:', response);

    // 根据实际返回的数据结构调整
    if (response) {
      FileData.value = [response];
    } else {
      console.error('获取文件数据失败:', response);
    }
  } catch (error) {
    console.error('获取文件数据失败:', error);
  }
});
</script>

<style>
.filter-tree {
  margin-top: 20px;
}
</style>
