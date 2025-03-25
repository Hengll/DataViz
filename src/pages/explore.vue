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
            color="secondary"
            :placeholder="$t('explore.titleOrAuthor')"
            @click:append-inner="
              $router.push({ path: '/explore', query: { search: search || undefined } })
            "
            @keydown.enter="
              $router.push({ path: '/explore', query: { search: search || undefined } })
            "
          >
          </v-text-field>
        </v-col>
      </v-col>
      <v-col cols="12" class="d-flex justify-end mb-0 pb-0">
        <v-btn-toggle :model-value="toggle">
          <v-btn
            class="h-75 underline-btn"
            variant="text"
            :class="{ 'text-primary': toggle === 0 ? true : false }"
            @click="
              $router.push({
                path: '/explore',
                query: { sort: 'view', search: $route.query.search || undefined },
              })
            "
            >{{ $t('explore.popular') }}</v-btn
          >
          <v-btn
            class="h-75 underline-btn"
            variant="text"
            :class="{ 'text-primary': toggle === 1 ? true : false }"
            @click="
              $router.push({
                path: '/explore',
                query: { sort: 'createdAt', search: $route.query.search || undefined },
              })
            "
            >{{ $t('explore.new') }}</v-btn
          >
          <v-btn
            class="h-75 underline-btn"
            variant="text"
            :class="{ 'text-primary': toggle === 2 ? true : false }"
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
          <template v-if="isLoading">
            <v-col v-for="i in 12" :key="i" class="v-col-12 v-col-sm-6 v-col-md-4 v-col-lg-3">
              <v-skeleton-loader type="image, article"></v-skeleton-loader>
            </v-col>
          </template>
          <template v-else>
            <v-col
              v-for="dashboard in dashboards"
              :key="dashboard._id"
              class="v-col-12 v-col-sm-6 v-col-md-4 v-col-lg-3"
            >
              <v-hover>
                <template #default="{ isHovering, props }">
                  <div v-bind="props" class="bg-secondary rounded">
                    <dashboard-card
                      v-bind="dashboard"
                      :read-only="true"
                      :class="{ 'dashboard-hover': isHovering ? true : false }"
                      :style="{ transition: '0.2s' }"
                    ></dashboard-card>
                  </div>
                </template>
              </v-hover>
            </v-col>
          </template>
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

const isLoading = ref(true)

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
    totalPage.value = Math.ceil(dashboards.value.length / perPage)
    isLoading.value = false
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

.dashboard-hover {
  transform: translate(5px, -5px);
}
</style>

<route lang="json">
{
  "meta": {
    "login": false,
    "title": "nav.explore"
  }
}
</route>
