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
const modulesFiles = require.context('./', true, /.js$/)
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^.\/(.*)\.js/,'$1')
  if (moduleName !== 'index') {
    const value = modulesFiles(modulePath)
    modules[moduleName] = value.routes
  }
  return modules
}, {})
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