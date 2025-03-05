import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/devinq',
    name: 'devinq',
    component: () => import('../views/DevMng/DevInqView.vue')
  },
  {
    path: '/empinq',
    name: 'empinq',
    component: () => import('../views/DevMng/EmpInqView.vue')
  },
  {
    path: '/pjinq',
    name: 'pjinq',
    component: () => import('../views/PjMng/PjInqView.vue')
  },
  {
    path: '/ctrtcoinq',
    name: 'ctrtcoinq',
    component: () => import('../views/CtrtcoMng/CtrtcoInqView.vue')
  },
  {
    path: '/sbcncoinq',
    name: 'sbcncoinq',
    component: () => import('../views/CtrtcoMng/SbcncoInqView.vue')
  },
  {
    path: '/ctrtcodocinq',
    name: 'ctrtcodocinq',
    component: () => import('@/views/DocMng/CtrtcodocInqView.vue')
  },
  {
    path: '/devdocinq',
    name: 'devdocinq',
    component: () => import('@/views/DocMng/DevdocInqView.vue')
  },
  {
    path: '/sbcncodocinq',
    name: 'sbcncodocinq',
    component: () => import('@/views/DocMng/SbcncodocInqView.vue')
  },
  {
    path: '/slsmng',
    name: 'slsmng',
    component: () => import('@/views/acntgMng/SlsMngGridComponent.vue')
  },
  {
    path: '/taxbillinq',
    name: 'taxbillinq',
    component: () => import('@/views/acntgMng/TaxbillInqView.vue')
  },
  {
    path: '/whtaxinq',
    name: 'whtaxinq',
    component: () => import('@/views/acntgMng/WhtaxbillInqView.vue')
  },
  {
    path: '/dvcinq',
    name: 'dvcinq',
    component: () => import('../views/DvcMng/DvcInqView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
