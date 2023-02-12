import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    name: 'AllTools',
    path: '/',
    component: () => import('@/views/AllTools.vue')
  },
  {
    name: 'JsonFormatter',
    path: '/JsonFormatter',
    component: () => import('@/views/formatter/JsonFormatter.vue')
  },
  {
    name: 'MD5',
    path: '/MD5',
    component: () => import('@/views/encrypt&decrypt/MD5.vue')
  },
  {
    name: 'ChatGPT',
    path: '/ChatGPT',
    component: () => import('@/views/aigc/ChatGPT.vue')
  },
  {
    name: 'TimeStamp',
    path: '/TimeStamp',
    component: () => import('@/views/convert/TimeStamp.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export { router }