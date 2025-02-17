// Utilities
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useAxios } from '@/composables/axios'

export const useEditorStore = defineStore('editor', () => {
  const { apiAuth } = useAxios()

  const drawer = ref(true)
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
      const { data } = await apiAuth.get(`/dashboard/${id}`)
      dashboard.value = data.result
    } catch (err) {
      return Promise.reject(err)
    }
  }

  const clearDashboard = () => {
    dashboard.value = {}
  }

  const newChart = (chart) => {
    dashboard.value.charts.push(chart)
  }

  const deleteChart = (index) => {
    dashboard.value.charts.splice(index, 1)
  }

  const editChartTitle = (index, chartTitle) => {
    dashboard.value.charts[index].chartTitle = chartTitle
  }

  const createChartOption = (index, chartOption) => {
    dashboard.value.charts[index].chartOption = chartOption
  }

  const editChartOption = (index, type, key, value) => {
    dashboard.value.charts[index].chartOption[type][key] = value
  }

  const editChartSubOption = (index, type, key, subkey, value) => {
    dashboard.value.charts[index].chartOption[type][key][subkey] = value
  }
  const moveChart = (index, chartPosX, chartPosY) => {
    dashboard.value.charts[index].chartPosX = chartPosX
    dashboard.value.charts[index].chartPosY = chartPosY
  }

  const resizeChart = (index, chartWidth, chartHeight) => {
    dashboard.value.charts[index].chartWidth = chartWidth
    dashboard.value.charts[index].chartHeight = chartHeight
  }

  return {
    drawer,
    saveLoading,
    dashboard,
    dataVariables,
    filterRule,
    filterData,
    getDashboardWithAPI,
    clearDashboard,
    newChart,
    deleteChart,
    editChartTitle,
    createChartOption,
    editChartSubOption,
    editChartOption,
    moveChart,
    resizeChart,
  }
})
