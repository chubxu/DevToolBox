import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    name: 'AllTools',
    path: '/',
    component: () => import('@/components/AllTools.vue')
  },
  {
    name: 'JsonFormatter',
    path: '/JsonFormatter',
    component: () => import('@/components/formatter/JsonFormatter.vue')
  },
  {
    name: 'MD5',
    path: '/MD5',
    component: () => import('@/components/encrypt&decrypt/MD5.vue')
  },
  {
    name: 'ChatGPT',
    path: '/ChatGPT',
    component: () => import('@/components/aigc/ChatGPT.vue')
  },
  {
    name: 'TimeStamp',
    path: '/TimeStamp',
    component: () => import('@/components/convert/TimeStamp.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export { router }