import { createRouter, createWebHashHistory } from 'vue-router'
import ConverterFirst from '../components/ConverterFirst.vue'
import ConverterSecond from '../components/ConverterSecond.vue'

const routes = [
  { 
    name: 'ConverterFirst',
    path: '/ConverterFirst', 
    component: ConverterFirst 
  },
  { 
    name: 'ConverterSecond',
    path: '/ConverterSecond', 
    component: ConverterSecond 
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export { router }