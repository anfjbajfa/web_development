<template>
    <!-- 该组件不需要任何可见的模板 -->
</template>
  
  <script lang="ts" setup>

  import { ElMessageBox, ElMessage } from 'element-plus';
  import { moveFileAPI } from '../api/file.js';
  import { h } from 'vue'; // 导入 h 函数

  interface DragDropProps {
    sourcePaths: string[];
    targetPath: string;
  }
  
  const props = defineProps<DragDropProps>();
  const emit = defineEmits(['move-success', 'move-failed']);
  
  const confirmMove = async () => {
    if (props.sourcePaths.length === 0) {
        ElMessage.error('没有选中的文件');
        return;
    }

    // 定义一个辅助函数来获取路径的最后一个节点
    const getLastPathSegment = (path: string): string => {
        // 移除路径末尾的斜杠（无论是正斜杠还是反斜杠）
        const cleanedPath = path.replace(/[\\/]+$/, '');
        // 根据斜杠分割路径
        const parts = cleanedPath.split(/[\\/]/);
        // 返回最后一个部分
        return parts.pop() || '';
    };

    // 获取 targetPath 的最后一个节点
    const lastnode = getLastPathSegment(props.targetPath);


    try {
        await ElMessageBox.confirm(
          h('span', null, [
              `确定要将选中的 ${props.sourcePaths.length} 个文件移动到" `,
              h('i', { style: { fontStyle: 'italic' } }, lastnode),
              ` "文件夹下吗？`,
          ]),
            '确认移动',
            {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }
        );

        // 调用批量转移 API
        await moveFileAPI(props.sourcePaths, props.targetPath);
        
        ElMessage.success('文件转移成功');
        emit('move-success');
    } catch (error) {
        if (error !== 'cancel') {
            console.error('移动文件失败:', error);
            ElMessage.error('移动文件失败，请稍后再试');
            emit('move-failed', error);
        } else {
            emit('move-failed', error);
        }
    }
  };
  
  // 监听 props 的变化，自动触发确认
  if (props.sourcePaths.length > 0 && props.targetPath) {
    confirmMove();
  }
  </script>
  