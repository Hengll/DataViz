<template>
  <div class="content">
    <v-stage class="body" :config="configKonva">
      <v-layer>
        <v-line :config="configLine"></v-line>
      </v-layer>
    </v-stage>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useDashboardStore } from '@/stores/dashboard'

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

const editor = useDashboardStore()

const configKonva = computed(() => {
  return {
    width: editor.dashboard.charts[props.indexOfChart].chartWidth * props.gridWidth,
    height: editor.dashboard.charts[props.indexOfChart].chartHeight * props.gridWidth,
  }
})
const configLine = computed(() => {
  const chartWidth = editor.dashboard.charts[props.indexOfChart].chartWidth * props.gridWidth
  const chartHeight = editor.dashboard.charts[props.indexOfChart].chartHeight * props.gridWidth

  return {
    points: [
      chartWidth * 0.5,
      chartHeight * 0 + 1,
      chartWidth * 1 - 1,
      chartHeight * 1 - 1,
      chartWidth * 0 + 1,
      chartHeight * 1 - 1,
    ],
    fill: editor.dashboard.charts[props.indexOfChart].chartOption.typography.backgroundColor,
    stroke: editor.dashboard.charts[props.indexOfChart].chartOption.typography.borderColor,
    strokeWidth: 1,
    closed: true,
  }
})

if (!editor.dashboard.charts[props.indexOfChart].chartOption) {
  const chartOption = {
    typography: {
      backgroundColor: '#FFFFFFFF',
      borderColor: '#00000012',
    },
  }
  editor.createChartOption(props.indexOfChart, chartOption)
}
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  height: 100%;
  display: flex;
}
</style>
