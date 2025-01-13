<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <Header></Header>
      </el-header>
      <el-container>
          <SideBar @show-file-manager="showFileManagerDrawer = true"></SideBar>
        <el-main>
          <Tab>    
          </Tab>
          <FileManagerDrawer v-model:visible="showFileManagerDrawer"></FileManagerDrawer>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import SideBar from '../components/SideBar.vue'
import Header from '../components/DatasetHeader.vue'
import { ref } from 'vue';
import FileManagerDrawer from '../components/FileManagerDrawer.vue';
// 控制抽屉显示的变量
import Tab from '../components/Tab.vue';
const showFileManagerDrawer = ref(false);
</script>

<style>
.el-container{
  height:100vh
}

.el-header {
  background-color: #1e3a8a;
  position: relative;
  z-index: 1000;
}

.el-main {
  height: 100%;
  width: 100%;
  background: #f5f5f5;
  padding: 0 !important; 
  margin: 0;     
  display: flex; 
  flex-grow: 1;
}
</style>