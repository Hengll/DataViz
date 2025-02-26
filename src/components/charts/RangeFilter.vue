<template>
  <div class="content" :style="style">
    <div :style="titleStyle" class="title">
      {{ editor.dashboard.charts[indexOfChart].chartTitle }}
    </div>
    <div class="body">
      <v-row>
        <v-col cols="12" class="d-flex">
          <v-col cols="3" @pointermove.stop>
            <v-text-field
              v-model="range[0]"
              :style="{
                color: editor.dashboard.charts[props.indexOfChart].chartOption.typography.color,
              }"
              :disabled="isNaN(min) || min === Infinity"
              label="min"
              density="compact"
              type="number"
              variant="outlined"
              hide-details
            ></v-text-field>
          </v-col>
          <v-col cols="6" @pointermove.stop>
            <v-range-slider
              v-model="range"
              class="flex-grow-1"
              :max="max"
              :min="min"
              hide-details
              :disabled="isNaN(min) || min === Infinity"
            >
            </v-range-slider>
          </v-col>
          <v-col cols="3" @pointermove.stop>
            <v-text-field
              v-model="range[1]"
              :style="{
                color: editor.dashboard.charts[props.indexOfChart].chartOption.typography.color,
              }"
              :disabled="isNaN(min) || min === Infinity"
              label="max"
              density="compact"
              type="number"
              variant="outlined"
              hide-details
            ></v-text-field>
          </v-col>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script setup>
import { computed, onUnmounted } from 'vue'
import { useEditorStore } from '@/stores/editor'

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

const editor = useEditorStore()

const variable = editor.dashboard.charts[props.indexOfChart].useVariables[0]

const data = computed(() => {
  const arr = []
  if (editor.dashboard.dataSet) {
    for (const item of editor.dashboard.dataSet.data) {
      if (!arr.includes(item[variable])) {
        arr.push(item[variable])
      }
    }
  }
  return arr
})

const min = Math.min(...data.value)
const max = Math.max(...data.value)

if (!isNaN(min) && min !== Infinity) {
  editor.changeFilterRule('rangeFilter', variable, 1, min, max)
}

const range = computed({
  get: () =>
    editor.filterRule.rangeFilter[variable] ? editor.filterRule.rangeFilter[variable].filter : [],
  set: (value) => {
    editor.filterRule.rangeFilter[variable].filter = value
  },
})

onUnmounted(() => {
  editor.changeFilterRule('rangeFilter', variable, -1)
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

if (!editor.dashboard.charts[props.indexOfChart].chartOption) {
  const chartOption = {
    typography: {
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
  flex-grow: 1;
}
</style>
