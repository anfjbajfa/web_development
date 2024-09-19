<template>
  <el-drawer
    v-model="localVisible"
    title="云端文件管理"
    direction="rtl"
    size="100%"
    
    :modal="false"
    :append-to-body="true"        
    modal-class="custom-modal"  
  >
    <!-- 抽屉内容 -->
    <FileTree></FileTree>
  </el-drawer>
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

// 示例数据

</script>

<style>
.custom-modal {
  width: 20%; /* 根据需要调整遮罩层的宽度 */
  pointer-events: auto;
  left: auto !important; /* 确保遮罩层从右侧开始 */
}
</style>
