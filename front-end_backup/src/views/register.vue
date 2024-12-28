<template>
  <div class="container">
    <!-- Registration Form Container -->
    <div class="form-container fade">

      <h2 class="form-title">欢迎注册</h2>

      <form @submit.prevent="submitRegisterForm" class="form">

        <!-- Phone Field -->
        <div class="form-group">
          <label for="phone" class="form-label">手机号</label>
          <div class="input-group">
            <div class="input-icon">
              <Iphone class="icon" />
            </div>
            <input id="phone" v-model="ruleForm.phone" type="text" placeholder="请输入手机号作为登录时用户名" class="form-input" />
          </div>
        </div>

        <!-- Password Field -->
        <div class="form-group">
          <label for="password" class="form-label">创建密码</label>
          <div class="input-group">
            <div class="input-icon">
              <Lock class="icon" />
            </div>
            <input id="password" v-model="ruleForm.password" type="password" placeholder="请输入密码" class="form-input" />
          </div>
        </div>

        <!-- Confirm Password Field -->
        <div class="form-group">
          <label for="confirmPassword" class="form-label">验证密码</label>
          <div class="input-group">
            <div class="input-icon">
              <Unlock class="icon" />
            </div>
            <input id="confirmPassword" v-model="ruleForm.confirmPassword" type="password" placeholder="请再次输入密码"
              class="form-input" @input="validatePassword" @focus="hasInteracted = true" />

            <!-- Error Icon: Displayed when user has interacted and password is invalid -->
            <div v-if="hasInteracted && !isPasswordValid" class="input-status-icon error">
              <svg class="status-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-8a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z"
                  clip-rule="evenodd" />
              </svg>
            </div>

            <!-- Success Icon: Displayed when user has interacted and password is valid -->
            <div v-if="hasInteracted && isPasswordValid" class="input-status-icon success">
              <svg class="status-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1.293-6.707a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-2-2z"
                  clip-rule="evenodd" />
              </svg>
            </div>
          </div>
        </div>

        <!-- Verification Code Input Field (conditionally rendered) -->
        <div v-if="hasSentVerification" class="form-group">
          <label for="verificationCode" class="form-label">验证码</label>
          <div class="input-group">
            <input id="verificationCode" v-model="ruleForm.verificationCode" type="text" placeholder="请输入验证码"
              class="form-input" />
            <!-- Countdown Timer -->
            <div class="countdown-timer">
              {{ countdown > 0 ? `剩余时间: ${countdown}s` : '验证码已过期' }}
            </div>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="form-group">
          <button type="submit" :disabled="isSendingVerification || isRegistering" class="submit-button">
            {{ hasSentVerification ? (isRegistering ? '正在注册...' : '提交注册') : (isSendingVerification ? '正在发送验证码...' :
            '验证手机号') }}
          </button>
        </div>

      </form>

    </div>
  </div>
</template>


<script setup>
import { reactive, ref, onBeforeUnmount } from 'vue';
import { register } from '../api/user';
import { User, Lock, Iphone, Unlock } from "@element-plus/icons-vue";
import { ElMessage } from 'element-plus';
import router from "../router/index";
import { sendVerificationCode } from "../api/user"
import { rule } from 'postcss';

let ruleForm = reactive({
  phone: "",
  password: "",
  confirmPassword: "",
  verificationCode: "", // 新增：验证码输入
});

const isSendingVerification = ref(false); // 是否正在发送验证码
const hasSentVerification = ref(false);   // 是否已发送验证码
const isRegistering = ref(false);         // 是否正在注册

const isPasswordValid = ref(false);
const hasInteracted = ref(false);

const countdown = ref(0);                 // 倒计时
let countdownTimer = null;                // 定时器

// 验证密码一致性
const validatePassword = () => {
  isPasswordValid.value = ruleForm.confirmPassword === ruleForm.password;
};

// 提交表单
function submitRegisterForm() {
  if (!hasSentVerification.value) {
    // 阶段1：发送验证码

    // 验证输入是否为空
    if (!ruleForm.password || !ruleForm.phone) {
      ElMessage.error("输入不能为空");
      return;
    }

    // 验证手机号长度
    if (ruleForm.phone.length !== 11) {
      ElMessage.error("手机号必须是11位数字");
      return;
    }

    // 验证密码一致性
    if (!isPasswordValid.value) {
      ElMessage.error("两次输入密码不符");
      return;
    }

    isSendingVerification.value = true;

    // 发送验证码请求
    sendVerificationCode(ruleForm.phone)
      .then(() => {
        ElMessage.success("验证码已发送，请注意查收");
        hasSentVerification.value = true;
        // 开始倒计时
        countdown.value = 120; 
        countdownTimer = setInterval(() => {
          if (countdown.value > 0) {
            countdown.value--;
          } else {
            clearInterval(countdownTimer);
          }
        }, 1000);
      })
      .catch((err) => {
        ElMessage.error("发送验证码失败，请重试");
        console.log(err);
      })
      .finally(() => {
        isSendingVerification.value = false;
      });
  } else {
    // 阶段2：提交注册

    // 验证验证码输入
    if (!ruleForm.verificationCode) {
      ElMessage.error("请输入验证码");
      return;
    }

    isRegistering.value = true;

    // 验证码正确，进行注册
    register(ruleForm.phone, ruleForm.password,ruleForm.verificationCode)
      .then(() => {
        router.push("/login");
        ElMessage.success("注册成功,请重新登录");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        isRegistering.value = false;
      })
  }
}

// 组件销毁时清除定时器
onBeforeUnmount(() => {
  if (countdownTimer) {
    clearInterval(countdownTimer);
  }
});
</script>


<style scoped>
/* Container */
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f3f4f6;
}

/* Form Container */
.form-container {
  background-color: #ffffff;
  padding: 32px;
  border-radius: 8px;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 448px;
  min-height: 400px; /* 设置最小高度 */
  box-sizing: border-box;
  overflow-y: auto; /* 内容超出时滚动 */
}

/* Fade-in Animation */
.fade {
  animation: fadeIn 1s;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

/* Form Title */
.form-title {
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 10px;
}

/* Form: Vertical spacing between elements */
.form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* Form Group: Each input field container */
.form-group {
  display: flex;
  flex-direction: column;
}

/* Form Label */
.form-label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #4a5568;
}

/* Input Group: Wrapper for input and icon */
.input-group {
  margin-top: 4px;
  position: relative;
  border-radius: 6px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

/* Input Icon */
.input-icon {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  padding-left: 12px;
  display: flex;
  align-items: center;
  pointer-events: none;
}

/* Icon Styling */
.icon {
  height: 20px;
  width: 20px;
  color: #cbd5e0;
}

/* Form Input */
.form-input {
  padding-left: 40px;
  width: 100%;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-right: 12px;
  border: 1px solid #d2d6dc;
  border-radius: 6px;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}

/* Focus State for Input */
.form-input:focus {
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.5);
}

/* Input Status Icon (Error/Success) */
.input-status-icon {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  padding-right: 12px;
  display: flex;
  align-items: center;
  pointer-events: none;
}

/* Status Icon Styling */
.status-icon {
  height: 20px;
  width: 20px;
}

/* Error State */
.error .status-icon {
  color: #f56565;
}

/* Success State */
.success .status-icon {
  color: #48bb78;
}

/* Submit Button */
.submit-button {
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


.submit-button:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.5);
}

.submit-button:disabled {
  background-color: #a0aec0;
  cursor: not-allowed;
  opacity: 0.6;
}

.countdown-timer {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 14px;
  color: #4a5568;
}
</style>