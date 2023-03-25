import { createRouter, createWebHistory } from 'vue-router'
import SelectPollingUnit from '../components/pages/SelectPollingUnit.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'choose-pu',
      component: SelectPollingUnit
    },
    {
      path: '/submit/:puId',
      name: 'submit-result',
      component: () => import('../components/pages/SubmitResult.vue')
    }
  ]
})

export default router
