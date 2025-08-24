import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import component from "element-plus/es/components/tree-select/src/tree-select-option.mjs"; 
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
  // { path: "/dataset", component: () => import("../views/Dataset.vue") },
  { path: "/honor", component: () => import("../views/Honor.vue") },
  { path: "/cooperation", component: () => import("../views/Cooperation.vue") },
  { path: "/profile", component: () => import("../views/Profile.vue") },
  { path: "/recruitment", component: () => import("../views/recruitment.vue") },
  { path: "/request", component: () => import("../views/RequestForm.vue") },
  {
    path: "/orderDataset",
    component: () => import("../views/OrderDataset.vue"),
  },

  {path:"/cehuiLearnMore",component:()=>import("../views/cehuiLearnMore.vue")},
  {path:"/futureLearnMore", component:()=>import("../views/futureLearnMore.vue")},
  {path:"/shuziLearnMore", component:()=>import("../views/shuziLearnMore.vue")},
  {path:"/liXiangProject", component:()=>import("../views/LiXiangProjectThemeDetail.vue")},
  {path:"/wenyiProject",component:()=>import("../views/WenyiProjectThemeDetail.vue")},
  {path:"/alidamoProject",component:()=>import("../views/AlidamoProjectThemeDetail.vue")},
  {path:"/yuhangProject",component:()=>import("../views/YuhangzhongxueProjectThemeDetial.vue")},
  {path:"/honor-zhicheng",component:()=>import("../views/Honor-zhicheng.vue")},
  {path:"/honor-zhuzuo",component:()=>import("../views/Honor-zhuzuo.vue")},
  {path:"/honor-system",component:()=>import("../views/Honor-honorSystem.vue")},
  {path: '/story/:id',component: () => import('../views/cooperation-stories.vue')
}
];

const router = createRouter({
  history: createWebHashHistory(), // 使用 Hash 模式
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      const offset = window.innerHeight * 0.18;
      return {
        el: to.hash,
        behavior: "smooth",
        // 您可以根据需要调整偏移量
        top: offset, // 动态偏移量
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