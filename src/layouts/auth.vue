<template>
  <v-navigation-drawer>
    <v-list>
      <v-list-item
        :prepend-avatar="
          user.avatar || 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png'
        "
        :title="user.userName"
      ></v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list>
      <v-list-item v-for="nav in navs" :key="nav.to" :title="nav.text" :to="nav.to"></v-list-item>
    </v-list>
  </v-navigation-drawer>
  <v-main>
    <router-view></router-view>
  </v-main>
</template>

<script setup>
import { computed } from 'vue'
import { useUserStore } from '@/stores/user'
import { useI18n } from 'vue-i18n'

const user = useUserStore()
const { t } = useI18n()

const navs = computed(() => {
  return [
    { to: '/auth', text: t('nav.dashboardManagement') },
    { to: '/auth/datas', text: t('nav.datasetManagement') },
    { to: '/', text: t('nav.home') },
  ]
})
</script>

<style lang="scss" scoped>
:deep(.v-list-item__prepend) {
  & .v-avatar {
    border: 1px solid black;
  }
}
</style>
