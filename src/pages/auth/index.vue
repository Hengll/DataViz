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
              @delete="openConfirmDialog(dashboard._id)"
            ></dashboard-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>

  <v-dialog v-model="confirmDialog.isOpen" persistent class="w-250">
    <v-card>
      <v-card-title class="text-center">確認刪除</v-card-title>
      <v-divider></v-divider>
      <v-card-actions class="d-flex justify-center">
        <v-btn class="border" type="text" @click="deleteDashboard(confirmDialog.id)">確定</v-btn>
        <v-btn class="border" type="text" @click="closeConfirmDialog()">取消</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
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
const confirmDialog = ref({
  isOpen: false,
  id: '',
})
const openConfirmDialog = (id) => {
  confirmDialog.value.id = id
  confirmDialog.value.isOpen = true
}
const closeConfirmDialog = () => {
  confirmDialog.value.id = ''
  confirmDialog.value.isOpen = false
}

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
    closeConfirmDialog()
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

<style lang="scss" scoped>
.w-250 {
  width: 250px;
}
</style>

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
