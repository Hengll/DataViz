<template>
  <div class="content">
    <div class="body" :style="bodyStyle"></div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
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

const bodyStyle = computed(() => {
  return {
    backgroundColor:
      editor.dashboard.charts[props.indexOfChart].chartOption.typography.backgroundColor,
    border:
      '1px solid ' + editor.dashboard.charts[props.indexOfChart].chartOption.typography.borderColor,
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

.body {
  user-select: none;
  flex-grow: 1;
}
</style>
