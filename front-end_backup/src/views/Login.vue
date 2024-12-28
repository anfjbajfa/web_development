<template>
  <div class="container">
    <div class="login-box">
      <h2 class="title">欢迎登录</h2>
      
      <form @submit.prevent="submitForm" class="form">
          
        <!-- 用户名 -->
        <div class="form-group">
          <label for="phone" class="label">电话</label>
          <div class="input-container">
            <div class="icon">
              <User class="icon-image" />
            </div>
            <input
              id="phone"
              v-model="ruleForm.phone"
              type="text"
              placeholder="请输入11位手机号"
              class="input"
            />
          </div>
        </div>

        <!-- 密码 -->
        <div class="form-group">
          <label for="password" class="label">密码</label>
          <div class="input-container">
            <div class="icon">
              <Lock class="icon-image" />
            </div>
            <input
              id="password"
              v-model="ruleForm.password"
              type="password"
              placeholder="请输入密码"
              class="input"
            />
          </div>
        </div>

        <!-- 记住我 -->
        <div class="checkbox-container">
          <input id="remember" type="checkbox" class="checkbox">
          <label for="remember" class="checkbox-label">记住密码</label>
        </div>

        <!-- 登录按钮 -->
        <div class="button-container">
          <button
            type="submit"
            :disabled="isLoading"
            class="button"
          >
            {{ isLoading ? '正在登录...' : '登录' }}
          </button>
        </div>

        <!-- 错误提示 -->
        <!-- <ToolTipBox v-if="errorMessage" :message="errorMessage" /> -->
      </form>
      
      <p class="register-text">
        还没有账号？
        <router-link to="/login/register" class="register-link">注册</router-link>
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
  phone: "",
  password: "",
});


const isLoading = ref(false);



function submitForm() {
  // 表单验证逻辑
  if (!ruleForm.phone || !ruleForm.password) {      
    ElMessage({
      message: "输入不能为空",  // 提示的消息内容
      type: "error",          // 消息的类型，比如 'success', 'warning', 'info', 'error'
      showClose: true,        
      duration: 3000
    });
    return;
  }
  isLoading.value = true;


  login(ruleForm.phone, ruleForm.password).then(
    (data) => {
      setToken(data.token);
      console.log(data.userInfo)
      setUserInfo(data.userInfo);
      ElMessage.success(`欢迎登录，${data.userInfo.phone}`)
      store.commit("setAdminStatus");
      console.log(store.state.isAdmin)
      router.push("/")    
    }
  )
  .finally(() => {
    isLoading.value = false;
  }
  )
}
</script>

<style scoped>

/* 容器样式 */
.container {
  display: flex;
  justify-content: center; 
  align-items: center;     
  height: 100vh;           
  background-color: #f3f4f6; 
}

/* 登录框样式 */
.login-box {
  background-color: #ffffff;
  padding: 32px;              
  border-radius: 8px;         
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1); 
  width: 100%;
  max-width: 448px;           
  animation: fadeIn 1s;       
}

/* 标题样式 */
.title {
  font-size: 24px;            
  font-weight: 700;           
  text-align: center;         
  margin-bottom: 24px;        
}

/* 表单样式 */
.form {
  display: flex;
  flex-direction: column;
  gap: 16px;                   
}

/* 表单组样式 */
.form-group {
  display: flex;
  flex-direction: column;
}

/* 标签样式 */
.label {
  display: block;
  font-size: 14px;            
  font-weight: 500;           
  color: #4b5563;           
}

/* 输入容器样式 */
.input-container {
  position: relative;
  margin-top: 4px;            
  border-radius: 6px;         
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05); 
}

/* 图标容器样式 */
.icon {
  position: absolute;
  top: 50%;
  left: 12px;                 
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  pointer-events: none;       
}

/* 图标图片样式 */
.icon-image {
  height: 20px;               
  width: 20px;                
  color: #9ca3af;           
}

/* 输入框样式 */
.input {
  padding-left: 40px;          
  width: 100%;                 
  padding-top: 8px;            
  padding-bottom: 8px;         
  padding-right: 12px;         
  border: 1px solid #d1d5db;    
  border-radius: 6px;          
  font-family: inherit;         
  transition: border-color 0.2s, box-shadow 0.2s;
}

/* 输入框聚焦状态 */
.input:focus {
  outline: none;              
  border-color: #6366f1;      
  box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.5);
}

/* 复选框容器样式 */
.checkbox-container {
  display: flex;
  align-items: center;         
}

/* 复选框样式 */
.checkbox {
  height: 16px;                
  width: 17px;                 
  background-color: #ffffff; 
  border: 1px solid #d1d5db; 
  border-radius: 4px;          
  appearance: none;
  cursor: pointer;
  position: relative;
}

/* 复选框选中状态 */
.checkbox:checked {
  background-color: #6366f1;  
  border-color: #6366f1;
}

.checkbox:checked::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 8px;                  
  height: 4px;                 
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: translate(-50%, -50%) rotate(45deg);
}

/* 复选框标签样式 */
.checkbox-label {
  margin-left: 8px;             
  font-size: 14px;              
  color: #111827;             
}

/* 按钮容器样式 */
.button-container {
  display: flex;
  justify-content: center;
}

/* 按钮样式 */
.button {
  width: 100%;                 
  padding-top: 8px;            
  padding-bottom: 8px;         
  padding-left: 16px;          
  padding-right: 16px;         
  background-color: #1a202c; 
  color: #ffffff;           
  font-weight: 500;            
  border: none;
  border-radius: 6px;          
  cursor: pointer;
  transition: background-color 0.2s, box-shadow 0.2s; 
}

.button:disabled {
  background-color: #9ca3af;   /* 禁用状态颜色 */
  cursor: not-allowed;
}

/* 注册链接样式 */
.register-text {
  margin-top: 24px;            
  text-align: center;          
  font-size: 14px;             
  color: #4b5563;            
}

.register-link {
  color: #1e3a8a;             
  text-decoration: none;
  transition: text-decoration 0.2s;
}

.register-link:hover {
  text-decoration: underline; 
}

/* 渐入动画 */
.fade {
  animation: fadeIn 1s;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
</style>