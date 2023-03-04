
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
  }
]

export { routes }