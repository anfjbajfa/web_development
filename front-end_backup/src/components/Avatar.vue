<template>

  <el-dropdown @command="handleCommand">
    <!-- 头像组件作为触发器 -->
    <el-avatar class="custom-avatar"> user </el-avatar>

    <!-- 下拉菜单 -->
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="profile">个人主页</el-dropdown-item>
        <el-dropdown-item command="settings">设置</el-dropdown-item>
        <el-dropdown-item command="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { removeUserInfo, removeToken } from '../utils/storage.js'
import router from '../router/index.js'
import { logout } from '../api/user.js'


function handleCommand(command) {
  
  if (command === 'logout') {
    // 执行退出登录操作
    logout().then(() => {
      removeUserInfo()
      removeToken()
      router.replace('/logout')
      console.log('退出登录')
    })
      .catch(() => {
        console.log("退出出现问题")
      })


  } else if (command === 'profile') {
    // 跳转到个人主页
    router.push('/profile')

    console.log('个人主页');
  } else if (command === 'settings') {
    // 跳转到设置页面
    console.log('设置');
  }
}

function handleAvatarClick() {
  console.log('Avatar clicked');
  console.log(router)
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