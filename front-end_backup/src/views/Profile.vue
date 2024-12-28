<template>
  <navbar></navbar>
  <div class="profile_container">
    <!-- 左侧侧边栏 -->
    <aside class="profile_sidebar">
      <div class="sidebar-header">
        <h3>用户中心</h3>
      </div>
      <ul class="menu">
        <li @click="scrollToSection('userInfo')" :class="{active:showUserInfo}">用户信息</li>
        <li @click="scrollToSection('orderDetails')" :class="{active:showOrders}">订单详情<el-badge :is-dot="hasNewOrder" :hidden="!hasNewOrder"/></li>
        <li v-if="isAdmin" @click="scrollToSection('database')" :class="{active:showDataset}">数据库</li>
        <li v-if="isAdmin" @click="scrollToSection('orderProcess')" :class="{active:showAllOrders}">用户订单处理<el-badge :value="pendingOrderCount"/></li>
      </ul>
    </aside>

    <!-- 主内容区域 -->
    <main class="profile-main-content">

      <!-- 用户信息区域 -->
      <div id="userInfo" class="box-container">
        <h3>用户信息
          <span class="arrow" :class="{ 'arrow-down': showUserInfo, 'arrow-right': !showUserInfo }"
            @click="showUserInfo = !showUserInfo" title="点击展开/收起" style="cursor: pointer; margin-left:10px;">
          </span>
        </h3>
        <div v-show="showUserInfo" style="margin-top:20px;">
          <div class="profile-info">
            <div class="profile-avatar">
              <img src="https://via.placeholder.com/80" alt="Avatar" />
              <button>
                上传头像
              </button>
            </div>
            <div class="profile_user_detail">
              <div>
                <p style="font-weight:bold">电话号:</p>
                <p style="font-style: italic;">{{ userInfo.phone }}</p>
              </div>

              <div>
                <p style="font-weight:bold">用户字符串:</p>
                <p style="font-style: italic;">{{ userInfo.randomString }}</p>
              </div>

              <div>
                <p style="font-weight:bold">管理员/客户:</p>
                <p style="font-style: italic;">{{ isAdmin ? "管理员" : "客户" }}</p>
              </div>

              <div>
                <p style="font-weight:bold">密码：</p>
                <p style="font-style: italic;">*************</p>
              </div>

            </div>

            <div class="change_info">
              <p>
                <button @click="dialogVisible = true">更改用户密码</button>
              </p>
            </div>
          </div>

          <!-- 更改密码的对话框 -->
          <el-dialog title="更改用户密码" v-model="dialogVisible" width="400px" @close="resetForm">
            <el-form :model="form" :rules="rules" ref="passwordForm">
              <el-form-item label="新密码" prop="newPassword">
                <el-input type="password" v-model="form.newPassword" placeholder="请输入新密码"></el-input>
              </el-form-item>
              <el-form-item label="验证码" prop="verificationCode">
                <el-row :gutter="10">
                  <el-col :span="16">
                    <el-input v-model="form.verificationCode" placeholder="请输入验证码"></el-input>
                  </el-col>
                  <el-col :span="8">
                    <el-button :disabled="countdown > 0" @click="sendCode" block>
                      {{ countdown > 0 ? `${countdown}s` : '获取验证码' }}
                    </el-button>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button @click="submitForm">确 定</el-button>
            </span>
          </el-dialog>
        </div>
      </div>

      <!-- 订单详情界面 -->
      <div id="orderDetails" class="box-container">
        <h3>
          订单详情
          <span class="arrow" :class="{ 'arrow-down': showOrders, 'arrow-right': !showOrders }" @click="toggleOrders"
            title="点击展开/收起" style="cursor: pointer; margin-left:10px;"></span>
        </h3>

        <!-- 当showOrders为true时才显示订单详情内容 -->
        <div v-show="showOrders" style="margin-top:20px;">
          <div v-if="orderInfo">
            <!-- 使用 Element Plus 的 el-descriptions 组件展示订单详情 -->
            <el-descriptions :column="2" border>
              <el-descriptions-item label="创建时间">{{ orderInfo.createTime }}</el-descriptions-item>
              <el-descriptions-item label="邮箱">{{ orderInfo.email }}</el-descriptions-item>
              <el-descriptions-item label="姓/姓名">{{ orderInfo.fullName }}</el-descriptions-item>
              <el-descriptions-item label="需求">{{ orderInfo.product }}</el-descriptions-item>
              <el-descriptions-item label="项目名称">{{ orderInfo.projectName }}</el-descriptions-item>
              <el-descriptions-item label="状态">{{ orderInfo.status }}</el-descriptions-item>
              <el-descriptions-item label="项目详情">{{ orderInfo.issue }}</el-descriptions-item>
            </el-descriptions>
          </div>
          <!-- 当没有订单信息时 -->
          <div v-else>
            <p>无订单信息</p>
            <router-link to="/request"><button>前往填写需求表单</button></router-link>
          </div>
        </div>
      </div>


      <!-- 数据库详情 -->
      <div id="database" class="box-container" v-if="isAdmin">
        <h3>
          数据库管理
          <span class="arrow" :class="{ 'arrow-down': showDataset, 'arrow-right': !showDataset }" @click="toggleDataset"
            title="点击展开/收起" style="cursor: pointer;"></span>
        </h3>
        <div v-show="showDataset" style="margin-top: 20px;">
          <router-link to="/dataset"><button>进入地图数据库</button></router-link>
        </div>
      </div>

      <!-- 处理用户订单 -->
      <div id="orderProcess" class="box-container" v-if="isAdmin">
          <h3>
            用户订单处理
            <span class="arrow" :class="{ 'arrow-down': showAllOrders, 'arrow-right': !showAllOrders }" @click="toggleadminOrders"
              title="点击展开/收起" style="cursor: pointer;"></span>
          </h3>
          <div v-show="showAllOrders" style="margin-top: 20px;">
            <router-link to="/orderDataset"><button>进入订单数据库</button></router-link>            
          </div>

      </div>
    </main>

  </div>

