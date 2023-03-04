
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
  {
    name: 'Json2Yaml',
    path: '/Json2Yaml',
    component: () => import('@/views/json/Json2Yaml.vue')
  },
  {
    name: 'Json2Properties',
    path: '/Json2Properties',
    component: () => import('@/views/json/Json2Properties.vue')
  },
]

export { routes }