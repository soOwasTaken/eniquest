import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import App1 from '../App1.vue'
import App2 from '../App2.vue'
import App3 from '../App3.vue'
import App4 from '../App4.vue'
import App5 from '../App5.vue'
import App6 from '../App6.vue'
import App7 from '../App7.vue'
import Auth from '../Auth.vue'
import store from '../stores/store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Auth
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
      meta: { requiresAuth: true, gameIndex: 1 }
    },
    {
      path: '/app3',
      name: 'app3',
      component: App2,
      meta: { requiresAuth: true, gameIndex: 2 }
    },
    {
      path: '/app4',
      name: 'app4',
      component: App4,
      meta: { requiresAuth: true, gameIndex: 3 }
    },
    {
      path: '/app5',
      name: 'app5',
      component: App7,
      meta: { requiresAuth: true, gameIndex: 4 }
    },
    {
      path: '/app6',
      name: 'app6',
      component: App5,
      meta: { requiresAuth: true, gameIndex: 5 }
    },
    {
      path: '/app7',
      name: 'app7',
      component: App6,
      meta: { requiresAuth: true, gameIndex: 6 }
    },
    {
      path: '/auth',
      name: 'auth',
      component: Auth
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isLoggedIn()) {
      next('/')
    } else {
      const gameIndex = to.meta.gameIndex as number // Cast gameIndex to number
      if (gameIndex !== undefined) {
        const previousGameSuccess = store.state.gameSuccess[gameIndex - 1]
        if (previousGameSuccess) {
          next()
        } else {
          if (to.path !== from.path || from.path === '/') {
            next(false) // Redirect to the same path if the URL is manually changed or if coming from the home page
            alert('nothing to see here, click the back button')
          } else {
            next({ path: from.path }) // Redirect to the current path if the previous game is not succeeded
          }
        }
      } else {
        next()
      }
    }
  } else {
    if (to.path !== from.path) {
      next(false) // Do nothing if navigating to a non-authenticated route from another non-authenticated route
    } else {
      next()
    }
  }
})

function isLoggedIn() {
  return store.getters.isLoggedIn
}

export default router
