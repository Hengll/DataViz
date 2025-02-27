<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="d-flex justify-center align-center">
        <v-col cols="6">
          <v-text-field
            v-model="search"
            variant="outlined"
            density="compact"
            append-inner-icon="mdi-magnify"
            :placeholder="$t('explore.titleOrAuthor')"
            @click:append-inner="
              $router.push({ path: '/explore', query: { search: search || undefined } })
            "
            @keydown.enter="
              $router.push({ path: '/explore', query: { search: search || undefined } })
            "
          ></v-text-field>
        </v-col>
      </v-col>
      <v-col cols="12" class="d-flex justify-end mb-0 pb-0">
        <v-btn-toggle :model-value="toggle">
          <v-btn
            variant="text"
            class="h-75"
            :class="{ active: toggle === 0 ? true : false }"
            @click="
              $router.push({
                path: '/explore',
                query: { sort: 'view', search: $route.query.search || undefined },
              })
            "
            >{{ $t('explore.popular') }}</v-btn
          >
          <v-btn
            variant="text"
            class="h-75"
            :class="{ active: toggle === 1 ? true : false }"
            @click="
              $router.push({
                path: '/explore',
                query: { sort: 'createdAt', search: $route.query.search || undefined },
              })
            "
            >{{ $t('explore.new') }}</v-btn
          >
          <v-btn
            variant="text"
            class="h-75"
            :class="{ active: toggle === 3 ? true : false }"
            @click="
              $router.push({
                path: '/explore',
                query: { sort: 'like', search: $route.query.search || undefined },
              })
            "
            >{{ $t('explore.good') }}</v-btn
          >
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
            <dashboard-card
              v-else
              class="dashboard-card"
              v-bind="dashboard"
              :read-only="true"
            ></dashboard-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12">
        <v-pagination
          v-model="currentPage"
          :length="totalPage"
          @click="
            $router.push({
              path: '/explore',
              query: {
                page: currentPage,
                sort: $route.query.sort || undefined,
                search: $route.query.search || undefined,
              },
            })
          "
        ></v-pagination>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAxios } from '@/composables/axios'
import { useRoute } from 'vue-router'
import DashboardCard from '@/components/DashboardCard.vue'

const { api } = useAxios()
const route = useRoute()

const isLoading = computed(() => {
  return dashboards.value.length === 0
})

const search = ref('')
const toggle = computed(() => {
  if (route.query.sort === 'createdAt') {
    return 1
  } else if (route.query.sort === 'like') {
    return 2
  } else {
    return 0
  }
})

const dashboards = ref([])
const totalPage = ref(1)
const currentPage = ref(route.query.page * 1 || 1)
const perPage = 12

const getDashboards = async () => {
  try {
    const { data } = await api.get(
      `/dashboard/public?page=${route.query.page || 1}&limit=${perPage}&sort=${route.query.sort || 'view'}&search=${route.query.search || ''}`,
    )
    dashboards.value = data.result
    totalPage.value = Math.ceil(data.numsOfData / perPage)
  } catch (err) {
    console.log(err)
  }
}
getDashboards()
</script>

<style lang="scss" scoped>
:deep(.v-btn-toggle > .v-btn.v-btn--active:not(.v-btn--disabled) > .v-btn__overlay) {
  background: transparent;
  opacity: 1;
}

:deep(.active > .v-btn__overlay) {
  border-bottom: 1px solid rgba(var(--v-theme-secondary));
  border-radius: 0;
}

.dashboard-card:hover {
  transition: 0.5s;
  transform: scale(1.1);
}
</style>

<route lang="json">
{
  "meta": {
    "login": false,
    "admin": false,
    "title": "nav.explore"
  }
}
</route>
