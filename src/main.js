import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router/index'

import { createPinia } from 'pinia'

// import "tailwindcss/tailwind.css"

import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

import VueDiff from 'vue-diff';
import 'vue-diff/dist/index.css';

const app = createApp(App)

// 注册全局图标
for(const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(router)
app.use(createPinia())
app.use(ElementPlus)
app.use(VueDiff);
app.mount('#app')
