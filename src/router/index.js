/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHashHistory } from 'vue-router/auto'
import { setupLayouts } from 'virtual:generated-layouts'
import { routes } from 'vue-router/auto-routes'
import i18n from '@/i18n'
import { useAxios } from '@/composables/axios'
import { useUserStore } from '@/stores/user'
import { useDashboardStore } from '@/stores/dashboard'
import { START_LOCATION } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(routes),
  scrollBehavior() {
    return { top: 0 }
  },
})

router.beforeEach(async (to, from, next) => {
  const { apiAuth } = useAxios()
  const user = useUserStore()
  const editor = useDashboardStore()

  i18n.global.locale.value = user.language

  if (from === START_LOCATION && user.isLoggedIn) {
    try {
      const { data } = await apiAuth.get('user/profile')
      user.login(data.result)
    } catch (err) {
      console.log(err)
      user.logout()
    }
  }

  if (user.isLoggedIn && ['/login', '/register'].includes(to.path)) {
    next('/')
  } else if (
    user.isLoggedIn &&
    ['/editor/data/', '/editor/dashboard/', '/editor/preview/'].some((path) =>
      to.path.includes(path),
    ) &&
    !['/editor/data/', '/editor/dashboard/', '/editor/preview/'].some((path) =>
      from.path.includes(path),
    )
  ) {
    try {
      await editor.getDashboardWithAPI(to.params.id)
      next()
    } catch (err) {
      console.log(err)
      next('/')
    }
  } else if (to.meta.login && !user.isLoggedIn) {
    next('/login')
  } else {
    next()
  }
})

router.afterEach((to) => {
  document.title = i18n.global.t(to.meta.title) + ' - DataViz'
})

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router
