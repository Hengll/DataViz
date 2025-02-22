<template>
  <v-app-bar>
    <v-container fluid class="d-flex justify-space-between">
      <div class="logo">
        <v-img
          :src="user.theme === 'lightTheme' ? logo : logoDark"
          @click="$router.push('/')"
        ></v-img>
      </div>
      <div>
        <v-btn to="/">{{ $t('nav.home') }}</v-btn>
        <v-btn to="/explore">{{ $t('nav.explore') }}</v-btn>
        <v-btn to="/about">{{ $t('nav.about') }}</v-btn>
        <v-menu open-on-hover close-delay="300" open-delay="0" :close-on-content-click="false">
          <template #activator="{ props }">
            <v-btn
              v-bind="props"
              :append-icon="
                props['aria-expanded'] === 'true' ? 'mdi-chevron-up' : 'mdi-chevron-down'
              "
              >{{ $t('nav.settings') }}</v-btn
            >
          </template>
          <v-list>
            <v-list-item>
              <v-switch
                v-model="user.language"
                hide-details
                true-value="en"
                false-value="zhHant"
                color="primary"
              >
                <template #prepend>
                  <v-icon icon="mdi-earth"></v-icon>
                  <span class="ms-2">{{ $t('nav.' + user.language) }}</span>
                </template>
              </v-switch>
            </v-list-item>
            <v-list-item>
              <v-switch
                v-model="user.theme"
                hide-details
                true-value="darkTheme"
                false-value="lightTheme"
                color="primary"
                @update:model-value="toggleTheme"
              >
                <template #prepend>
                  <v-icon icon="mdi-theme-light-dark"></v-icon>
                  <span class="ms-2">{{ $t('nav.' + user.theme) }}</span>
                </template>
              </v-switch>
            </v-list-item>
          </v-list>
        </v-menu>
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
import { useTheme } from 'vuetify'

const { t } = useI18n()
const user = useUserStore()
const { apiAuth } = useAxios()
const router = useRouter()
const createSnackbar = useSnackbar()
const theme = useTheme()

const logo = new URL('@/assets/logo.png', import.meta.url).href
const logoDark = new URL('@/assets/logo_dark.png', import.meta.url).href

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

const toggleTheme = () => {
  theme.global.name.value = user.theme
}
toggleTheme()
</script>

<style lang="scss" scoped>
.logo {
  width: 110px;
  cursor: pointer;
}
</style>
