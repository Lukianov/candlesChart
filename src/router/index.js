import { createRouter, createWebHistory } from 'vue-router'
import CandleChart from '@/components/CandleChart/CandleChart'

const routes = [
  {
    path: '/',
    name: 'CandleChart',
    component: CandleChart,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
