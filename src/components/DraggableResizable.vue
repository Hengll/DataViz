<template>
  <v-hover v-slot="{ isHovering, props: prop }">
    <div
      v-bind="prop"
      ref="element"
      :class="{ 'draggable-resizable': true, 'hover-style': isHovering }"
      :style="{
        width: editor.dashboard.charts[indexOfChart].chartWidth * containerWidth + 'px',
        height: editor.dashboard.charts[indexOfChart].chartHeight * containerHeight + 'px',
        transform:
          'translate(' +
          editor.dashboard.charts[indexOfChart].chartPosX * containerWidth +
          'px, ' +
          editor.dashboard.charts[indexOfChart].chartPosY * containerHeight +
          'px)',
      }"
      :data-x="editor.dashboard.charts[indexOfChart].chartPosX * containerWidth"
      :data-y="editor.dashboard.charts[indexOfChart].chartPosY * containerHeight"
    >
      <component :is="chartCategory" :index-of-chart="indexOfChart"></component>

      <div v-if="isHovering" class="position-absolute top-0 right-0">
        <v-btn
          class="border radius-10 me-1 mt-1 btn-size pb-1"
          variant="text"
          icon="mdi-pencil"
          @click="$emit('edit')"
        ></v-btn>
        <v-btn
          class="border radius-10 me-1 mt-1 btn-size"
          variant="text"
          icon="mdi-close"
          @click="$emit('delete')"
        ></v-btn>
      </div>
    </div>
  </v-hover>
</template>

<script setup>
import { ref, watch, onMounted, markRaw } from 'vue'
import interact from 'interactjs'
import { useEditorStore } from '@/stores/editor'
import BarChart from './BarChart.vue'

const editor = useEditorStore()

const props = defineProps({
  containerWidth: {
    type: Number,
    default: 0,
  },
  containerHeight: {
    type: Number,
    default: 0,
  },
  indexOfChart: {
    type: Number,
    default: 0,
  },
})

defineEmits(['edit', 'delete'])

const chartCategory = ref(null)
if (editor.dashboard.charts[props.indexOfChart].category === 'barChart') {
  chartCategory.value = markRaw(BarChart)
} else {
  console.log('err')
}

const element = ref(null)
let interactable = null

const gridSizeDivisor = {
  x: 96,
  y: 54,
}

const setupInteract = () => {
  if (interactable) {
    interactable.draggable(false)
    interactable.resizable(false)
  }

  interactable = interact(element.value)
    .draggable({
      modifiers: [
        interact.modifiers.snap({
          targets: [
            interact.snappers.grid({
              x: props.containerWidth / gridSizeDivisor.x,
              y: props.containerHeight / gridSizeDivisor.y,
            }),
          ],
          range: Infinity,
          relativePoints: [{ x: 0, y: 0 }],
          offset: 'parent',
        }),
        interact.modifiers.restrict({
          restriction: element.value.parentNode,
          elementRect: { top: 0, left: 0, bottom: 1, right: 1 },
        }),
      ],
      listeners: {
        move(event) {
          const target = event.target
          const x = parseFloat(target.getAttribute('data-x')) + event.dx
          const y = parseFloat(target.getAttribute('data-y')) + event.dy

          target.setAttribute('data-x', x)
          target.setAttribute('data-y', y)

          editor.moveChart(props.indexOfChart, x / props.containerWidth, y / props.containerHeight)
        },
      },
    })
    .resizable({
      edges: { left: true, right: true, bottom: true, top: true },
      modifiers: [
        interact.modifiers.snapSize({
          targets: [
            interact.snappers.grid({
              width: props.containerWidth / gridSizeDivisor.x,
              height: props.containerHeight / gridSizeDivisor.y,
            }),
          ],
          range: Infinity,
          relativePoints: [{ x: 0, y: 0 }],
        }),
        interact.modifiers.restrictEdges({
          outer: 'parent',
        }),
        interact.modifiers.restrictSize({
          min: {
            width: (5 * props.containerWidth) / gridSizeDivisor.x,
            height: (5 * props.containerHeight) / gridSizeDivisor.y,
          },
        }),
      ],
      listeners: {
        move(event) {
          let x = (parseFloat(event.target.getAttribute('data-x')) || 0) + event.deltaRect.left
          let y = (parseFloat(event.target.getAttribute('data-y')) || 0) + event.deltaRect.top

          event.target.setAttribute('data-x', x)
          event.target.setAttribute('data-y', y)

          editor.resizeChart(
            props.indexOfChart,
            event.rect.width / props.containerWidth,
            event.rect.height / props.containerHeight,
          )

          editor.moveChart(props.indexOfChart, x / props.containerWidth, y / props.containerHeight)
        },
      },
    })
}

onMounted(setupInteract)

watch([() => props.containerWidth, () => props.containerHeight], () => {
  setupInteract()
})
</script>

<style lang="scss" scoped>
.draggable-resizable {
  position: absolute;
}

.hover-style {
  outline: 1px solid rgba(0, 0, 0, 1);
  z-index: 100;
}

.radius-10 {
  border-radius: 10%;
}

.btn-size {
  width: 30px;
  height: 30px;
  font-size: 18px;
}
</style>
