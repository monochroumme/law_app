import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/',
    name: 'index',
    meta: {
      isAuthPage: true
    },
    component: () => import('@/pages/index.vue')
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      isAuthPage: true
    },
    props: true,
    component: () => import('@/pages/login.vue')
  },
  {
    path: '/register',
    meta: {
      isAuthPage: true
    },
    redirect: '/register/client'
  },
  {
    path: '/register/client',
    meta: {
      isAuthPage: true
    },
    name: 'register-client',
    component: () => import('@/pages/client/Registration/index.vue')
  },
  {
    path: '/register/lawyer',
    meta: {
      isAuthPage: true
    },
    name: 'register-lawyer',
    component: () => import('@/pages/lawyer/Registration/index.vue')
  },
  {
    path: '/rules',
    meta: {
      isAuthPage: true
    },
    redirect: '/rules/client'
  },
  {
    path: '/rules/:userType',
    meta: {
      isAuthPage: true
    },
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
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
  const userLoggedIn = localStorage.getItem('userId') || typeof localStorage.getItem('userId') === 'string'
  const isLoginPage = !!to.meta?.isAuthPage

  if (userLoggedIn && isLoginPage && localStorage.getItem('userType')) {
    next({ name: 'cases', params: { userType: localStorage.getItem('userType') } })
  }
  if (!userLoggedIn && !isLoginPage) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
