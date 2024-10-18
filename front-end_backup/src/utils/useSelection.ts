// utils/useSelection.js
import { ref } from 'vue';

// 定义模块级别的响应式变量，实现单例共享
const selectedKeys = ref<string[]>([]);
const lastSelectedKey = ref<string | null>(null);

export function useSelection() {
  const selectSingle = (key: string) => {
    selectedKeys.value = [key];
    lastSelectedKey.value = key;
  };

  const selectRange = (keys: string[]) => {
    selectedKeys.value = keys;
  };

  const toggleSelect = (key: string) => {
    const index = selectedKeys.value.indexOf(key);
    if (index > -1) {
      selectedKeys.value.splice(index, 1);
    } else {
      selectedKeys.value.push(key);
    }
    lastSelectedKey.value = key;
  };

  const clearSelection = () => {
    selectedKeys.value = [];
    lastSelectedKey.value = null;
  };

  const setSelectedKeys = (keys: string[]) => {
    selectedKeys.value = keys;
  };

  return {
    selectedKeys,
    selectSingle,
    selectRange,
    toggleSelect,
    clearSelection,
    setSelectedKeys,
    lastSelectedKey,
  };
}
