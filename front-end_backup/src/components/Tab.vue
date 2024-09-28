<!-- App.vue -->
<template>
  <div>
    <!-- 按钮区域 -->
    <div>
      <el-button size="small" type="primary" @click="addTab(false)">
        增加标签页
      </el-button>
      <el-button size="small" @click="addTab(true)">
        增加带底图的标签页
      </el-button>
      
    </div>

    <el-tabs
      v-model="editableTabsValue"
      type="card"
      class="demo-tabs"
      closable
      @tab-remove="removeTab"
    >
      <!-- 标签页内容 -->
      <el-tab-pane
        v-for="item in editableTabs"
        :key="item.name"
        :label="item.title"
        :name="item.name"
      >
        <Maincontent :show-basemap="item.showBasemap" :map-id="`viewDiv-${item.name}`"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Maincontent from './Maincontent.vue'

// 初始化标签索引
let tabIndex = 1

// 当前激活的标签值
const editableTabsValue = ref('1')

// 可编辑的标签数组
const editableTabs = ref([
  {
    title: 'default tab',
    name: '1',
    showBasemap: true, 
  },
])

// 添加新的标签页
const addTab = (showBasemap: boolean) => {
  tabIndex += 1
  const newTabName = `${tabIndex}`
  editableTabs.value.push({
    title: 'new tab',
    name: newTabName,
    showBasemap: showBasemap,
  })
  editableTabsValue.value = newTabName
}

// 删除标签页
const removeTab = (targetName: string) => {
  const tabs = editableTabs.value
  let activeName = editableTabsValue.value

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

<style>
.demo-tabs > .el-tabs__content {
  color: #6b778c;
  font-size: 18px; /* 调整为更适中的字体大小 */
  font-weight: 600;
  margin: 0; /* 移除所有外边距 */
  padding: 0; /* 移除所有内边距 */
}

/* 覆盖 el-tabs__header 的默认样式 */
.el-tabs__header {
  margin-bottom: 1px !important; /* 移除标签头部和内容之间的空隙 */
  padding: 0; /* 移除内部边距 */
}

/* 可选：调整按钮样式 */
.el-button {
  margin-right: 3px;
}
</style>

