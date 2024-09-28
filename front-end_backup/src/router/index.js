import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Services from '../views/services.vue';

import Login from '../views/Login.vue'
import Register from '../views/register.vue';
import Dataset from '../views/Dataset.vue';
import Honor from '../views/Honor.vue';
import Cooperation from '../views/Cooperation.vue';
import Product from '../views/product.vue';

import Logout from '../views/Logout.vue'

import Profile from '../views/Profile.vue';
const routes = [
  { path: '/', component: Home },
  { path: '/services', component: Services },
  { path: '/product', component: Product },
  { path: '/login', component: Login },
  { path: '/login/register', component: Register },
  { path: '/dataset', component: Dataset },
  { path: '/honor', component: Honor },
  { path: '/cooperation', component: Cooperation },
  {path:'/logout',component:Logout},
  {path:'/profile',component:Profile}
  
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;