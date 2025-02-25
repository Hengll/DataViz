<template>
  <v-app-bar height="60">
    <v-container fluid>
      <div class="logo">
        <v-img
          :src="user.theme === 'lightTheme' ? logo : logoDark"
          @click="$router.push('/')"
        ></v-img>
      </div>
    </v-container>
  </v-app-bar>
  <v-main>
    <v-container>
      <router-view></router-view>
    </v-container>
  </v-main>
</template>

<script setup>
import { useUserStore } from '@/stores/user'
import { useTheme } from 'vuetify'

const user = useUserStore()
const theme = useTheme()

const logo = new URL('@/assets/logo.png', import.meta.url).href
const logoDark = new URL('@/assets/logo_dark.png', import.meta.url).href

theme.global.name.value = user.theme
</script>

<style lang="scss" scoped>
.logo {
  width: 110px;
  cursor: pointer;
}
</style>
