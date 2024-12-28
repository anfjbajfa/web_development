<template>
  <nav class="nav-container">
    <div class="title-container">
      <img src="/logo.png" class="logo" />
      <span class="company-name">杭州跨远测绘有限公司</span>
    </div>

    <!-- 菜单按钮，仅在移动端显示 -->
    <div class="menu-toggle" @click="toggleMenu">
      <span class="menu-icon"><el-icon>
          <IconMenu />
        </el-icon>
      </span>
    </div>

    <!-- 菜单列表，PC端直接显示，移动端根据状态显示 -->
    <div :class="['menu-list-container', { 'mobile-menu': isMobileMenuOpen }]">
      <ul class="menu-list">
        <li v-for="i in Object.keys(menu_items)" :key="i">
          <RouterLink v-if="!(menu_items[i].constructor === Object)" :to="menu_items[i]" class="menu-link">
            {{ i }}
          </RouterLink>
        </li>
      </ul>
    </div>

    <!-- 登录或头像 -->
    <div class="auth-container">
      <RouterLink v-if="!isLogined" :to="login" class="login-link">
        登录
      </RouterLink>
      <RouterLink v-else class="avatar-link">
        
          <Avatar/>
          <el-badge v-if="getUserInfo().isAdmin" :value="pendingOrderCount"/>
          <el-badge :is-dot="hasNewOrder" :hidden="!hasNewOrder"/>
        
      </RouterLink>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, computed} from 'vue';
import { getUserInfo } from '../utils/storage.js';
import Avatar from '../components/Avatar.vue';
import { useStore } from 'vuex'; 
import { Menu as IconMenu } from "@element-plus/icons-vue";

const menu_data = {
  "主页": "/",
  "服务": "/services",
  "合作": "/cooperation",
  "荣誉": '/honor',
  "招聘": "/recruitment",
};

const login = ref("/login");
const menu_items = menu_data;

const isMobileMenuOpen = ref(false);

// 切换移动端菜单显示状态
const toggleMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

// 使用 Vuex store
const store = useStore();
const hasNewOrder = computed(()=>store.getters.hasNewOrder);
const pendingOrderCount = computed(()=>store.getters.pendingOrderCount);

onMounted(() => {
  store.dispatch('checkLoginStatus');
  
});

// 计算属性，获取登录状态
const isLogined = computed(() => store.getters.isLogined);
</script>

<style scoped>
.nav-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  position: fixed;
  top: 0;
  width: 100%;
  height: 70px;
  padding: 0 20px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
  z-index: 1000;
}

.title-container {
  display: flex;
  align-items: center;
}

.logo {
  height: 50px;
}

.company-name {
  margin-left: 10px;
  font-size: 22px;
  font-weight: bold;
  font-family: sans-serif;
}

/* 菜单列表容器 */
.menu-list-container {
  display: flex;
  align-items: center;
  margin-right:200px ;
}

/* 菜单列表 */
.menu-list {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

.menu-list li+li {
  margin-left: 40px;
}

.menu-link,
.login-link,
.avatar-link {
  font-weight: bold;
  font-size: 16px;
  font-family: sans-serif;
  color: black;
  text-decoration: none;
  transition: color 0.3s, text-decoration 0.3s;
}

.menu-link:hover,
.login-link:hover,
.avatar-link:hover {
  color: #1e3a8a;
  text-decoration: underline;
}


/* 登录/头像容器 */
.auth-container {
  display: flex;
  align-items: center;
}

.avatar-link {
  margin-left: 20px;
}

/* 移动端菜单按钮 */
.menu-toggle {
  display: none;
}

/* 媒体查询 */
@media screen and (max-width: 768px) {
  .nav-container {
    height: auto;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    padding: 10px 20px;
  }

  .title-container {
    width: 100%;
    align-items: center;
  }

  .company-name {
    margin-left: 1px;
    font-size: 13px;
    font-weight: bold;
    font-family: sans-serif;
  }

  .logo {
    height: 25px;
  }

  .menu-toggle {
    display: block;
    margin-top: 3px;
  }

  .menu-icon {
    font-size: 13px;
  }

  .menu-list-container {
    width: 100%;
    display: none;
    background-color: rgb(213, 220, 220);
    transition: opacity 0.3s ease, transform 0.3s ease; /* 确保过渡效果生效 */
  }

  /* 修改这里 */
  .menu-list-container.mobile-menu {
    display: block;
    position: absolute;
    top: 52.8px; /* 根据导航栏的高度进行调整 */
    left: 0;
    width: 100vw;
    height: 25vh;
    z-index: 999;
    overflow-y: auto; /* 如果菜单项超出容器高度，允许滚动 */
    transition: opacity 2s ease, transform 0.8s ease; 
  }

  .menu-list {
    flex-direction: column;
    width: 100%;
  }

  .menu-list li {
    width: 100%;
  }

  .menu-list li+li {
    margin-left: 0;
    margin-top: 10px;
  }

  .menu-link,
  .login-link,
  .avatar-link {
    font-size: 10px;
    padding: 10px;
    display: block;

  }

  .menu-link:hover,
  .login-link:hover,
  .avatar-link:hover {
    background-color: rgba(0, 0, 0, 0.1); /* 加深背景色 */
  }

  .auth-container {
    width: 100%;
    justify-content: flex-end;
  }

  
}
</style>