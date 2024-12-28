import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Services from '../views/services.vue';

import Login from '../views/Login.vue'
import Register from '../views/register.vue';
import Dataset from '../views/Dataset.vue';
import Honor from '../views/Honor.vue';
import Cooperation from '../views/Cooperation.vue';
import Recruitment from '../views/recruitment.vue';
import Profile from '../views/Profile.vue';
import Request from '../views/RequestForm.vue';
import OrderDataset from '../views/OrderDataset.vue'
const routes = [
  { path: '/', component: Home },
  { path: '/services', component: Services },
  { path: '/login', component: Login },
  { path: '/login/register', component: Register },
  { path: '/dataset', component: Dataset },
  { path: '/honor', component: Honor },
  { path: '/cooperation', component: Cooperation },
  {path:'/profile',component:Profile},
  {path:'/recruitment',component:Recruitment},
  {path:'/request',component:Request},
  {path:'/orderDataset',component:OrderDataset},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      console.log('hello')
      return {
        el: to.hash,
        behavior: 'smooth', // 平滑滚动
        // 您可以根据需要调整偏移量
        top: 100
      };
    } else if (savedPosition) {
      
      // 当用户使用浏览器的前进/后退按钮时，返回保存的位置
      return savedPosition;
    } else {
      // 否则，滚动到页面顶部
      return { top: 0 };
    }
  },
});

export default router;