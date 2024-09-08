<template>
  <div class="flex justify-center items-center h-screen bg-gray-100">
    <div class="bg-white fade p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 class="text-2xl font-bold text-center mb-6">欢迎登录</h2>
      
      
      <form @submit.prevent="submitForm" class="space-y-4">
          
        <!-- 用户名 -->
        <div>
          <label for="userName" class="block text-sm font-medium text-gray-700">用户名</label>
          <div class="mt-1 relative rounded-md shadow-sm">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User class="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="userName"
              v-model="ruleForm.userName"
              type="text"
              placeholder=""
              class="pl-10 w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        <!-- 密码 -->
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">密码</label>
          <div class="mt-1 relative rounded-md shadow-sm">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock class="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="password"
              v-model="ruleForm.password"
              type="password"
              placeholder=""
              class="pl-10 w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        <!-- 记住我 -->
        <div class="flex items-center">
          <input id="remember" type="checkbox" class="h-4 w-4 text-indigo-600 border-gray-300 rounded">
          <label for="remember" class="ml-2 block text-sm text-gray-900">记住密码</label>
        </div>

        <!-- 登录按钮 -->
        <div>
          <button
            type="submit"
            :disabled="isLoading"
            class="w-full py-2 px-4 bg-blue-900 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
          {{ isLoading ? '正在登录...' : '登录' }}
          </button>
        </div>

        <!-- <ToolTipBox v-if="errorMessage" :message="errorMessage" /> -->
      </form>
      
      <p class="mt-6 text-center text-sm text-gray-600">
        还没有账号？
        <router-link to="/login/register" class="text-blue-900 hover:underline">注册</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { User, Lock } from "@element-plus/icons-vue";

import { login } from "../api/user";
import { setToken, setUserInfo, removeToken, removeUserInfo } from "../utils/storage";
// import { md5Encryption } from "../utils/encrypt";
import router from "../router/index";
import store from "../store";
import { ElMessage } from 'element-plus'


removeToken();
removeUserInfo();

let ruleForm = reactive({
  userName: "",
  password: "",
});


const isLoading = ref(false);

// const errorMessage = ref('')


function submitForm() {
  // 表单验证逻辑
  if (!ruleForm.userName || !ruleForm.password) {      
    ElMessage({
    message: "输入不能为空",  // 提示的消息内容
    type: "error",          // 消息的类型，比如 'success', 'warning', 'info', 'error'
    showClose: true,          // 是否显示关闭按钮
    duration:3000
    });
    return;
  }
  isLoading.value = true;
  

  login(ruleForm.userName, ruleForm.password).then(
    (data) => {
      console.log(data)
      setToken(data.token);
      setUserInfo(data.userInfo);
      
      store.commit("updateAdminInfo");
      console.log(store.state.isAdmin)
      if(store.state.isAdmin){
        router.push("/");   //去数据库页面
      } else{
        router.push("/")
      }
      
      
    }
    
  )
  
  .finally(() => {
    isLoading.value = false;
  }
  )
}
</script>

<style scoped>
.fade{
    animation: fadeIn 1s;
    
}

@keyframes fadeIn {
    0% {
        
        opacity: 0;
        
        /* opacity: 0; */
    }

    100%{
        opacity: 1;
    }
}
</style>
