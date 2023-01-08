import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// import "tailwindcss/tailwind.css"

createApp(App)
  .use(ElementPlus)
  .mount('#app')
