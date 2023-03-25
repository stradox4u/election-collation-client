import { createRouter, createWebHistory } from 'vue-router'
import SelectPollingUnit from '../components/pages/SelectPollingUnit.vue'
import { puSelected } from './routeGuards'

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
      component: () => import('../components/pages/SubmitResult.vue'),
      beforeEnter: puSelected,
    }
  ]
})

export default router
