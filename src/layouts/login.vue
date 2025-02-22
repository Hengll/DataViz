<template>
  <v-app-bar height="60">
    <v-container fluid>
      <v-btn to="/">LOGO</v-btn>
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

theme.global.name.value = user.theme
</script>
