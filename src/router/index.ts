import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LandingPage from '../views/LandingPage.vue'
import Company from '../views/Company.vue'
import Product from '@/views/Product.vue'
import Faq from '@/views/Faq.vue'
import HowitWorks from '@/views/HowitWorks.vue'
import Pricing from '@/views/Pricing.vue'

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
      path: '/about',
      name: 'about',
      component: Company
    },
    {
      path: '/product',
      name: 'product',
      component: Product
    },
    {
      path: '/faq',
      name: 'faq',
      component: Faq
    },
    {
      path: '/pricing',
      name: 'pricing',
      component: Pricing
    },
    {
      path: '/how-it-works',
      name: 'how-it-works',
      component: HowitWorks
    }
  ]
})

export default router
