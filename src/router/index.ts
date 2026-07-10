import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LandingPage from '../views/LandingPage.vue'
import Company from '../views/Company.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingPage
    },
    {
      path: '/waitlist',
      name: 'waitlist',
      component: HomeView
    },
    {
      path: '/company',
      name: 'company',
      component: Company
    }
  ]
})

export default router
