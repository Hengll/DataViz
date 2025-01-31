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
          <v-col
            v-for="dashboard in dashboards"
            :key="dashboard._id"
            class="v-col-12 v-col-sm-6 v-col-md-4 v-col-lg-3"
          >
            <dashboard-card
              v-bind="dashboard"
              @delete="deleteDashboard(dashboard._id)"
            ></dashboard-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useAxios } from '@/composables/axios'
import DashboardCard from '@/components/DashboardCard.vue'
import { useI18n } from 'vue-i18n'
import { useSnackbar } from 'vuetify-use-dialog'

const { apiAuth } = useAxios()
const { t } = useI18n()
const createSnackbar = useSnackbar()

const dashboards = ref([])

const getDashboards = async () => {
  try {
    const { data } = await apiAuth.get('/dashboard')
    dashboards.value = data.result
  } catch (err) {
    console.log(err)
  }
}
getDashboards()

const deleteDashboard = async (id) => {
  try {
    await apiAuth.delete(`/dashboard/${id}`)

    getDashboards()
    createSnackbar({
      text: t('dashboard.deleteSuccess'),
      snackbarProps: {
        color: 'green',
      },
    })
  } catch (err) {
    console.log(err)
    createSnackbar({
      text: t('dashboard.' + err?.response?.data?.message || 'unknownError'),
      snackbarProps: {
        color: 'red',
      },
    })
  }
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
