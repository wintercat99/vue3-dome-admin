import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Layout from '@/layout/index.vue'
import Login from '@/views/login/index.vue'
import { routeStore } from '@/stores/index.js'

export const routes = [
  {
    path: '/',
    name: 'login',
    component: Login,
    hidden: true,
  },
  {
    path: '/home',
    name: 'home',
    component: Layout,
    redirect: '/home',
    meta: {
      title: '首页',
      affix: true,
      icon: 'HomeFilled',
    },
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '工作台',
          icon: 'HomeFilled',
        },
      },
      {
        path: '/test',
        name: 'test',
        component: () => import('@/views/test/index.vue'),
        meta: {
          title: '测试',
          icon: 'HomeFilled',
        },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from) => {
  NProgress.start()
  let store = routeStore()
  if (to.name != 'login') {
    if (router.hasRoute(to.name)) {
      !store.history.has('name', to.name) && store.addHistory(to)
      return true
    }
  }
  return true
})

router.afterEach((to) => {
  const store = routeStore()
  store.activeName = to.name
  NProgress.done()
})

export default router
