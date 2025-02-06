<template>
  <Bar id="my-chart-id" :style="style" :options="chartOptions" :data="chartData"></Bar>
</template>

<script setup>
import { computed } from 'vue'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'
import { useEditorStore } from '@/stores/editor'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const editor = useEditorStore()

const props = defineProps({
  indexOfChart: {
    type: Number,
    default: 0,
  },
})

// 選項
const fontSize = 12
const backgroundColor = '#FFFFFF'
const color = '#666666'
const barColor = 'lightblue'
const borderColor = 'rgba(0,0,0,0.12)'

const style = computed(() => {
  return {
    backgroundColor: backgroundColor,
    outline: '1px solid ' + borderColor,
  }
})

// type: Object,
// required: true,
// default: () => {
//   return {
//     labels: [],
//     datasets: [{
//       label: '圖例',
//       data: []
//     }]
//   }
// }
// },

const chartData = {
  labels: editor.dashboard.dataSet?.data.map(
    (row) => row[editor.dashboard.charts[props.indexOfChart].useVariables[0]],
  ),
  datasets: [
    {
      label: editor.dashboard.charts[props.indexOfChart].useVariables[1],
      data: editor.dashboard.dataSet?.data.map(
        (row) => row[editor.dashboard.charts[props.indexOfChart].useVariables[1]],
      ),
    },
  ],
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,

  layout: {
    padding: 10,
  },

  elements: {
    bar: {
      backgroundColor: barColor,
    },
  },

  scales: {
    x: {
      ticks: {
        font: {
          size: fontSize,
        },
        color: color,
      },
    },
    y: {
      ticks: {
        font: {
          size: fontSize,
        },
        color: color,
      },
    },
  },

  plugins: {
    legend: {
      labels: {
        font: {
          size: fontSize,
        },
        color: color,
      },
    },
    tooltip: {
      titleFont: {
        size: fontSize,
      },
      bodyFont: {
        size: fontSize,
      },
    },
    customCanvasBackgroundColor: {
      color: 'lightGreen',
    },
  },
}
</script>
