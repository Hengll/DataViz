<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-row>
          <v-col
            v-for="dashboard in dashboards"
            :key="dashboard._id"
            class="v-col-12 v-col-sm-6 v-col-md-4 v-col-lg-3"
          >
            <dashboard-card
              v-bind="dashboard"
              @edit="$router.push(`/editor/dashboard/${dashboard._id}`)"
              @delete="openConfirmDialog(dashboard._id)"
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

const { api } = useAxios()

const dashboards = ref([])

const getDashboards = async () => {
  try {
    const { data } = await api.get('/dashboard/public')
    dashboards.value = data.result
  } catch (err) {
    console.log(err)
  }
}
getDashboards()
</script>

<style lang="scss" scoped></style>

<route lang="json">
{
  "meta": {
    "login": false,
    "admin": false,
    "title": "nav.explore"
  }
}
</route>
