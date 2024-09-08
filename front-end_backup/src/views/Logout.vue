<template>
    <div class="common-layout">
      <el-container>
        <!-- Header with a larger font size and some margin -->
        <el-header style="font-size: 20px; height: 50px; margin-top: 20px;">退出成功!!</el-header>
        
        <el-main>
          <div class="mb-4">
            <!-- Buttons for homepage and closing window -->
            <el-button @click="goHome">主页</el-button>
            <el-button @click="closeWindow">关闭窗口</el-button>
          </div>
        </el-main>
      </el-container>
    </div>
  </template>
  
  <script setup>
  // 导入 Vue Router，用于跳转到主页
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  
  // 跳转到主页函数
  function goHome() {
    router.push('/')
  }
  
  // 关闭窗口函数
  function closeWindow() {
    // 调用 window.close() 关闭窗口
    window.close()
  }
  </script>
<style></style>