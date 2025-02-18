<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="d-flex justify-center align-center">
        <v-col cols="6">
          <v-text-field
            :model-value="search"
            variant="outlined"
            density="compact"
            append-inner-icon="mdi-magnify"
            :placeholder="$t('explore.titleOrAuthor')"
            @click:append-inner="onSearch($event.target.value)"
          ></v-text-field>
        </v-col>
      </v-col>
      <v-col cols="12" class="d-flex justify-end mb-0 pb-0">
        <v-btn-toggle v-model="toggle" divided>
          <v-btn class="h-75" @click="sortBy = 'view'">{{ $t('explore.popular') }}</v-btn>
          <v-btn class="h-75" @click="sortBy = 'createAt'">{{ $t('explore.new') }}</v-btn>
          <v-btn class="h-75" @click="sortBy = 'like'">{{ $t('explore.good') }}</v-btn>
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
        <v-pagination v-model="currentPage" :length="totalPage"></v-pagination>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useAxios } from '@/composables/axios'
import DashboardCard from '@/components/DashboardCard.vue'

const { api } = useAxios()

const toggle = ref(0)
const isLoading = ref(true)

const dashboards = ref([])
const totalPage = ref(1)
const perPage = 12
const currentPage = ref(1)
const sortBy = ref('view')
const search = ref('')

const getDashboards = async () => {
  try {
    const { data } = await api.get(
      `/dashboard/public?page=${currentPage.value}&limit=${perPage}&sort=${sortBy.value}&search=${search.value}`,
    )
    dashboards.value = data.result
    totalPage.value = Math.ceil(data.numsOfData / perPage)
  } catch (err) {
    console.log(err)
  }
}
getDashboards()

const onSearch = async (value) => {
  try {
    search.value = value
    await getDashboards()
  } catch (err) {
    console.log(err)
  }
}

watch([currentPage, sortBy], () => {
  getDashboards()
})

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
