<template>
  <el-dropdown @command="handleCommand">
    <!-- 头像组件作为触发器 -->
    <el-avatar class="custom-avatar">
      {{userName}} 
    </el-avatar>

    <!-- 下拉菜单 -->
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="profile">
          用户中心
          <el-badge v-if="getUserInfo().isAdmin" :value="pendingOrderCount"/>
          <el-badge :is-dot="hasNewOrder" :hidden="!hasNewOrder"/>
        </el-dropdown-item>
        <!-- <el-dropdown-item command="settings">设置</el-dropdown-item> -->
        <el-dropdown-item command="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import { removeUserInfo, removeToken,getUserInfo} from '../utils/storage.js';
import router from '../router/index.js';
import { logout } from '../api/user.js';
import { ElMessage, ElMessageBox } from 'element-plus';
import { useStore } from 'vuex';
import { computed } from 'vue';


const store = useStore();
const hasNewOrder = computed(()=>store.getters.hasNewOrder);
const pendingOrderCount = computed(()=>store.getters.pendingOrderCount);
const userName = getUserInfo().isAdmin?"admin":"client";
console.log(userName);
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
          store.dispatch('stopPolling') // 停止轮询
          store.commit('setLogined', false);
          store.commit('setAdminStatus', false);
          ElMessage.success("退出登录状态成功！");
          router.push('/');
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
  } 
}
</script>


<style scoped>
.hover\:cursor-pointer {
  cursor: pointer;
}

.custom-avatar {
  background-color: rgb(223, 223, 222);
  color: rgb(6, 6, 6);
  font-weight: bold;
  font-size: 10px;
}


</style>
