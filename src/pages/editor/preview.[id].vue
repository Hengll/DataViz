<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="d-flex">
        <p class="me-8">{{ editer.dashboard.dashboardName }}</p>
        <p>{{ $t('explore.author') }} : {{ user.userName }}</p>
      </v-col>
      <v-col cols="12" class="d-flex justify-end align-center">
        <span class="mx-1">{{ $t('explore.size') }} : </span>
        <v-btn class="mx-1" density="compact" icon="mdi-minus" @click="smallerArea"></v-btn>
        <v-btn class="mx-1" density="compact" icon="mdi-plus" @click="biggerArea"></v-btn>
      </v-col>
      <v-col cols="12">
        <div class="outer-area">
          <div id="area" ref="area" :style="{ backgroundColor: editer.dashboard.backgroundColor }">
            <DraggableResizable
              v-for="(chart, index) in editer.dashboard.charts"
              :key="chart"
              :container-width="areaWidth"
              :container-height="areaHeight"
              :index-of-chart="index"
              :grid-width="areaWidth / gridSizeDivisor.x"
              :grid-height="areaHeight / gridSizeDivisor.y"
              :read-only="true"
            ></DraggableResizable>
          </div>
        </div>
      </v-col>
      <v-col cols="12">
        <p>{{ $t('explore.details') }}</p>
      </v-col>
      <v-divider></v-divider>
      <v-col cols="12" class="d-flex">
        <div class="me-5">
          <v-icon class="me-2" icon="mdi-thumb-up-outline"></v-icon>
          <span>{{ editer.dashboard.like }}</span>
        </div>
        <div>
          <v-icon class="me-2" icon="mdi-eye-outline"></v-icon>
          <span>{{ editer.dashboard.view }}</span>
        </div>
      </v-col>
      <v-col cols="12">
        <v-row>
          <v-col cols="6">
            <p>{{ editer.dashboard.dashboardInfo || '...' }}</p>
          </v-col>
          <v-col cols="6">
            <p>{{ $t('explore.author') }} : {{ user.userName }}</p>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12">
        <p>
          {{ $t('explore.updatedAt') }} :
          {{ new Date(editer.dashboard.updatedAt).toLocaleString().split(' ')[0] }}
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import { useDashboardStore } from '@/stores/dashboard'
import DraggableResizable from '@/components/DraggableResizable.vue'

const user = useUserStore()
const editer = useDashboardStore()

// 畫布尺寸
const area = ref(null)
const areaWidth = ref(0)
const areaHeight = ref(0)
const observer = new ResizeObserver((mutations) => {
  for (const mutation of mutations) {
    areaWidth.value = mutation.contentBoxSize[0].inlineSize
    areaHeight.value = mutation.contentBoxSize[0].blockSize
  }
})

const biggerArea = () => {
  const width = area.value.offsetWidth + 200
  if (width > 2560) return
  area.value.style.width = width + 'px'
}

const smallerArea = () => {
  const width = area.value.offsetWidth - 200
  if (width < 200) return
  area.value.style.width = width + 'px'
}

onMounted(() => {
  observer.observe(area.value, {
    box: 'content-box',
  })
})

// 網格數
const gridSizeDivisor = {
  x: 96,
  y: 54,
}
</script>

<style lang="scss" scoped>
#area {
  width: 100%;
  aspect-ratio: 16 / 9;
  outline: 1px solid rgba(0, 0, 0, 0.12);
  background: white;
}

.outer-area {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: auto;
}
</style>

<route lang="json">
{
  "meta": {
    "layout": "editor",
    "login": true,
    "title": "editor.previewDashboard"
  }
}
</route>
