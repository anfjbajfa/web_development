<template>
    <div class="header">
      <!-- 左侧的内容 -->
      <div class="header-left">
        <el-dropdown @command="handleCommand">
          <el-button class="menu-btn" type="text">
            <el-icon class="HomeFilledCSS">
              <HomeFilled />
            </el-icon>
          </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="main">主页</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
  
      <!-- 右侧的内容 -->
      <div class="header-right">
        <Avatar></Avatar> 
      </div>
    </div>
  </template>
  
  <script setup>
  import { HomeFilled } from '@element-plus/icons-vue';
  import Avatar from './Avatar.vue'; // 修正 Avatar 的导入
  import router from '../router/index';
  
  const handleCommand = (command) => {
    switch (command) {
      case 'main':
        router.push('/');
        break;
      default:
        break;
    }
  };
  </script>
  
  <style scoped>
  .header {
    display: flex;         /* 确保左右部分水平排列 */
    justify-content: space-between; /* 左右两边有足够的空间 */
    align-items: center;   /* 垂直居中 */
    height: 60px;
  }
  
  .header-left {
    display: flex;
    align-items: center;
  }
  
  .header-right {
    display: flex;
    align-items: center;
  }
  
  .HomeFilledCSS {
    font-size: 27px;
    color: white;
  }
  </style>
  