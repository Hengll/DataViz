<template>
  <v-app-bar height="60">
    <v-container fluid class="d-flex justify-space-between">
      <v-btn>LOGO</v-btn>
      <div>
        <v-btn to="/">{{ $t('nav.home') }}</v-btn>
        <v-btn to="/explore">{{ $t('nav.explore') }}</v-btn>
        <v-btn to="/about">{{ $t('nav.about') }}</v-btn>
        <v-btn>{{ $t('nav.settings') }}</v-btn>
      </div>
      <div>
        <v-btn v-if="user.isLoggedIn" @click="logout">{{ $t('nav.logout') }}</v-btn>
        <template v-for="nav in navs" :key="nav.to">
          <v-btn v-if="nav.show" :to="nav.to">{{ nav.text }}</v-btn>
        </template>
      </div>
    </v-container>
  </v-app-bar>
  <v-main>
    <router-view></router-view>
  </v-main>
  <v-footer>
    <v-container fluid> footer </v-container>
  </v-footer>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '@/stores/user'
import { useAxios } from '@/composables/axios'
import { useRouter } from 'vue-router'
import { useSnackbar } from 'vuetify-use-dialog'

const { t } = useI18n()
const user = useUserStore()
const { apiAuth } = useAxios()
const router = useRouter()
const createSnackbar = useSnackbar()

const navs = computed(() => {
  return [
    { to: '/login', text: t('nav.login'), show: !user.isLoggedIn },
    { to: '/register', text: t('nav.register'), show: !user.isLoggedIn },
    { to: '/auth', text: t('nav.myWorkSpace'), show: user.isLoggedIn },
  ]
})

const logout = async () => {
  try {
    await apiAuth.delete('/user/logout')
    router.push('/')
  } catch (err) {
    console.log(err)
  }
  user.logout()
  createSnackbar({
    text: t('logout.success'),
    snackbarProps: {
      color: 'green',
    },
  })
}
</script>
