// Utilities
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useAxios } from '@/composables/axios'

export const useEditorStore = defineStore('editor', () => {
  const { apiAuth } = useAxios()

  const drawer = ref(true)

  const dashboard = ref({})

  const dataVariables = computed(() => {
    if (dashboard.value.dataSet) {
      return Object.keys(dashboard.value.dataSet.data[0])
    } else {
      return []
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

  const newChart = (chart) => {
    dashboard.value.charts.push(chart)
  }

  const deleteChart = (index) => {
    dashboard.value.charts.splice(index, 1)
  }

  const editChart = (index, chart) => {
    dashboard.value.charts.splice(index, 1, chart)
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
    dashboard,
    dataVariables,
    getDashboardWithAPI,
    newChart,
    deleteChart,
    editChart,
    moveChart,
    resizeChart,
  }
})
