import { createRouter, createWebHashHistory } from "vue-router"; // 改为 createWebHashHistory
import Home from "../views/Home.vue";
// import Services from "../views/services.vue";

// import Login from "../views/Login.vue";
// import Register from "../views/register.vue";
// import Dataset from "../views/Dataset.vue";
// import Honor from "../views/Honor.vue";
// import Cooperation from "../views/Cooperation.vue";
// import Recruitment from "../views/recruitment.vue";
// import Profile from "../views/Profile.vue";
// import Request from "../views/RequestForm.vue";
// import OrderDataset from "../views/OrderDataset.vue";
// import Service_detail_surveyingEngineer from "../views/service_detail_surveyingEngineer.vue";
// import Service_detail_lineSurveying from "../views/service_detail_lineSurveying.vue";
// import service_detail_GIS from "../views/service_detail_GIS.vue";

// const routes = [
//   { path: "/", component: Home },
//   { path: "/services", component: Services },
//   {
//     path: "/services/engineerSurveying",
//     component: Service_detail_surveyingEngineer,
//   },
//   { path: "/services/LineSurveying", component: Service_detail_lineSurveying },
//   { path: "/services/GIS", component: service_detail_GIS },
//   { path: "/login", component: Login },
//   { path: "/login/register", component: Register },
//   // vue路径懒加载 可以使开屏首页加载变快
//   { path: "/dataset", component: () => import("../views/Dataset.vue") },
//   { path: "/honor", component: Honor },
//   { path: "/cooperation", component: Cooperation },
//   { path: "/profile", component: Profile },
//   { path: "/recruitment", component: Recruitment },
//   { path: "/request", component: Request },
//   { path: "/orderDataset", component: OrderDataset },
// ];
const routes = [
  { path: "/", component: Home },
  { path: "/services", component: () => import("../views/services.vue") },
  {
    path: "/services/engineerSurveying",
    component: () => import("../views/service_detail_surveyingEngineer.vue"),
  },
  {
    path: "/services/LineSurveying",
    component: () => import("../views/service_detail_lineSurveying.vue"),
  },
  {
    path: "/services/GIS",
    component: () => import("../views/service_detail_GIS.vue"),
  },
  { path: "/login", component: () => import("../views/Login.vue") },
  { path: "/login/register", component: () => import("../views/register.vue") },
  { path: "/dataset", component: () => import("../views/Dataset.vue") },
  { path: "/honor", component: () => import("../views/Honor.vue") },
  { path: "/cooperation", component: () => import("../views/Cooperation.vue") },
  { path: "/profile", component: () => import("../views/Profile.vue") },
  { path: "/recruitment", component: () => import("../views/recruitment.vue") },
  { path: "/request", component: () => import("../views/RequestForm.vue") },
  {
    path: "/orderDataset",
    component: () => import("../views/OrderDataset.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL), // 使用 Hash 模式
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth",
        // 您可以根据需要调整偏移量
        top: 100,
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
