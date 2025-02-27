<template>
  <v-app-bar class="app-bar">
    <v-container fluid class="d-flex justify-space-between align-center">
      <div class="logo">
        <v-img
          :src="user.theme === 'lightTheme' ? logo : logoDark"
          @click="$router.push('/')"
        ></v-img>
      </div>
      <!-- 電腦版面 -->
      <template v-if="!mobile">
        <div>
          <v-btn class="mx-1" to="/">{{ $t('nav.home') }}</v-btn>
          <v-btn class="mx-1" to="/explore">{{ $t('nav.explore') }}</v-btn>
          <v-btn class="mx-1" to="/about">{{ $t('nav.about') }}</v-btn>
          <v-menu open-on-hover close-delay="300" open-delay="0" :close-on-content-click="false">
            <template #activator="{ props }">
              <v-btn
                rounded="0"
                v-bind="props"
                :append-icon="
                  props['aria-expanded'] === 'true' ? 'mdi-chevron-up' : 'mdi-chevron-down'
                "
                >{{ $t('nav.settings') }}</v-btn
              >
            </template>
            <v-list class="app-menu border">
              <v-list-item>
                <v-switch
                  v-model="user.language"
                  class="switch"
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
                  class="switch"
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
      </template>
      <!-- 手機版面 -->
      <template v-else>
        <div>
          <v-btn v-if="!user.isLoggedIn" to="/register">{{ $t('nav.register') }}</v-btn>
          <v-btn v-else to="/auth">{{ $t('nav.myWorkSpace') }}</v-btn>
          <v-menu :offset="9" :width="1920" :z-index="0">
            <template #activator="{ props }">
              <v-btn v-bind="props" icon="mdi-menu"></v-btn>
            </template>
            <v-list class="app-menu">
              <v-list-item>
                <v-btn class="ps-0 justify-start" variant="text" to="/">{{ $t('nav.home') }}</v-btn>
              </v-list-item>
              <v-list-item>
                <v-btn class="ps-0 justify-start" variant="text" to="/explore">{{
                  $t('nav.explore')
                }}</v-btn>
              </v-list-item>
              <v-list-item>
                <v-btn class="ps-0 justify-start" variant="text" to="/about">{{
                  $t('nav.about')
                }}</v-btn>
              </v-list-item>
              <v-list-item>
                <v-menu
                  open-on-hover=""
                  transition="slide-x-transition"
                  close-delay="300"
                  open-delay="0"
                  :close-on-content-click="false"
                  submenu
                  :offset="[0, 76]"
                >
                  <template #activator="{ props }">
                    <v-btn
                      class="ps-0 justify-start"
                      variant="text"
                      v-bind="props"
                      :append-icon="
                        props['aria-expanded'] === 'true' ? 'mdi-menu-left' : 'mdi-menu-right'
                      "
                      >{{ $t('nav.settings') }}</v-btn
                    >
                  </template>
                  <v-list class="setting-menu">
                    <v-list-item class="my-0 py-0">
                      <v-switch
                        v-model="user.language"
                        class="switch"
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
                    <v-list-item class="my-0 py-0">
                      <v-switch
                        v-model="user.theme"
                        class="switch"
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
              </v-list-item>
              <v-list-item>
                <v-btn v-if="!user.isLoggedIn" class="w-100 border" to="/login">{{
                  $t('nav.login')
                }}</v-btn>
                <v-btn v-else class="w-100 border" @click="logout">{{ $t('nav.logout') }}</v-btn>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </template>
    </v-container>
  </v-app-bar>
  <v-main>
    <router-view></router-view>
  </v-main>
  <v-footer>
    <v-container fluid>
      <v-row class="flex-column flex-md-row">
        <v-col class="flex-md-grow-0">
          <div class="footer-logo">
            <v-img :src="user.theme === 'lightTheme' ? logo : logoDark"></v-img>
          </div>
          <p class="mt-2 ms-1">DataViz | {{ $t('footer.slogan') }}</p>
        </v-col>
        <v-col class="flex-md-grow-1">
          <v-row class="justify-md-end">
            <v-col class="v-col-6 v-col-md-3">
              <v-list>
                <v-list-item class="text-grey text-h6">{{ $t('footer.link') }}</v-list-item>
                <v-list-item>
                  <router-link class="footer-link" to="/">{{
                    $t('footer.home')
                  }}</router-link></v-list-item
                >
                <v-list-item>
                  <router-link class="footer-link" to="/explore">{{
                    $t('footer.explore')
                  }}</router-link></v-list-item
                >
                <v-list-item>
                  <router-link class="footer-link" to="/about">{{
                    $t('footer.about')
                  }}</router-link></v-list-item
                >
                <v-list-item>
                  <router-link class="footer-link" to="/">{{
                    $t('footer.contact')
                  }}</router-link></v-list-item
                >
              </v-list>
            </v-col>
            <v-col class="v-col-6 v-col-md-3">
              <v-list>
                <v-list-item class="text-grey text-h6">{{ $t('footer.policy') }}</v-list-item>
                <v-list-item>
                  <router-link class="footer-link" to="/">{{
                    $t('footer.termsOfService')
                  }}</router-link></v-list-item
                >
                <v-list-item>
                  <router-link class="footer-link" to="/">{{
                    $t('footer.privacyPolicy')
                  }}</router-link></v-list-item
                >
              </v-list>
            </v-col>
          </v-row>
        </v-col>
        <v-divider></v-divider>
        <v-col cols="12" class="text-center opacity-50">© 2025 All Rights Reserved.</v-col>
      </v-row>
    </v-container>
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
import { useDisplay } from 'vuetify'

const { t } = useI18n()
const user = useUserStore()
const { apiAuth } = useAxios()
const router = useRouter()
const createSnackbar = useSnackbar()
const theme = useTheme()
const { mobile } = useDisplay()

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
.app-bar {
  background-color: rgb(var(--v-theme-surface), 0.75);
  backdrop-filter: blur(3px);
}

.app-menu {
  background-color: rgb(var(--v-theme-surface), 0.75) !important;
  backdrop-filter: blur(3px);
}

.setting-menu {
  background-color: transparent !important;
}

.logo {
  width: 110px;
  cursor: pointer;
}

.footer-logo {
  width: 250px;
}

.footer-link {
  text-decoration: none;
  color: rgb(var(--v-theme-on-surface));
  &:hover {
    text-decoration: underline;
  }
}

:deep(.v-btn__overlay) {
  background: transparent;
  opacity: 1;
}

:deep(.v-btn--active > .v-btn__overlay) {
  border-bottom: 1px solid rgba(var(--v-theme-secondary));
  border-radius: 0;
}

:deep(.v-btn:hover) {
  opacity: 1;
  background: transparent;
  border-bottom: 1px solid rgba(var(--v-theme-secondary));
  border-radius: 0;
}

:deep(.switch) {
  font-size: 14px;
  height: 28px;
  display: flex;
  align-items: center;
}
</style>
