import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('@/pages/index.vue')
  },
  {
    path: '/register',
    redirect: '/register/client'
  },
  {
    path: '/register/client',
    name: 'register-client',
    component: () => import('@/pages/client/Registration/index.vue')
  },
  {
    path: '/register/lawyer',
    name: 'register-lawyer',
    component: () => import('@/pages/lawyer/Registration/index.vue')
  },
  {
    path: '/rules',
    redirect: '/rules/client'
  },
  {
    path: '/rules/:userType',
    name: 'rules',
    props: true,
    component: () => import('@/pages/rules.vue')
  },
  {
    path: '/cases',
    redirect: '/'
  },
  {
    path: '/:userType/cases/',
    name: 'cases',
    props: true,
    component: () => import('@/pages/cases.vue')
  },
  {
    path: '/:userType/all-cases/',
    name: 'all-cases',
    props: true,
    component: () => import('@/pages/all-cases.vue')
  },
  {
    path: '/:userType/cases/:caseId/applied-lawyers',
    name: 'applied-lawyers',
    props: true,
    component: () => import('@/pages/applied-lawyers.vue')
  },
  {
    path: '/:userType/chats/',
    name: 'chats',
    props: true,
    component: () => import('@/pages/chats.vue')
  },
  {
    path: '/:userType/profile/',
    name: 'profile',
    props: true,
    component: () => import('@/pages/profile.vue')
  },
  {
    path: '/login',
    name: 'login',
    props: true,
    component: () => import('@/pages/login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
