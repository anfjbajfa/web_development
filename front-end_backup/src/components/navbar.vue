<template>
  <nav class="nav-container">
    <div class="title-container">
      <img src="/logo.png" class="logo" />
      <span class="company-name">杭州跨远测绘有限公司</span>
    </div>

    <!-- 菜单按钮，仅在移动端显示 -->
    <div class="menu-toggle" @click="toggleMenu" ref="menuToggle">
      <span class="menu-icon"><el-icon>
          <IconMenu />
        </el-icon>
      </span>
    </div>

    <!-- 菜单列表，PC端直接显示，移动端根据状态显示 -->
    <div :class="['menu-list-container', { 'mobile-menu': isMobileMenuOpen }]">
      <ul class="menu-list">
        <li v-for="i in Object.keys(menu_items)" :key="i">
          <RouterLink v-if="!(menu_items[i].constructor === Object)" :to="menu_items[i]" class="menu-link"
            active-class="active-menu-link">
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
        <Avatar />
        <el-badge v-if="getUserInfo().isAdmin" :value="pendingOrderCount" />
        <el-badge :is-dot="hasNewOrder" :hidden="!hasNewOrder" />
      </RouterLink>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, computed, onUnmounted } from 'vue';
import { getUserInfo } from '../utils/storage.js';
import Avatar from '../components/Avatar.vue';
import { useStore } from 'vuex';
import { Menu as IconMenu } from "@element-plus/icons-vue";

const menu_data = {
  "主页": "/",
  "业务": "/services",
  "合作": "/cooperation",
  "荣誉": '/honor',
  "招聘": "/recruitment",
};

const login = ref("/login");
const menu_items = menu_data;

const isMobileMenuOpen = ref(false);

// 引用
const menuListContainer = ref(null);
const menuToggle = ref(null);

// 切换移动端菜单显示状态
const toggleMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

// 使用 Vuex store
const store = useStore();
const hasNewOrder = computed(() => store.getters.hasNewOrder);
const pendingOrderCount = computed(() => store.getters.pendingOrderCount);

onMounted(() => {
  store.dispatch('checkLoginStatus');
  document.addEventListener('click', handleClickOutside);
  window.addEventListener('scroll', handleScrollOrSwipe);
  window.addEventListener('touchstart', handleTouchStart, { passive: true });
  window.addEventListener('touchmove', handleTouchMove, { passive: true });
  window.addEventListener('touchend', handleTouchEnd);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
  window.removeEventListener('scroll', handleScrollOrSwipe);
  window.removeEventListener('touchstart', handleTouchStart);
  window.removeEventListener('touchmove', handleTouchMove);
  window.removeEventListener('touchend', handleTouchEnd);
});

let touchStartY = 0;
let touchEndY = 0;

// 计算属性，获取登录状态
const isLogined = computed(() => store.getters.isLogined);
// 关闭菜单的方法
const closeMenu = () => {
  isMobileMenuOpen.value = false;
};

// 处理点击事件，判断是否点击在菜单外部
const handleClickOutside = (event) => {
  if (isMobileMenuOpen.value) {
    // 如果点击的是菜单按钮，忽略
    if (menuToggle.value && menuToggle.value.contains(event.target)) {
      return;
    }
    // 如果点击在菜单内部，忽略
    if (menuListContainer.value && menuListContainer.value.contains(event.target)) {
      return;
    }
    // 其他情况，关闭菜单
    closeMenu();
  }
};

const handleScrollOrSwipe = () => {
  if (isMobileMenuOpen.value) {
    closeMenu();
  }
};


const handleTouchStart = (event) => {
  touchStartY = event.changedTouches[0].screenY;
};

const handleTouchMove = (event) => {
  touchEndY = event.changedTouches[0].screenY;
};

const handleTouchEnd = () => {
  const touchDifference = touchStartY - touchEndY;
  // 如果用户向上滑动超过50px，则关闭菜单
  if (touchDifference > 10) {
    closeMenu();
  }
};

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
  margin-right: 200px;
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
  color: rgb(94, 37, 25);
  text-decoration: underline;
}

/* 使用 ::v-deep 穿透 scoped 限制，定义 active-menu-link 的样式 */
:deep(.active-menu-link) {
  transform: scale(1.2);
  display: inline-block;
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
    width: 100%
  }

  .title-container {
    white-space: nowrap;
    /* 禁止换行 */
    flex-wrap: nowrap;
    align-items: center;
  }

  .company-name {
    margin-left: 1px;
    font-size: 18px;
    font-weight: bold;
    font-family: sans-serif;
    width: auto;
  }

  .logo {
    height: 25px;
  }

  .menu-toggle {
    display: block;
    margin-top: 3px;
    margin-left: 10px;
  }

  .menu-icon {
    font-size: 14px;
  }

  /* 菜单列表容器的初始状态 */
  .menu-list-container {
    width: 100%;
    position: absolute;
    top: 50px;
    /* 与导航栏高度一致 */
    left: 0;
    background-color: rgb(213, 220, 220);
    max-height: 0;
    /* 初始高度为0 */
    overflow: hidden;
    /* 隐藏溢出内容 */
    transition: max-height 1s ease, opacity 1s ease;
    /* 改为max-height实现滑动效果 */
    opacity: 0;
    z-index: 999;
  }

  /* 当菜单打开时 */
  .menu-list-container.mobile-menu {
    max-height: 500px;
    opacity: 1;
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
    font-size: 12px;
    padding: 10px;
    display: block;

  }

  .menu-link:hover,
  .login-link:hover,
  .avatar-link:hover {
    background-color: rgba(0, 0, 0, 0.1);
    /* 加深背景色 */
  }

  .auth-container {
    width: 100%;
    justify-content: flex-end;
  }

  /* 使用 ::v-deep 穿透 scoped 限制，定义 active-menu-link 的样式 */
  :deep(.active-menu-link) {
    transform: scale(1.2);
    display: inline-block;
    color: black;
  }



}
</style>