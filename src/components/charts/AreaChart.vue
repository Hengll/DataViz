<template>
  <div v-if="progress" class="cover">
    <v-progress-circular class="progress-circular" indeterminate></v-progress-circular>
  </div>
  <Line id="my-chart-id" :style="style" :options="chartOptions" :data="chartData"></Line>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Filler,
} from 'chart.js'
import { useEditorStore } from '@/stores/editor'
import { usePublicStore } from '@/stores/public'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Filler,
)

const props = defineProps({
  indexOfChart: {
    type: Number,
    default: 0,
  },
  gridWidth: {
    type: Number,
    default: 0,
  },
  readOnly: {
    type: Boolean,
    default: false,
  },
})

let editor
if (props.readOnly) {
  editor = usePublicStore()
} else {
  editor = useEditorStore()
}

const progress = ref(true)
editor.saveLoading = true

const data = computed(() => {
  const Variables0 = editor.filterData.map(
    (row) => row[editor.dashboard.charts[props.indexOfChart].useVariables[0]],
  )
  const Variables1 = editor.filterData.map(
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

const chartData = computed(() => {
  return {
    labels: Object.keys(data.value),
    datasets: [
      {
        label: editor.dashboard.charts[props.indexOfChart].useVariables[1],
        data: Object.values(data.value),
      },
    ],
  }
})

if (!editor.dashboard.charts[props.indexOfChart].chartOption) {
  const chartOption = {
    typography: {
      fontSize: 1,
      color: '#666666FF',
      backgroundColor: '#FFFFFFFF',
      borderColor: '#00000012',
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
    },
    title: {
      titleDisplay: true,
      titleFontSize: 1,
      titlePosition: 'top',
      titleAlign: 'center',
      titleColor: '#666666FF',
      titleFontWeight: 700,
    },
    areaChart: {
      indexAxis: 'x',
      lineWidth: 0.2,
      lineColor: '#00000012',
      pointRadius: 0.3,
      areaColor: '#90D5FFFF',
    },

    label: {
      labelDisplay: true,
      scalesXDisplay: true,
      scalesYDisplay: false,
      labelPosition: 'top',
      labelAlign: 'center',
      labelBoxWidth: 2,
      labelBoxHeight: 1,
      labelMaxHeight: 0,
      labelMaxWidth: 0,
      labelColor: '#666666FF',
    },
  }
  editor.createChartOption(props.indexOfChart, chartOption)
}

const style = computed(() => {
  return {
    backgroundColor:
      editor.dashboard.charts[props.indexOfChart].chartOption.typography.backgroundColor,
    outline:
      '1px solid ' + editor.dashboard.charts[props.indexOfChart].chartOption.typography.borderColor,
  }
})

const chartOptions = computed(() => {
  return {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1000,
      onComplete: function () {
        progress.value = false
        editor.saveLoading = false
      },
    },
    devicePixelRatio: 2,

    indexAxis: editor.dashboard.charts[props.indexOfChart].chartOption.areaChart.indexAxis,
    layout: {
      padding: {
        left:
          editor.dashboard.charts[props.indexOfChart].chartOption.typography.padding.left *
          props.gridWidth,
        right:
          editor.dashboard.charts[props.indexOfChart].chartOption.typography.padding.right *
          props.gridWidth,
        top:
          editor.dashboard.charts[props.indexOfChart].chartOption.typography.padding.top *
          props.gridWidth,
        bottom:
          editor.dashboard.charts[props.indexOfChart].chartOption.typography.padding.bottom *
          props.gridWidth,
      },
    },

    elements: {
      line: {
        backgroundColor:
          editor.dashboard.charts[props.indexOfChart].chartOption.areaChart.areaColor,
        borderWidth:
          editor.dashboard.charts[props.indexOfChart].chartOption.areaChart.lineWidth *
          props.gridWidth,
        borderColor: editor.dashboard.charts[props.indexOfChart].chartOption.areaChart.lineColor,
        fill: true,
      },
      point: {
        backgroundColor:
          editor.dashboard.charts[props.indexOfChart].chartOption.areaChart.areaColor,
        radius:
          editor.dashboard.charts[props.indexOfChart].chartOption.areaChart.pointRadius *
          props.gridWidth,
      },
    },

    scales: {
      x: {
        title: {
          display: editor.dashboard.charts[props.indexOfChart].chartOption.label.scalesXDisplay,
          text:
            editor.dashboard.charts[props.indexOfChart].chartOption.areaChart.indexAxis === 'x'
              ? editor.dashboard.charts[props.indexOfChart].useVariables[0]
              : editor.dashboard.charts[props.indexOfChart].useVariables[1],
          color: editor.dashboard.charts[props.indexOfChart].chartOption.typography.color,
        },
        ticks: {
          font: {
            size:
              editor.dashboard.charts[props.indexOfChart].chartOption.typography.fontSize *
              props.gridWidth,
          },
          color: editor.dashboard.charts[props.indexOfChart].chartOption.typography.color,
        },
      },
      y: {
        title: {
          display: editor.dashboard.charts[props.indexOfChart].chartOption.label.scalesYDisplay,
          text:
            editor.dashboard.charts[props.indexOfChart].chartOption.areaChart.indexAxis === 'x'
              ? editor.dashboard.charts[props.indexOfChart].useVariables[1]
              : editor.dashboard.charts[props.indexOfChart].useVariables[0],
          color: editor.dashboard.charts[props.indexOfChart].chartOption.typography.color,
        },
        ticks: {
          font: {
            size:
              editor.dashboard.charts[props.indexOfChart].chartOption.typography.fontSize *
              props.gridWidth,
          },
          color: editor.dashboard.charts[props.indexOfChart].chartOption.typography.color,
        },
      },
    },

    plugins: {
      legend: {
        display: editor.dashboard.charts[props.indexOfChart].chartOption.label.labelDisplay,
        position: editor.dashboard.charts[props.indexOfChart].chartOption.label.labelPosition,
        align: editor.dashboard.charts[props.indexOfChart].chartOption.label.labelAlign,
        maxHeight:
          editor.dashboard.charts[props.indexOfChart].chartOption.label.labelMaxHeight *
          props.gridWidth,
        maxWidth:
          editor.dashboard.charts[props.indexOfChart].chartOption.label.labelMaxWidth *
          props.gridWidth,
        labels: {
          boxWidth:
            editor.dashboard.charts[props.indexOfChart].chartOption.label.labelBoxWidth *
            props.gridWidth,
          boxHeight:
            editor.dashboard.charts[props.indexOfChart].chartOption.label.labelBoxHeight *
            props.gridWidth,
          font: {
            size:
              editor.dashboard.charts[props.indexOfChart].chartOption.typography.fontSize *
              props.gridWidth,
          },
          color: editor.dashboard.charts[props.indexOfChart].chartOption.label.labelColor,
        },
      },
      title: {
        display: editor.dashboard.charts[props.indexOfChart].chartOption.title.titleDisplay,
        align: editor.dashboard.charts[props.indexOfChart].chartOption.title.titleAlign,
        color: editor.dashboard.charts[props.indexOfChart].chartOption.title.titleColor,
        position: editor.dashboard.charts[props.indexOfChart].chartOption.title.titlePosition,
        font: {
          weight: editor.dashboard.charts[props.indexOfChart].chartOption.title.titleFontWeight,
          size:
            editor.dashboard.charts[props.indexOfChart].chartOption.title.titleFontSize *
            props.gridWidth,
        },
        text: editor.dashboard.charts[props.indexOfChart].chartTitle,
        padding: props.gridWidth,
      },
      tooltip: {
        titleFont: {
          size:
            editor.dashboard.charts[props.indexOfChart].chartOption.typography.fontSize *
            props.gridWidth,
        },
        bodyFont: {
          size:
            editor.dashboard.charts[props.indexOfChart].chartOption.typography.fontSize *
            props.gridWidth,
        },
      },
    },
  }
})
</script>

<style lang="scss" scoped>
.cover {
  position: absolute;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(2px);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
