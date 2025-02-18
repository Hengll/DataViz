// Utilities
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useAxios } from '@/composables/axios'

export const usePublicStore = defineStore('public', () => {
  const { api } = useAxios()

  const saveLoading = ref(false)

  const dashboard = ref({})

  const dataVariables = computed(() => {
    if (dashboard.value.dataSet) {
      return Object.keys(dashboard.value.dataSet.data[0])
    } else {
      return []
    }
  })

  const filterRule = ref({
    categoryFilter: {},
    rangeFilter: {},
  })

  const filterData = computed(() => {
    if (dashboard.value.dataSet) {
      return dashboard.value.dataSet.data.filter((item) => {
        for (const key in filterRule.value.categoryFilter) {
          if (!filterRule.value.categoryFilter[key].includes(item[key])) {
            return false
          }
        }
        return true
      })
    } else {
      return {}
    }
  })

  const getDashboardWithAPI = async (id) => {
    try {
      const { data } = await api.get(`/dashboard/public/${id}`)
      dashboard.value = data.result
    } catch (err) {
      return Promise.reject(err)
    }
  }

  const clearDashboard = () => {
    dashboard.value = {}
  }

  return {
    saveLoading,
    dashboard,
    dataVariables,
    filterRule,
    filterData,
    getDashboardWithAPI,
    clearDashboard,
  }
})