</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import navbar from '../components/navbar.vue'
import { getUserInfo } from '../utils/storage'
import { useStore } from 'vuex';
import { updatePassword, sendVerificationCode } from '../api/user.js'
import { ElMessageBox, ElMessage } from 'element-plus';
import { FormInstance } from 'element-plus';
import { getRequestForm } from '../api/requestForm.js'

// 通过store来更新Store的状态
const store = useStore()
onMounted(() => {
  store.dispatch('checkLoginStatus')
})
const isAdmin = computed(() => store.getters.isAdmin)
const userInfo = getUserInfo()

const dialogVisible = ref(false)
const showOrders = ref(false)
const showUserInfo = ref(false)
const showDataset = ref(false)
const showAllOrders = ref(false)
const hasNewOrder = computed(()=>store.getters.hasNewOrder);
const pendingOrderCount = computed(()=>store.getters.pendingOrderCount);

// 添加滚动和展开功能
const scrollToSection = (sectionId: string) => {
  // 找到目标元素
  const element = document.getElementById(sectionId);
  store.commit('setHasNewOrder', false);
  if (element) {
    // 滚动到目标位置，添加平滑效果
    element.scrollIntoView({ behavior: 'smooth' });
    
    // 根据 sectionId 展开对应的内容
    switch(sectionId) {
      case 'userInfo':
      toggleUserInfo();
        break;
      case 'orderDetails':
        toggleOrders();
        break;
      case 'database':
        toggleDataset();
        break;
      case 'orderProcess':
        toggleadminOrders();
        break;
    }
  }
}


const form = ref({
  newPassword: '',
  verificationCode: ""
})

// 表单验证规则
const rules = {
  newPassword: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, message: '密码至少6位', trigger: 'blur' }
  ],
  verificationCode: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { len: 6, message: '验证码为6位', trigger: 'blur' }
  ]
}


// 表单引用
const passwordForm = ref<FormInstance>()

// 发送验证码的倒计时
const countdown = ref(0)
let timer: number | null = null

const sendCode = async () => {
  try {
    console.log(userInfo.phone)
    await sendVerificationCode(userInfo.phone)
    ElMessage.success('验证码已发送')
    countdown.value = 60
    timer = window.setInterval(() => {
      if (countdown.value > 0) {
        countdown.value--
      } else {
        if (timer) {
          clearInterval(timer)
          timer = null
        }
      }
    }, 1000)
  } catch (error) {
    ElMessage.error('发送验证码失败，请重试')
  }
}


