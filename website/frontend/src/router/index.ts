import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import App1 from '../App1.vue'
import App2 from '../App2.vue'
import App3 from '../App3.vue'
import App4 from '../App4.vue'
import App5 from '../App5.vue'
import App6 from '../App6.vue'
import App8 from '../App8.vue'
import Home from '../Home.vue'
import Auth from '../Auth.vue'
import store from '../stores/store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/app1',
      name: 'app1',
      component: App1,
      meta: { requiresAuth: true }
    },
    {
      path: '/app2',
      name: 'app2',
      component: App3,
      meta: { requiresAuth: true, minLevel: 1 }
    },
    {
      path: '/app3',
      name: 'app3',
      component: App2,
      meta: { requiresAuth: true, minLevel: 2 }
    },
    {
      path: '/app4',
      name: 'app4',
      component: App4,
      meta: { requiresAuth: true, minLevel: 3 }
    },
    {
      path: '/app5',
      name: 'app5',
      component: App8,
      meta: { requiresAuth: true, minLevel: 4 }
    },
    {
      path: '/app6',
      name: 'app6',
      component: App5,
      meta: { requiresAuth: true, minLevel: 5 }
    },
    {
      path: '/app7',
      name: 'app7',
      component: App6,
      meta: { requiresAuth: true, minLevel: 6 }
    },
    {
      path: '/auth',
      name: 'auth',
      component: Auth
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const currentUser = await fetchCurrentUser()
    if (!currentUser) {
      next('/')
    } else {
      const minLevel = to.meta.minLevel
      if (minLevel && currentUser.level < minLevel) {
        // Redirect to home if the user's level is not sufficient
        /* next('/') */
        next(false) // Redirect to the same path if the URL is manually changed or if coming from the home page
        alert('nothing to see here, click the back button')
      } else {
        next()
      }
    }
  } else {
    next()
  }
})

async function fetchCurrentUser() {
  try {
    const response = await fetch('/api/current-user')
    if (response.ok) {
      const currentUser = await response.json()
      return currentUser
    } else {
      throw new Error('Failed to fetch current user')
    }
  } catch (error) {
    console.error('Error fetching current user:', error)
    return null
  }
}

export default router
