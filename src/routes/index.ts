import { createRouter, createWebHistory } from 'vue-router'
import { useZulipStore } from '../stores/zulip'

const Login = () => import('../page/Login.vue')
const Home = () => import('../page/Home.vue')
const NotFound = () => import('../page/404.vue')

const routes = [
  { path: '/login', component: Login, name: 'login' },
  { path: '/', component: Home, name: 'home' },
  { path: '/:pathMatch(.*)*', name: 'notFound', component: NotFound },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from) => {
  const zulipStore = useZulipStore()
  if (!zulipStore.isAuthenticated && to.name !== 'login') {
    return { name: 'login' }
  }
})
