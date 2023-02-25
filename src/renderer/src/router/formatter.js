
const routes = [
  {
    name: 'JsonFormatter',
    path: '/JsonFormatter',
    component: () => import('@/views/formatter/JsonFormatter.vue')
  },
  {
    name: 'JsonCompression',
    path: '/JsonCompression',
    component: () => import('@/views/formatter/JsonCompression.vue')
  },
]

export { routes }