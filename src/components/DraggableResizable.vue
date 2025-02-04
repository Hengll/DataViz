<template>
  <div
    ref="element"
    class="draggable-resizable"
    :style="{
      width: elementInfo.chartWidth * containerWidth + 'px',
      height: elementInfo.chartHeight * containerHeight + 'px',
      transform:
        'translate(' +
        elementInfo.chartPosX * containerWidth +
        'px, ' +
        elementInfo.chartPosY * containerHeight +
        'px)',
    }"
    :data-x="elementInfo.chartPosX * containerWidth"
    :data-y="elementInfo.chartPosY * containerHeight"
  >
    <slot></slot>
    <p>w : {{ elementInfo.chartWidth * containerWidth }}</p>
    <p>h : {{ elementInfo.chartHeight * containerHeight }}</p>
    <p>x : {{ elementInfo.chartPosX }}</p>
    <p>y : {{ elementInfo.chartPosY }}</p>
    <p>{{ containerWidth }}</p>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import interact from 'interactjs'

const props = defineProps({
  containerWidth: {
    type: Number,
    default: 0,
  },
  containerHeight: {
    type: Number,
    default: 0,
  },
  indexOfCharts: {
    type: Number,
    default: 0,
  },
})

const element = ref(null)

const gridSizeDivisor = {
  x: 2,
  y: 2,
}

const elementInfo = ref({
  category: 'barChart',
  chartWidth: 0.5,
  chartHeight: 0.5,
  chartPosX: 0,
  chartPosY: 0,
})

onMounted(() => {
  const interactInstance = interact(element.value)
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

          elementInfo.value.chartPosX = x / props.containerWidth
          elementInfo.value.chartPosY = y / props.containerHeight
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
      ],
      listeners: {
        move(event) {
          let x = (parseFloat(event.target.getAttribute('data-x')) || 0) + event.deltaRect.left
          let y = (parseFloat(event.target.getAttribute('data-y')) || 0) + event.deltaRect.top

          event.target.setAttribute('data-x', x)
          event.target.setAttribute('data-y', y)

          elementInfo.value.chartWidth = event.rect.width / props.containerWidth
          elementInfo.value.chartHeight = event.rect.height / props.containerHeight
          elementInfo.value.chartPosX = x / props.containerWidth
          elementInfo.value.chartPosY = y / props.containerHeight
        },
      },
    })
  console.log(1)
  console.log(interactInstance)
})
</script>

<style lang="scss" scoped>
.draggable-resizable {
  background-color: lightgreen;
  text-align: center;
  position: absolute;
  user-select: none;
}
</style>
