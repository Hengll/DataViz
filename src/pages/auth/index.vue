<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <h1>{{ $t('auth.dashboardManagement') }}</h1>
      </v-col>
      <v-col cols="12">
        <v-btn>{{ $t('dashboard.new') }}</v-btn>
      </v-col>
      <v-col cols="12">
        <v-row>
          <v-col class="v-col-12 v-col-sm-6 v-col-md-4 v-col-lg-3">
            <dashboard-card v-bind="dashboard"></dashboard-card>
          </v-col>
          <v-col class="v-col-12 v-col-sm-6 v-col-md-4 v-col-lg-3">
            <dashboard-card v-bind="dashboard"></dashboard-card>
          </v-col>
          <v-col class="v-col-12 v-col-sm-6 v-col-md-4 v-col-lg-3">
            <dashboard-card v-bind="dashboard"></dashboard-card>
          </v-col>
          <v-col class="v-col-12 v-col-sm-6 v-col-md-4 v-col-lg-3">
            <dashboard-card v-bind="dashboard"></dashboard-card>
          </v-col>
          <v-col class="v-col-12 v-col-sm-6 v-col-md-4 v-col-lg-3">
            <dashboard-card v-bind="dashboard"></dashboard-card>
          </v-col>
          <v-col class="v-col-12 v-col-sm-6 v-col-md-4 v-col-lg-3">
            <dashboard-card v-bind="dashboard"></dashboard-card>
          </v-col>
          <v-col class="v-col-12 v-col-sm-6 v-col-md-4 v-col-lg-3">
            <dashboard-card v-bind="dashboard"></dashboard-card>
          </v-col>
          <v-col class="v-col-12 v-col-sm-6 v-col-md-4 v-col-lg-3">
            <dashboard-card v-bind="dashboard"></dashboard-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import DashboardCard from '@/components/DashboardCard.vue'

const onDelete = () => {}

const dashboard = {
  _id: '123',
  dashboardName: 'ABC',
  user: 'aaaa',
  like: 200,
  view: 300,
  image:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Aspect-ratio-16x9.svg/1920px-Aspect-ratio-16x9.svg.png',
  onDelete: onDelete,
}
</script>

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
