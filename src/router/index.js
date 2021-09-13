import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'base',
    component: () => import('../pages/Base')
  },
  {
    path: '/project-list',
    name: 'ProjectList',
    component: () => import('../pages/ProjectList')
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
