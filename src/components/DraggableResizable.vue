<template>
  <v-hover v-slot="{ isHovering, props: prop }">
    <div
      v-bind="prop"
      ref="element"
      :class="{ 'draggable-resizable': true, 'hover-style': isHovering }"
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
      <div>{{ indexOfCharts }}</div>
      <div v-if="isHovering" class="position-absolute top-0 right-0">
        <v-btn
          class="border opacity-60 radius-10 me-1 mt-1 btn-size pb-1"
          variant="text"
          icon="mdi-pencil"
          @click="$emit('edit')"
        ></v-btn>
        <v-btn
          class="border opacity-60 radius-10 me-1 mt-1 btn-size"
          variant="text"
          icon="mdi-close"
          @click="$emit('delete')"
        ></v-btn>
      </div>
    </div>
  </v-hover>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
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

defineEmits(['edit', 'delete'])

const element = ref(null)
let interactable = null

const gridSizeDivisor = {
  x: 32,
  y: 18,
}

const elementInfo = ref({
  category: 'barChart',
  chartWidth: 0.5,
  chartHeight: 0.5,
  chartPosX: 0,
  chartPosY: 0,
})

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
        interact.modifiers.restrictSize({
          min: {
            width: props.containerWidth / gridSizeDivisor.x,
            height: props.containerHeight / gridSizeDivisor.y,
          },
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
}

onMounted(setupInteract)

watch([() => props.containerWidth, () => props.containerHeight], () => {
  setupInteract()
})
</script>

<style lang="scss" scoped>
.draggable-resizable {
  background-color: lightgreen;
  text-align: center;
  position: absolute;
  user-select: none;
}

.hover-style {
  outline: 1px solid rgba(0, 0, 0, 0.5);
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
