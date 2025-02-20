<template>
  <div class="content">
    <canvas ref="canvas" class="body"></canvas>
    <p>{{ width }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useEditorStore } from '@/stores/editor'
import { usePublicStore } from '@/stores/public'

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

const canvas = ref(null)
const width = ref(null)
const height = ref(null)

onMounted(() => {
  const ctx = canvas.value.getContext('2d')
  console.log(ctx)

  width.value = canvas.value.width
  height.value = canvas.value.height

  ctx.fillStyle = editor.dashboard.charts[props.indexOfChart].chartOption.typography.backgroundColor
  ctx.strokeStyle =
    '1px solid ' + editor.dashboard.charts[props.indexOfChart].chartOption.typography.borderColor // 設定邊框顏色
  ctx.lineWidth = 1

  ctx.beginPath()
  ctx.moveTo(width.value * 0.5, 0)
  ctx.lineTo(width.value * 1, height.value * 1)
  ctx.lineTo(0, height.value * 1)
  ctx.closePath()

  ctx.fill()
  ctx.stroke()
})

// const area = ref(null)
// const areaWidth = ref(0)
// const areaHeight = ref(0)
// const observer = new ResizeObserver((mutations) => {
//   for (const mutation of mutations) {
//     areaWidth.value = mutation.contentBoxSize[0].inlineSize
//     areaHeight.value = mutation.contentBoxSize[0].blockSize
//   }
// })

// onMounted(() => {
//   observer.observe(area.value, {
//     box: 'content-box',
//   })
// })

// const bodyStyle = computed(() => {
//   return {
//     backgroundColor:
//       editor.dashboard.charts[props.indexOfChart].chartOption.typography.backgroundColor,
//     border:
//       '1px solid ' + editor.dashboard.charts[props.indexOfChart].chartOption.typography.borderColor,
//   }
// })

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
  width: 100%;
  height: 100%;
}
</style>
