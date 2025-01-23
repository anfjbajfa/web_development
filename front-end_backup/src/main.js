import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import store from './store';
import 'element-plus/dist/index.css'
import './style/global.css'
import ElementPlus from 'element-plus'
import lazyLoading from './directives/Lazy.js'
import fade from './directives/Fade.js' // 引入刚才写的指令
createApp(App).directive('lazy',lazyLoading).directive('fade',fade).use(ElementPlus).use(store).use(router).mount('#app')
