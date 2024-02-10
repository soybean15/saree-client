import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useNavStore } from '@/stores/nav'
import { storeToRefs } from 'pinia'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',

    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  } ,
  {
    path: '/stores',
    name: 'stores',
    component: () => import(/* webpackChunkName: "about" */ '../views/StoresView.vue'),
    
  },
  {
    path: '/pautang',
    name: 'loans',
    meta:{routes:[{label:'Loan',name:'loans'}]},
    component: () => import(/* webpackChunkName: "about" */ '../views/LoanView.vue')
  },
  {
    path: '/add/:id',
    name: 'addCredit',
    meta:{routes:[{label:'Loan',name:'loans'},{label:'Add Credit',name:'addCredit'}]},
    component: () => import(/* webpackChunkName: "about" */ '../views/AddCreditView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.beforeEach((to, from,next) => {
  const nav = useNavStore()
  const {activeNav} = storeToRefs(nav)
  activeNav.value = to.name
  next()
})

export default router
