import { createRouter, createWebHistory } from 'vue-router/auto'
import { handleHotUpdate, routes } from 'vue-router/auto-routes'

import 'nprogress/nprogress.css'
import NProgress from 'nprogress'
import { useTitle } from '@vueuse/core'

import useUserStore from '@/stores/modules/user'
import useAuthStore from '@/stores/modules/auth'
import useRouteCacheStore from '@/stores/modules/routeCache'

import type { EnhancedRouteLocation } from './types'

const title = useTitle()
NProgress.configure({ showSpinner: false, parent: '#app' })

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_PUBLIC_PATH),
  routes,
})

// This will update routes at runtime without reloading the page
if (import.meta.hot) {
  handleHotUpdate(router)
}

router.beforeEach(async (to: EnhancedRouteLocation, _from, next) => {
  NProgress.start()

  const authStore = useAuthStore()
  const userStore = useUserStore()
  const routeCacheStore = useRouteCacheStore()

  // Route cache
  routeCacheStore.addRoute(to)

  // Set page title
  title.value = to.meta.title

  if (authStore.isLogin() && !userStore.userInfo?.uid) {
    await userStore.info()
    next()
  }
  else {
    next()
  }
})

router.afterEach(() => {
  NProgress.done()
})

export default router
