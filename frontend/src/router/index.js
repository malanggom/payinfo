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
    path: '/ctrtcoctrtinq',
    name: 'ctrtcoctrtinq',
    component: () => import('../views/CtrtMng/CtrtcoctrtInqView.vue')
  },
  {
    path: '/devctrtinq',
    name: 'devctrtinq',
    component: () => import('../views/CtrtMng/DevctrtInqView.vue')
  },
  {
    path: '/etcctrtinq',
    name: 'etcctrtinq',
    component: () => import('../views/CtrtMng/EtcctrtInqView.vue')
  },
  {
    path: '/slsmng',
    name: 'slsmng',
    component: () => import('../views/SlsMng/SlsMngGridComponent.vue')
  },
  {
    path: '/taxbillinq',
    name: 'taxbillinq',
    component: () => import('../views/SlsMng/TaxbillInqView.vue')
  },
  {
    path: '/whtaxinq',
    name: 'whtaxinq',
    component: () => import('../views/SlsMng/WhtaxbillInqView.vue')
  },
  {
    path: '/dpstwdrlinq',
    name: 'dpstwdrlinq',
    component: () => import('../views/PnssMng/DpstWdrlInqView.vue')
  },
  {
    path: '/ofcexpnssinq',
    name: 'ofcexpnssinq',
    component: () => import('../views/PnssMng/OfcexpnssInqView.vue')
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
