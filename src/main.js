import { createApp } from 'vue'
import App from './App.vue'

// import "tailwindcss/tailwind.css"

import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'

const app = createApp(App)

// 注册全局图标
for(const [key, component] of Object.entries(ElementPlusIconsVue)) {
  console.log(key)
  app.component(key, component)
}

app.use(ElementPlus)
app.mount('#app')
