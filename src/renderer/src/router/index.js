import { createRouter, createWebHashHistory } from 'vue-router'
// 初始化routes
const routes = [
  {
    name: 'AllTools',
    path: '/',
    component: () => import('@/views/AllTools.vue')
  },
]

// 读取当前文件夹下除index.js外的所有routes
const modules = {};
const modulesFiles = import.meta.globEager('./*.js')
for (let key in modulesFiles) {
  if (Object.prototype.hasOwnProperty.call(modulesFiles, key)) {
    modules[key.replace(/(\.\/|\.ts)/g, '')] = modulesFiles[key].routes
  }
}
if (modules) {
  Object.values(modules).forEach(value => {
    routes.push(...value)
  })
}

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export { router }