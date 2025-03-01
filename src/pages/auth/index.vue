<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <h1>{{ $t('auth.myDashboards') }}</h1>
      </v-col>
      <v-divider></v-divider>
      <v-col cols="6">
        <v-btn
          prepend-icon="mdi-plus"
          variant="elevated"
          color="primary"
          @click="createDashboard"
          >{{ $t('dashboard.new') }}</v-btn
        >
      </v-col>
      <v-col :cols="6" class="d-flex align-center justify-end">
        <div class="me-5" :style="{ width: '80px' }">
          <v-btn-toggle v-model="view" density="compact" divided class="w-100">
            <v-btn
              :value="0"
              variant="outlined"
              color="primary"
              class="w-50"
              icon="mdi-view-grid"
            ></v-btn>
            <v-btn
              :value="1"
              variant="outlined"
              color="primary"
              class="w-50"
              icon="mdi-menu"
            ></v-btn>
          </v-btn-toggle>
        </div>
        <div :style="{ width: '100px' }">
          <v-menu>
            <template #activator="{ props }">
              <v-btn variant="outlined" color="primary" v-bind="props"
                >sort
                <template #append>
                  <v-icon
                    :icon="
                      props['aria-expanded'] === 'true' ? 'mdi-chevron-up' : 'mdi-chevron-down'
                    "
                  ></v-icon>
                </template>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(sort, index) in sorts"
                :key="index"
                class="d-flex align-center"
                @click="sortBy = sort"
              >
                <span>{{ $t('dashboard.' + sort) }}</span>
                <v-icon v-if="sort === sortBy" icon="mdi-check "></v-icon>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </v-col>
      <v-col cols="12">
        <v-row>
          <template v-if="view === 0">
            <v-col
              v-for="dashboard in dashboards"
              :key="dashboard._id"
              class="v-col-12 v-col-sm-6 v-col-md-4 v-col-lg-3"
            >
              <v-hover>
                <template #default="{ isHovering, props }">
                  <div v-bind="props" class="bg-secondary rounded">
                    <v-skeleton-loader v-if="isLoading" type="image, article"></v-skeleton-loader>
                    <dashboard-card
                      v-else
                      v-bind="dashboard"
                      :read-only="false"
                      :class="{ 'dashboard-hover': isHovering ? true : false }"
                      :style="{ transition: '0.2s' }"
                      @edit="$router.push(`/editor/dashboard/${dashboard._id}`)"
                      @delete="openConfirmDialog(dashboard._id)"
                    ></dashboard-card>
                  </div>
                </template>
              </v-hover>
            </v-col>
          </template>
          <template v-else>
            <v-col v-for="dashboard in dashboards" :key="dashboard._id" cols="12">
              <v-hover>
                <template #default="{ isHovering, props }">
                  <div v-bind="props" class="bg-secondary rounded">
                    <v-skeleton-loader v-if="isLoading" type="image, article"></v-skeleton-loader>
                    <dashboard-card
                      v-else
                      v-bind="dashboard"
                      :read-only="false"
                      :card-form="false"
                      :class="{ 'dashboard-hover': isHovering ? true : false }"
                      :style="{ transition: '0.2s' }"
                      @edit="$router.push(`/editor/dashboard/${dashboard._id}`)"
                      @delete="openConfirmDialog(dashboard._id)"
                    ></dashboard-card>
                  </div>
                </template>
              </v-hover>
            </v-col>
          </template>
        </v-row>
      </v-col>
    </v-row>
  </v-container>

  <v-dialog
    v-model="confirmDialog.isOpen"
    persistent
    class="w-250"
    @keydown.enter.once="deleteDashboard(confirmDialog.id)"
  >
    <v-card>
      <v-card-title class="text-center">確認刪除</v-card-title>
      <v-divider></v-divider>
      <v-card-actions class="d-flex justify-center">
        <v-btn class="border" type="text" @click="deleteDashboard(confirmDialog.id)">確定</v-btn>
        <v-btn class="border" type="text" @click="closeConfirmDialog">取消</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useAxios } from '@/composables/axios'
import DashboardCard from '@/components/DashboardCard.vue'
import { useI18n } from 'vue-i18n'
import { useSnackbar } from 'vuetify-use-dialog'
import { useRouter } from 'vue-router'

const { apiAuth } = useAxios()
const { t } = useI18n()
const createSnackbar = useSnackbar()
const router = useRouter()

const isLoading = ref(true)
const view = ref(0)
const sorts = ref(['updatedAt_-1', 'updatedAt_1', 'createdAt_-1', 'createdAt_1'])
const sortBy = ref('updatedAt_-1')
const dashboards = ref([])

watch(sortBy, () => {
  const rule = sortBy.value.split('_')

  dashboards.value.sort((a, b) => {
    return (new Date(a[rule[0]]).getTime() - new Date(b[rule[0]]).getTime()) * rule[1]
  })
})

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

const createDashboard = async () => {
  try {
    const { data } = await apiAuth.post('/dashboard')
    router.push(`/editor/data/${data.result._id}`)
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

onMounted(() => {
  isLoading.value = false
})
</script>

<style lang="scss" scoped>
.w-250 {
  width: 250px;
}

.dashboard-hover {
  transform: translate(5px, -5px);
}
</style>

<route lang="json">
{
  "meta": {
    "layout": "auth",
    "login": true,
    "admin": false,
    "title": "auth.myDashboards"
  }
}
</route>
