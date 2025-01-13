import { createRouter, createWebHashHistory } from 'vue-router'; // 改为 createWebHashHistory
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
import Service_detail_surveyingEngineer from '../views/service_detail_surveyingEngineer.vue';
import Service_detail_lineSurveying from '../views/service_detail_lineSurveying.vue';
import service_detail_GIS from '../views/service_detail_GIS.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/services', component: Services},
  {path:'/services/engineerSurveying',component:Service_detail_surveyingEngineer},
  {path:'/services/LineSurveying',component:Service_detail_lineSurveying},
  {path:'/services/GIS',component:service_detail_GIS},
  { path: '/login', component: Login },
  { path: '/login/register', component: Register },
  { path: '/dataset', component: Dataset },
  { path: '/honor', component: Honor },
  { path: '/cooperation', component: Cooperation },
  { path: '/profile', component: Profile },
  { path: '/recruitment', component: Recruitment },
  { path: '/request', component: Request },
  { path: '/orderDataset', component: OrderDataset },
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL), // 使用 Hash 模式
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      console.log('hello')
      return {
        el: to.hash,
        behavior: 'smooth',
        // 您可以根据需要调整偏移量
        top: 100
      };
    } else if (savedPosition) {
      // 当用户使用浏览器的前进/后退按钮时，返回保存的位置
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

export default router;