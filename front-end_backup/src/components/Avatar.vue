<template>
  <el-dropdown @command="handleCommand">
    <!-- 头像组件作为触发器 -->
    <el-avatar class="custom-avatar"> user </el-avatar>

    <!-- 下拉菜单 -->
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="profile">个人主页</el-dropdown-item>
        <!-- <el-dropdown-item command="settings">设置</el-dropdown-item> -->
        <el-dropdown-item command="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { removeUserInfo, removeToken } from '../utils/storage.js';
import router from '../router/index.js';
import { logout } from '../api/user.js';
import { ElMessage, ElMessageBox } from 'element-plus';
import { useStore } from 'vuex'; // 从 'vuex' 导入 useStore

const store = useStore();

function handleCommand(command) {
  if (command === 'logout') {
    ElMessageBox.confirm(
      '确定是否要退出当前账号',
      '提示',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      }
    ).then(() => {
      logout()
        .then(() => {
          removeUserInfo();
          removeToken();
          // 提交 mutation 更新登录状态
          store.commit('setLogined', false);
          store.commit('setAdminStatus', false);
          ElMessage.success("退出登录成功！");
          router.replace('/');
          console.log('退出登录');
        })
        .catch(() => {
          console.log("退出出现问题");
        });
    }).catch(() => {
      console.log("取消退出登录");
    });
  } else if (command === 'profile') {
    // 跳转到个人主页
    router.push('/profile');
    console.log('个人主页');
  } else if (command === 'settings') {
    // 跳转到设置页面
    console.log('设置');
  }
}
</script>


<style scoped>
.hover\:cursor-pointer {
  cursor: pointer;
}

.custom-avatar {
  background-color: #fcfcfc;
  color: black;
  font-weight: bold;
}
</style>
