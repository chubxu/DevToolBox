
const routes = [
  {
    name: 'MD5',
    path: '/MD5',
    component: () => import('@/views/encrypt&decrypt/MD5.vue')
  },
  {
    name: 'Unicode',
    path: '/Unicode',
    component: () => import('@/views/encrypt&decrypt/Unicode.vue')
  },
]

export { routes }