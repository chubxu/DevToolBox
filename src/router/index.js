import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    name: 'AllTools',
    path: '/', 
    component: () => import('@/components/AllTools.vue')
  },
  { 
    name: 'ConverterFirst',
    path: '/ConverterFirst', 
    component: () => import('@/components/ConverterFirst.vue') 
  },
  { 
    name: 'ConverterSecond',
    path: '/ConverterSecond', 
    component: () => import('@/components/ConverterSecond.vue')
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
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export { router }