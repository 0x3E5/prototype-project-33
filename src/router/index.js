import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'base',
  //   component: () => import('../pages/Base')
  // },
  {
    path: '/',
    name: 'ProjectList',
    component: () => import('../pages/ProjectList')
  },
  {
    path: '/page',
    name: 'PageCanvas',
    component: () => import('../pages/PageCanvas')
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
