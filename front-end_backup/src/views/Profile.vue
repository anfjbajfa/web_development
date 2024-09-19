<template>
  <navbar />
  <el-descriptions title="用户信息" :column="4" direction="vertical" class="descriptions" >
    <el-descriptions-item label="用户名:">{{ username }}</el-descriptions-item>
    <el-descriptions-item label="电话:">{{ telephone || 'N/A' }}</el-descriptions-item>
    <el-descriptions-item label="邮箱:" :span="2">{{ email }}</el-descriptions-item>
    <el-descriptions-item label="管理员:">{{ isAdmin ? '是' : '否' }}</el-descriptions-item>
    <el-descriptions-item label="地址">
      N/A
    </el-descriptions-item>
  </el-descriptions>

  <!-- 动态显示数据库描述 -->
  <el-descriptions title="数据库" :column="4" direction="vertical" class="descriptions" v-if="isAdmin">
  </el-descriptions>

  <!-- 显示按钮 -->
  <div v-if="isAdmin">
    <router-link to="/dataset">
    <el-button>管理员数据库入口</el-button>
  </router-link>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import navbar from '../components/navbar.vue'
import { getUserInfo } from '../utils/storage'

const userInfo = getUserInfo()

let username = ref(userInfo.userName)
let email = ref(userInfo.email)
let telephone = ref(userInfo.telephone)
let isAdmin = ref(userInfo.isAdmin)
</script>

<style>
.descriptions {
  margin-top: 20px;
  margin-left: 10px;
  
}
</style>
