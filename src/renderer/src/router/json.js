
const routes = [
  {
    name: 'JsonFormatter',
    path: '/JsonFormatter',
    component: () => import('@/views/json/JsonFormatter.vue')
  },
  {
    name: 'JsonCompression',
    path: '/JsonCompression',
    component: () => import('@/views/json/JsonCompression.vue')
  },
  {
    name: 'Json2Xml',
    path: '/Json2Xml',
    component: () => import('@/views/json/Json2Xml.vue')
  },
]

export { routes }