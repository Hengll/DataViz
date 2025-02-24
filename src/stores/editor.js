// Utilities
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useAxios } from '@/composables/axios'

export const useEditorStore = defineStore('editor', () => {
  const { api, apiAuth } = useAxios()

  const drawer = ref(true)
  const saveLoading = ref(false)

  const dashboard = ref({})

  const dataChanged = ref(false)

  const dataVariables = computed(() => {
    if (dashboard.value.dataSet) {
      return Object.keys(dashboard.value.dataSet.data[0])
    } else {
      return []
    }
  })

  const filterRule = ref({
    categoryFilter: {},
    // categoryFilter: {
    //   useAtr: {
    //     nums: 1,
    //     filter: [],
    //   },
    // },
    rangeFilter: {},
  })

  const changeFilterRule = (filter, atr, operate, min, max) => {
    if (atr in filterRule.value[filter]) {
      filterRule.value[filter][atr].nums += operate

      if (filterRule.value[filter][atr].nums === 0) {
        delete filterRule.value[filter][atr]
      }
    } else {
      filterRule.value[filter][atr] = {
        nums: 1,
        filter: filter === 'categoryFilter' ? [] : [min, max],
      }
    }
  }

  const filterData = computed(() => {
    if (dashboard.value.dataSet) {
      return dashboard.value.dataSet.data.filter((item) => {
        for (const key in filterRule.value.categoryFilter) {
          if (!filterRule.value.categoryFilter[key].filter.includes(item[key])) {
            return false
          }
        }
        for (const key in filterRule.value.rangeFilter) {
          if (
            item[key] < Math.min(...filterRule.value.rangeFilter[key].filter) ||
            item[key] > Math.max(...filterRule.value.rangeFilter[key].filter)
          ) {
            return false
          }
        }
        return true
      })
    } else {
      return []
    }
  })

  const getDashboardWithPublicAPI = async (id) => {
    try {
      const { data } = await api.get(`/dashboard/public/${id}`)
      dashboard.value = data.result
    } catch (err) {
      return Promise.reject(err)
    }
  }

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

  const insertChartSubOption = (index, type, key) => {
    dashboard.value.charts[index].chartOption[type][key].push('#000000FF')
  }

  const removeChartSubOption = (index, type, key, subkey) => {
    if (dashboard.value.charts[index].chartOption[type][key].length > 1) {
      dashboard.value.charts[index].chartOption[type][key].splice(subkey, 1)
    }
  }

  const moveChart = (index, chartPosX, chartPosY) => {
    dashboard.value.charts[index].chartPosX = chartPosX
    dashboard.value.charts[index].chartPosY = chartPosY
  }

  const resizeChart = (index, chartWidth, chartHeight) => {
    dashboard.value.charts[index].chartWidth = chartWidth
    dashboard.value.charts[index].chartHeight = chartHeight
  }

  const editData = (index, col, value) => {
    dashboard.value.dataSet.data[index][col] = value
    dataChanged.value = true
  }

  const deleteRowData = (index) => {
    dashboard.value.dataSet.data.splice(index, 1)
    dataChanged.value = true
  }

  const insertRowData = () => {
    if (dashboard.value.dataSet?.data) {
      dashboard.value.dataSet.data.push({ ...dashboard.value.dataSet.data[0] })
      dataChanged.value = true
    }
  }

  const saveDataWithApi = async () => {
    if (dataChanged.value === false) return

    try {
      await apiAuth.patch(`/dataSet/${dashboard.value.dataSet._id}`, {
        data: dashboard.value.dataSet.data,
      })
      dataChanged.value = false
    } catch (err) {
      return Promise.reject(err)
    }
  }

  return {
    drawer,
    saveLoading,
    dashboard,
    dataChanged,
    dataVariables,
    filterRule,
    filterData,
    changeFilterRule,
    getDashboardWithPublicAPI,
    getDashboardWithAPI,
    clearDashboard,
    newChart,
    deleteChart,
    editChartTitle,
    createChartOption,
    editChartSubOption,
    editChartOption,
    insertChartSubOption,
    removeChartSubOption,
    moveChart,
    resizeChart,
    editData,
    deleteRowData,
    insertRowData,
    saveDataWithApi,
  }
})
