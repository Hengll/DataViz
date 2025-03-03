<template>
  <div class="content" :style="style">
    <div :style="titleStyle" class="title">
      {{ editor.dashboard.charts[indexOfChart].chartTitle }}
    </div>
    <div class="body" :style="bodyStyle">
      <p>{{ mean }}</p>
    </div>
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

const mean = computed(() => {
  const Variables0 = editor.filterData.map(
    (row) => row[editor.dashboard.charts[props.indexOfChart].useVariables[0]],
  )

  if (Variables0.length === 0 || isNaN(Variables0[0] * 1)) return NaN

  const sum = Variables0.reduce((accumulator, currentValue) => {
    return accumulator * 1 + currentValue * 1
  })

  const round = editor.dashboard.charts[props.indexOfChart].chartOption.typography.round

  return Math.round((sum / Variables0.length) * 10 ** round) / 10 ** round
})

const style = computed(() => {
  return {
    width: '100%',
    height: '100%',
    backgroundColor:
      editor.dashboard.charts[props.indexOfChart].chartOption.typography.backgroundColor,
    border:
      '1px solid ' + editor.dashboard.charts[props.indexOfChart].chartOption.typography.borderColor,
    paddingLeft:
      editor.dashboard.charts[props.indexOfChart].chartOption.typography.padding.left *
        props.gridWidth +
      'px',
    paddingRight:
      editor.dashboard.charts[props.indexOfChart].chartOption.typography.padding.right *
        props.gridWidth +
      'px',
    paddingTop:
      editor.dashboard.charts[props.indexOfChart].chartOption.typography.padding.top *
        props.gridWidth +
      'px',
    paddingBottom:
      editor.dashboard.charts[props.indexOfChart].chartOption.typography.padding.bottom *
        props.gridWidth +
      'px',
    flexDirection: ['left', 'right'].includes(
      editor.dashboard.charts[props.indexOfChart].chartOption.title.titlePosition,
    )
      ? 'row'
      : 'column',
  }
})

const titleStyle = computed(() => {
  return {
    height:
      editor.dashboard.charts[props.indexOfChart].chartOption.title.titleFontSize *
        props.gridWidth +
      +'px',
    display: editor.dashboard.charts[props.indexOfChart].chartOption.title.titleDisplay
      ? 'flex'
      : 'none',
    fontSize:
      editor.dashboard.charts[props.indexOfChart].chartOption.title.titleFontSize *
        props.gridWidth +
      'px',
    justifyContent: editor.dashboard.charts[props.indexOfChart].chartOption.title.titleAlign,
    color: editor.dashboard.charts[props.indexOfChart].chartOption.title.titleColor,
    fontWeight: editor.dashboard.charts[props.indexOfChart].chartOption.title.titleFontWeight,
    order: ['top', 'left'].includes(
      editor.dashboard.charts[props.indexOfChart].chartOption.title.titlePosition,
    )
      ? 0
      : 1,
    writingMode: ['left', 'right'].includes(
      editor.dashboard.charts[props.indexOfChart].chartOption.title.titlePosition,
    )
      ? `sideways-${editor.dashboard.charts[props.indexOfChart].chartOption.title.titlePosition === 'left' ? 'lr' : 'rl'}`
      : 'horizontal-tb',
  }
})

const bodyStyle = computed(() => {
  return {
    fontSize:
      editor.dashboard.charts[props.indexOfChart].chartOption.typography.fontSize *
        props.gridWidth +
      'px',
    color: editor.dashboard.charts[props.indexOfChart].chartOption.typography.color,
    textAlign: editor.dashboard.charts[props.indexOfChart].chartOption.typography.textAlign,
    justifyContent: editor.dashboard.charts[props.indexOfChart].chartOption.typography.textPosition,
  }
})

if (!editor.dashboard.charts[props.indexOfChart].chartOption) {
  const chartOption = {
    typography: {
      round: 2,
      fontSize: 1,
      textAlign: 'center',
      textPosition: 'center',
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
  }
  editor.createChartOption(props.indexOfChart, chartOption)
}
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
}

.title {
  user-select: none;
  flex-grow: 0;
  margin: 0.2rem;
}

.body {
  user-select: none;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}
</style>
