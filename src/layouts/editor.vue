<template>
  <v-app-bar location="bottom" height="40">
    <v-container fluid>
      <v-btn class="pa-1 h-25 mx-1 border" :to="'/editor/data/' + $route.params.id">{{
        $t('nav.linkData')
      }}</v-btn>
      <v-btn class="pa-1 h-25 mx-1 border" :to="'/editor/dashboard/' + $route.params.id">{{
        $t('nav.editDashboard')
      }}</v-btn>
      <v-btn class="pa-1 h-25 mx-1 border" :to="'/editor/preview/' + $route.params.id">{{
        $t('nav.previewDashboard')
      }}</v-btn>
    </v-container>
  </v-app-bar>
  <v-main>
    <v-container fluid>
      <router-view></router-view>
    </v-container>
  </v-main>
</template>
