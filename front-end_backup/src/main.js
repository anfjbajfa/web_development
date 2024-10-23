import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import store from './store';
import 'element-plus/dist/index.css'
import './style/global.css'
import ElementPlus from 'element-plus'
const rootElement = document.documentElement; // 获取 html 元素
const fontSize = window.getComputedStyle(rootElement).fontSize;
console.log(`Root element (html) font-size: ${fontSize}`);

// 获取视口宽度
const viewportWidth = window.innerWidth;

// 获取设备宽度（CSS 像素）
const deviceWidth = window.screen.width;

console.log(`Viewport Width: ${viewportWidth}px`);
console.log(`Device Width: ${deviceWidth}px`);

createApp(App).use(ElementPlus).use(store).use(router).mount('#app')
