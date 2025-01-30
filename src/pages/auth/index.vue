<template>
  <v-container fluid>
    <h1>{{ $t('auth.dashboardManagement') }}</h1>
  </v-container>
</template>

<style lang="scss" scoped></style>

<route lang="json">
{
  "meta": {
    "layout": "auth",
    "login": true,
    "admin": false,
    "title": "auth.dashboardManagement"
  }
}
</route>
