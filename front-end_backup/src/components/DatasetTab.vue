<template>
  <div class="dataset-tab">
    <!-- 按钮区域 -->
    <div style="margin-bottom: 8px;">
      <el-button size="small" type="primary" @click="addTab(false)">
        增加标签页
      </el-button>
      <el-button size="small" @click="addTab(true)">
        增加带底图的标签页
      </el-button>
    </div>

    <!-- 标签页 -->
    <el-tabs v-model="editableTabsValue" type="card" class="demo-tabs" closable @tab-remove="removeTab">
      <el-tab-pane v-for="item in editableTabs" :key="item.name" :label="item.title" :name="item.name">
        <!-- 把是否带底图 以及 tab 的唯一 ID 传给 Maincontent组件 -->
        <Maincontent :show-basemap="item.showBasemap" :map-id="`${item.name}`" />
      </el-tab-pane>
    </el-tabs>

    <!-- 命名tab对话框 -->
    <el-dialog title="请给标签页命名" v-model="dialogVisible" width="20%">
      <el-input v-model="inputValue"></el-input>

      <template #footer> <!-- 这里涉及到具名插槽v-slot的知识-->
        <div class="dialog-footer">
          <el-button @click="handleCancel">取消</el-button>
          <el-button type="primary" @click="handleConfirm">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Maincontent from './Maincontent.vue'
import { ElMessage } from 'element-plus'

// 所有的标签页
const editableTabs = ref([
  {
    title: '默认标签页',
    name: '1',  // name做key来循环，需要字符串或数字都可以
    showBasemap: true,
  },
])

// 当前激活的标签值
const editableTabsValue = ref('1')

// 用来生成新的标签页的序号
let tabIndex = 1

// 弹窗显隐 & 输入的标签页名称
const dialogVisible = ref(false)
const inputValue = ref('')

// 用来暂存“是否需要底图”
const showBasemap = ref(false)

/**
 * 点击按钮时，只负责打开对话框
 * 并记录是否需要底图
 */
const addTab = (needBasemap: boolean) => {
  showBasemap.value = needBasemap
  dialogVisible.value = true
}

/**
 * 用户点击“确定”时，才真正往数组里添加新标签页
 */
const handleConfirm = () => {
  // 如果没有输入名称，可以自行处理，这里做个简单判断
  if (!inputValue.value.trim()) {
    dialogVisible.value = false
    ElMessage.error("命名不能为空")
    return
  }

  tabIndex += 1

  const newTab = {
    title: inputValue.value,
    name: `${tabIndex}`,
    showBasemap: showBasemap.value,
  }

  editableTabs.value.push(newTab)
  editableTabsValue.value = newTab.name

  // 重置输入和隐藏对话框
  inputValue.value = ''
  dialogVisible.value = false
}

/**
 * 用户点击“取消”，不添加标签页
 */
const handleCancel = () => {
  // 重置 & 关闭对话框
  inputValue.value = ''
  dialogVisible.value = false
}

/**
 * 移除标签页
 */
const removeTab = (targetName: string) => {
  const tabs = editableTabs.value
  let activeName = editableTabsValue.value

  // 若当前活动标签页被删除，则让其跳转到下一个标签页或者上一个标签页
  if (activeName === targetName) {
    const targetIndex = tabs.findIndex(tab => tab.name === targetName)
    const nextTab = tabs[targetIndex + 1] || tabs[targetIndex - 1]
    if (nextTab) {
      activeName = nextTab.name
    }
  }

  editableTabsValue.value = activeName
  editableTabs.value = tabs.filter(tab => tab.name !== targetName)
}
</script>

<style scoped>

.dataset-tab{
  width:100%
}

:deep( .el-tabs__header,.el-tabs__nav-wrap.is-top) {
  margin: 0 !important;               /* 去掉默认的margin */
}

.el-tabs__header {
  margin-bottom: 1px !important;
  padding: 0;
}

/* 可选：调整按钮样式 */
.el-button {
  margin-right: 3px;
}


:deep(.el-tabs){
  width:100% !important
}

:deep(.el-tabs__content){
  width: 100% !important;
}

</style>
