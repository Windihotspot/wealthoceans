import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

// Public / marketing pages
import HomeView from '@/views/HomeView.vue'
import LandingPage from '@/views/LandingPage.vue'
import Company from '@/views/Company.vue'
import Product from '@/views/Product.vue'
import Faq from '@/views/Faq.vue'
import HowitWorks from '@/views/HowitWorks.vue'
import Pricing from '@/views/Pricing.vue'
import Training from '@/views/Training.vue'

const routes: RouteRecordRaw[] = [
  // ==========================================
  // PUBLIC / MARKETING PAGES
  // ==========================================

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
  },

  {
    path: '/training',
    name: 'training',
    component: Training
  },

  // ==========================================
  // AUTH
  // ==========================================

  {
    path: '/signup',
    name: 'signup',
    component: () => import('@/views/auth/SignUpView.vue')
  },

  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/auth/LoginView.vue')
  },
  {
    path: '/bmfx',
    name: 'bmfx',
    component: () => import('@/views/BMFX.vue')
  },

  // ==========================================
  // ONBOARDING
  // ==========================================

  {
    path: '/onboarding',
    name: 'onboarding',
    component: () => import('@/views/onboarding/OnboardingView.vue')
  },
  {
    path: '/dashboard',
    name: 'dashboard',
     component: () => import('@/views/dashboard/DashboardHome.vue')
  },

  // ==========================================
  // DASHBOARD
  // ==========================================

  // {
  //   path: '/dashboard',
  //   component: () => import('@/layouts/DashboardLayout.vue'),
  //   children: [
  //     {
  //       path: '',
  //       name: 'dashboard',
  //       component: () => import('@/views/dashboard/DashboardHome.vue')
  //     }
  //   ]
  // },

  // ==========================================
  // 404 / UNKNOWN ROUTES
  // ==========================================

  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router