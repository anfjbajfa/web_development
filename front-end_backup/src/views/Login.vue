<template>
  <div class="container">
    <div class="login-box">
      <h2 class="title">欢迎登录</h2>
      
      <form @submit.prevent="submitForm" class="form">
          
        <!-- 用户名 -->
        <div class="form-group">
          <label for="userName" class="label">用户名</label>
          <div class="input-container">
            <div class="icon">
              <User class="icon-image" />
            </div>
            <input
              id="userName"
              v-model="ruleForm.userName"
              type="text"
              placeholder="请输入用户名"
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
  userName: "",
  password: "",
});


const isLoading = ref(false);




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

/* 容器样式 */
.container {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center;     /* 垂直居中 */
  height: 100vh;           /* 高度为视口高度 */
  background-color: #f3f4f6; /* 等同于 Tailwind 的 bg-gray-100 */
}

/* 登录框样式 */
.login-box {
  background-color: #ffffff; /* 白色背景 */
  padding: 2rem;              /* 等同于 Tailwind 的 p-8 */
  border-radius: 0.5rem;      /* 等同于 Tailwind 的 rounded-lg */
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1); /* 等同于 Tailwind 的 shadow-lg */
  width: 100%;
  max-width: 28rem;           /* 等同于 Tailwind 的 max-w-md */
  animation: fadeIn 1s;       /* 渐入动画 */
}

/* 标题样式 */
.title {
  font-size: 1.5rem;          /* 等同于 Tailwind 的 text-2xl */
  font-weight: 700;           /* 等同于 Tailwind 的 font-bold */
  text-align: center;         /* 等同于 Tailwind 的 text-center */
  margin-bottom: 1.5rem;      /* 等同于 Tailwind 的 mb-6 */
}

/* 表单样式 */
.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;                   /* 等同于 Tailwind 的 space-y-4 */
}

/* 表单组样式 */
.form-group {
  display: flex;
  flex-direction: column;
}

/* 标签样式 */
.label {
  display: block;
  font-size: 0.875rem;        /* 等同于 Tailwind 的 text-sm */
  font-weight: 500;           /* 等同于 Tailwind 的 font-medium */
  color: #4b5563;             /* 等同于 Tailwind 的 text-gray-700 */
}

/* 输入容器样式 */
.input-container {
  position: relative;
  margin-top: 0.25rem;        /* 等同于 Tailwind 的 mt-1 */
  border-radius: 0.375rem;    /* 等同于 Tailwind 的 rounded-md */
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05); /* 等同于 Tailwind 的 shadow-sm */
}

/* 图标容器样式 */
.icon {
  position: absolute;
  top: 50%;
  left: 0.75rem;               /* 等同于 Tailwind 的 pl-3 */
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  pointer-events: none;        /* 等同于 Tailwind 的 pointer-events-none */
}

/* 图标图片样式 */
.icon-image {
  height: 1.25rem;             /* 等同于 Tailwind 的 h-5 */
  width: 1.25rem;              /* 等同于 Tailwind 的 w-5 */
  color: #9ca3af;              /* 等同于 Tailwind 的 text-gray-400 */
}

/* 输入框样式 */
.input {
  padding-left: 2.5rem;        /* 等同于 Tailwind 的 pl-10 */
  width: 100%;                 /* 等同于 Tailwind 的 w-full */
  padding-top: 0.5rem;         /* 等同于 Tailwind 的 py-2 */
  padding-bottom: 0.5rem;      /* 等同于 Tailwind 的 py-2 */
  padding-right: 0.75rem;      /* 等同于 Tailwind 的 px-3 */
  border: 1px solid #d1d5db;   /* 等同于 Tailwind 的 border border-gray-300 */
  border-radius: 0.375rem;     /* 等同于 Tailwind 的 rounded-md */
  font-family: inherit;        /* 继承字体 */
  transition: border-color 0.2s, box-shadow 0.2s; /* 等同于 Tailwind 的 focus:ring-indigo-500 focus:border-indigo-500 */
}

/* 输入框聚焦状态 */
.input:focus {
  outline: none;               /* 等同于 Tailwind 的 focus:outline-none */
  border-color: #6366f1;       /* 等同于 Tailwind 的 focus:border-indigo-500 */
  box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.5); /* 等同于 Tailwind 的 focus:ring-indigo-500 */
}

/* 复选框容器样式 */
.checkbox-container {
  display: flex;
  align-items: center;         /* 等同于 Tailwind 的 flex items-center */
}

/* 复选框样式 */
.checkbox {
  height: 1rem;                /* 等同于 Tailwind 的 h-4 */
  width: 1rem;                 /* 等同于 Tailwind 的 w-4 */
  background-color: #ffffff;   /* 默认背景 */
  border: 1px solid #d1d5db;   /* 等同于 Tailwind 的 border-gray-300 */
  border-radius: 0.25rem;      /* 等同于 Tailwind 的 rounded */
  appearance: none;
  cursor: pointer;
  position: relative;
}

/* 复选框选中状态 */
.checkbox:checked {
  background-color: #6366f1;   /* 等同于 Tailwind 的 text-indigo-600 */
  border-color: #6366f1;
}

.checkbox:checked::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0.5rem;               /* 8px */
  height: 0.25rem;             /* 4px */
  border: solid white;
  border-width: 0 0.125rem 0.125rem 0;
  transform: translate(-50%, -50%) rotate(45deg);
}

/* 复选框标签样式 */
.checkbox-label {
  margin-left: 0.5rem;         /* 等同于 Tailwind 的 ml-2 */
  font-size: 0.875rem;         /* 等同于 Tailwind 的 text-sm */
  color: #111827;              /* 等同于 Tailwind 的 text-gray-900 */
}

/* 按钮容器样式 */
.button-container {
  display: flex;
  justify-content: center;
}

/* 按钮样式 */
.button {
  width: 100%;                 /* 等同于 Tailwind 的 w-full */
  padding-top: 0.5rem;         /* 等同于 Tailwind 的 py-2 */
  padding-bottom: 0.5rem;      /* 等同于 Tailwind 的 py-2 */
  padding-left: 1rem;          /* 等同于 Tailwind 的 px-4 */
  padding-right: 1rem;         /* 等同于 Tailwind 的 px-4 */
  background-color: #1e3a8a;   /* 等同于 Tailwind 的 bg-blue-900 */
  color: #ffffff;              /* 等同于 Tailwind 的 text-white */
  font-weight: 500;            /* 等同于 Tailwind 的 font-medium */
  border: none;
  border-radius: 0.375rem;     /* 等同于 Tailwind 的 rounded-md */
  cursor: pointer;
  transition: background-color 0.2s, box-shadow 0.2s; /* 等同于 Tailwind 的 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 */
}

.button:hover {
  background-color: #4338ca;   /* 等同于 Tailwind 的 hover:bg-indigo-700 */
}

.button:disabled {
  background-color: #9ca3af;   /* 禁用状态颜色 */
  cursor: not-allowed;
}

/* 注册链接样式 */
.register-text {
  margin-top: 1.5rem;          /* 等同于 Tailwind 的 mt-6 */
  text-align: center;          /* 等同于 Tailwind 的 text-center */
  font-size: 0.875rem;         /* 等同于 Tailwind 的 text-sm */
  color: #4b5563;              /* 等同于 Tailwind 的 text-gray-600 */
}

.register-link {
  color: #1e3a8a;              /* 等同于 Tailwind 的 text-blue-900 */
  text-decoration: none;
  transition: text-decoration 0.2s;
}

.register-link:hover {
  text-decoration: underline;  /* 等同于 Tailwind 的 hover:underline */
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

