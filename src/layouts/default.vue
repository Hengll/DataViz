<template>
  <v-app-bar height="60">
    <v-container fluid class="d-flex justify-space-between">
      <v-btn>LOGO</v-btn>
      <div>
        <v-btn to="/">{{ $t('nav.home') }}</v-btn>
        <v-btn to="/explore">{{ $t('nav.explore') }}</v-btn>
        <v-btn to="/tutorial">{{ $t('nav.tutorial') }}</v-btn>
        <v-btn to="/about">{{ $t('nav.about') }}</v-btn>
        <v-btn>{{ $t('nav.setting') }}</v-btn>
      </div>
      <div>
        <template v-for="nav in navs" :key="nav.to">
          <v-btn :to="nav.to">{{ nav.text }}</v-btn>
        </template>
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
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const navs = computed(() => {
  return [
    { to: '/login', text: t('nav.login') },
    { to: '/register', text: t('nav.register') },
  ]
})
</script>
