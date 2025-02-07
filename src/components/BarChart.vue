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
  gridWidth: {
    type: Number,
    default: 0,
  },
})

// 選項
const fontSize = 1
const backgroundColor = '#FFFFFF'
const color = '#666666'
const barColor = ['lightblue']
const borderColor = 'rgba(0,0,0,0.12)'
const paddingLeft = 0
const paddingRight = 0
const paddingTop = 0
const paddingBottom = 0

const style = computed(() => {
  return {
    backgroundColor: backgroundColor,
    outline: '1px solid ' + borderColor,
  }
})

const data = computed(() => {
  const Variables0 = editor.dashboard.dataSet?.data.map(
    (row) => row[editor.dashboard.charts[props.indexOfChart].useVariables[0]],
  )
  const Variables1 = editor.dashboard.dataSet?.data.map(
    (row) => row[editor.dashboard.charts[props.indexOfChart].useVariables[1]],
  )
  const data = {}

  for (let i = 0; i < Variables0.length; i++) {
    if (!data[Variables0[i]]) {
      data[Variables0[i]] = Variables1[i] * 1
    } else {
      data[Variables0[i]] += Variables1[i] * 1
    }
  }

  return data
})

const chartData = {
  labels: Object.keys(data.value),
  datasets: [
    {
      label: editor.dashboard.charts[props.indexOfChart].useVariables[1],
      data: Object.values(data.value),
    },
  ],
}
const chartOptions = computed(() => {
  return {
    responsive: true,
    maintainAspectRatio: false,
    animation: true,

    layout: {
      padding: {
        left: paddingLeft * props.gridWidth,
        right: paddingRight * props.gridWidth,
        top: paddingTop * props.gridWidth,
        bottom: paddingBottom * props.gridWidth,
      },
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
            size: fontSize * props.gridWidth,
          },
          color: color,
        },
      },
      y: {
        ticks: {
          font: {
            size: fontSize * props.gridWidth,
          },
          color: color,
        },
      },
    },

    plugins: {
      legend: {
        labels: {
          font: {
            size: fontSize * props.gridWidth,
          },
          color: color,
        },
      },
      title: {
        display: true,
        text: editor.dashboard.charts[props.indexOfChart].chartTitle,
      },
      tooltip: {
        titleFont: {
          size: fontSize * props.gridWidth,
        },
        bodyFont: {
          size: fontSize * props.gridWidth,
        },
      },
    },
  }
})
</script>
