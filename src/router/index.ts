import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useURLStore } from '../stores/mmURLStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/manage',
      name: 'manage',
      component: () => import('../views/ManageView.vue'),
      meta: {
        needsAuth : true,
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/SignUpView.vue')
    },
  ]
})

router.beforeEach((to, from, next) => {
  const urlStore = useURLStore();
  if (to.meta.needsAuth) {
    if (urlStore.isAuth) {
      next()
    } else {
      next('/login')
    }
  } else {
    next();
  }
})

export default router
