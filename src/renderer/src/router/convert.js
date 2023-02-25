
const routes = [
  {
    name: 'TimeStamp',
    path: '/TimeStamp',
    component: () => import('@/views/convert/TimeStamp.vue')
  },
  {
    name: 'BinOctDecHex',
    path: '/BinOctDecHex',
    component: () => import('@/views/convert/BinOctDecHex.vue')
  },
  {
    name: 'Json2Yaml',
    path: '/Json2Yaml',
    component: () => import('@/views/convert/Json2Yaml.vue')
  },
]

export { routes }