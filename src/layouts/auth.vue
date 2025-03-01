<template>
  <v-navigation-drawer v-model="drawer" width="220">
    <v-list>
      <v-list-item>
        <template #prepend>
          <v-btn icon="mdi-menu" variant="text" @click.stop="drawer = !drawer"></v-btn>
        </template>
        <v-avatar class="bg-orange-darken-1" :image="user.avatar || userIcon"></v-avatar>
        <span>
          {{ user.userName }}
        </span>
      </v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list>
      <v-list-item v-for="nav in navs" :key="nav.to" :title="nav.text" :to="nav.to">
        <template #prepend>
          <v-icon :icon="nav.icon" :color="nav.color"></v-icon>
        </template>
      </v-list-item>
    </v-list>
    <div class="logo">
      <v-img :src="user.theme === 'lightTheme' ? logo : logoDark"></v-img>
    </div>
  </v-navigation-drawer>

  <v-btn class="fixed-btn" icon="mdi-menu" variant="text" @click.stop="drawer = !drawer"></v-btn>
  <v-main>
    <router-view></router-view>
  </v-main>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useUserStore } from '@/stores/user'
import { useTheme } from 'vuetify'
import { useI18n } from 'vue-i18n'
import { useDisplay } from 'vuetify'

const logo = new URL('@/assets/logo.png', import.meta.url).href
const logoDark = new URL('@/assets/logo_dark.png', import.meta.url).href

const user = useUserStore()
const theme = useTheme()
const { t } = useI18n()
const { mobile } = useDisplay()

theme.global.name.value = user.theme

const drawer = ref(!mobile.value)
const navs = computed(() => {
  return [
    { to: '/auth', text: t('nav.myDashboards'), icon: 'mdi-chart-bar', color: '#ee2f35' },
    { to: '/auth/datas', text: t('nav.myDataSets'), icon: 'mdi-database', color: '#fa5a0f' },
    { to: `/author/${user.id}`, text: t('nav.myPage'), icon: 'mdi-account-card', color: '#f49610' },
    { to: '/', text: t('nav.home'), icon: 'mdi-home', color: '#fbbb11' },
  ]
})
const userIcon = new URL('@/assets/Sample_User_Icon.png', import.meta.url).href
</script>

<style lang="scss" scoped>
:deep(.v-avatar) {
  border: 1px solid black;
  margin-right: 0.5rem;
}

.fixed-btn {
  top: 12px;
  left: 16px;
}

.logo {
  width: 200px;
  position: absolute;
  left: 0;
  bottom: 20px;
}
</style>
