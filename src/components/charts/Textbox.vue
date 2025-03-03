<template>
  <div class="content" :style="style">
    <div class="body" :style="bodyStyle">
      <p class="text">
        {{ editor.dashboard.charts[indexOfChart].chartOption.typography.innerText }}
      </p>
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

const style = computed(() => {
  return {
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
    alignItems: editor.dashboard.charts[props.indexOfChart].chartOption.typography.textPosition,
  }
})

if (!editor.dashboard.charts[props.indexOfChart].chartOption) {
  const chartOption = {
    typography: {
      fontSize: 2,
      innerText: 'text',
      textAlign: 'start',
      textPosition: 'start',
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

.body {
  user-select: none;
  flex-grow: 1;
  overflow-x: hidden;
  overflow-y: auto;
  display: flex;
}

.text {
  width: 100%;
  overflow-wrap: break-word;
}

::v-deep(.body) {
  --sb-thumb-color: #d2d2d2;
  --sb-size: 5px;

  &::-webkit-scrollbar {
    width: var(--sb-size);
  }

  &::-webkit-scrollbar-track {
    border-radius: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--sb-thumb-color);
    border-radius: 5px;
  }
}
</style>
