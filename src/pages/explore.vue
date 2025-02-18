<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="d-flex justify-center align-center">
        <v-col cols="6">
          <v-text-field
            variant="outlined"
            density="compact"
            append-inner-icon="mdi-magnify"
          ></v-text-field>
        </v-col>
      </v-col>
      <v-col cols="12" class="d-flex justify-end mb-0 pb-0">
        <v-btn-toggle v-model="toggle" divided>
          <v-btn class="h-75">{{ $t('explore.popular') }}</v-btn>
          <v-btn class="h-75">{{ $t('explore.new') }}</v-btn>
          <v-btn class="h-75">{{ $t('explore.good') }}</v-btn>
        </v-btn-toggle>
      </v-col>
      <v-col cols="12">
        <v-row>
          <v-col
            v-for="dashboard in dashboards"
            :key="dashboard._id"
            class="v-col-12 v-col-sm-6 v-col-md-4 v-col-lg-3"
          >
            <v-skeleton-loader v-if="isLoading" type="image, article"></v-skeleton-loader>
            <dashboard-card v-else v-bind="dashboard" :read-only="true"></dashboard-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12">
        <v-pagination :length="4"></v-pagination>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAxios } from '@/composables/axios'
import DashboardCard from '@/components/DashboardCard.vue'

const { api } = useAxios()

const toggle = ref(0)
const isLoading = ref(true)

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

onMounted(() => {
  isLoading.value = false
})
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