// 提交修改密码表单
const submitForm = () => {
  passwordForm.value?.validate(async (valid) => {
    if (valid) {
      try {
        await updatePassword(userInfo.phone, form.value.newPassword, form.value.verificationCode)
        ElMessage.success('密码修改成功')
        dialogVisible.value = false
        resetForm()
      } catch (error) {
        ElMessage.error('密码修改失败，请检查验证码或重试')
      }
    } else {
      ElMessage.error('请填写完整信息')
      return false
    }
  })
}

const toggleUserInfo = () => {
  showUserInfo.value = !showUserInfo.value;
}
const toggleDataset = () => {
  showDataset.value = !showDataset.value;
}
const toggleadminOrders = () => {
  showAllOrders.value = !showAllOrders.value;
}

const toggleOrders = () => {
  showOrders.value = !showOrders.value;
  if (showOrders.value) {
    getForm();
  }
}
const orderInfo = ref(null); // 响应式变量，保存订单信息

// 获取订单信息
const getForm = async () => {
  try {
    const userOrderVo = await getRequestForm(userInfo.phone)
    orderInfo.value = userOrderVo;
  } catch (error) {
    console.error('获取订单失败:', error)
  }
}

// 重置表单
const resetForm = () => {
  form.value.newPassword = ''
  form.value.verificationCode = ''
  countdown.value = 0
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}
</script>

<style scoped>
/* 布局容器 */
.profile_container {
  margin-top: 70px;
  display: flex;
  height: 100vh;
  font-family: Arial, sans-serif;
}

/* 左侧侧边栏样式 */
.profile_sidebar {
  width: 250px;
  background-color: #919294;
  color: #fff;
  padding: 20px;
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100vh;
}

.sidebar-header {
  font-size: 18px;
  font-weight: bold;
}

.menu {
  list-style: none;
  padding: 0;
}

.menu li.active {
  color: #e6e6e6;
  font-weight: bold;
}

.menu li {
  margin-bottom: 20px;
  cursor: pointer;
  font-size: 16px;
  transition: color 0.3s ease;
}

.menu li:hover {
  color: #e6e6e6;
}

/* 主内容区域样式 */
.profile-main-content {
  flex-grow: 1;
  padding: 20px;
  background-color: #f9f9fc;
  margin-left: 250px;

}

/* -------------------------------------------------- */
/* 个人信息部分 */

.profile-info {
  display: flex;
  align-items: center;
}

.profile-avatar img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-right: 15px;
}

.profile-info h2 {
  margin: 0;
  font-size: 20px;
}

.profile_user_detail {
  display: grid;
  grid-auto-flow: column;
  grid-template-rows: repeat(2, auto);
  row-gap: 20px;
  column-gap: 200px;
  margin-left: 70px;
}

.change_info {
  display: flex;
  flex-direction: column;
  margin-left: 100px;
  position: relative;
  margin-top: 100px
}

/* --------------------------------------------------- */
/* 订单信息详情 */
.form-box h4 {
  margin-bottom: 20px;
  font-size: 16px;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

/* 初始箭头朝右 */
.arrow {
  display: inline-block;
  width: 0;
  height: 0;
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;
  border-left: 6px solid #333;
  margin-left: 5px;
  transition: transform 0.3s;
}

/* 展开时箭头向下 */
.arrow-down {
  transform: rotate(90deg);
}

.arrow-right {
  transform: rotate(0deg);
}

/* Dialog 样式调整 */
.el-dialog__body {
  padding: 20px;
}

.el-form-item {
  margin-bottom: 20px;
}

.el-button {
  background-color: #919294;
  color: white;
}

.el-button:hover,
.el-button:focus,
.el-button:active {
  background-color: #919294 !important;
  /* 保持与默认背景色一致 */
  color: white !important;
  /* 保持与默认文字颜色一致 */
}


.box-container {
  background-color: #fff; /* 白色背景 */
  border: 1px solid #ddd; /* 灰色边框 */
  border-radius: 8px; /* 圆角 */
  padding: 20px; /* 内边距 */
  margin-bottom: 20px; /* 区块间距 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 添加阴影 */
}

</style>