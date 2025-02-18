<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="d-flex">
        <p class="me-8">{{ dashboard.dashboard.dashboardName }}</p>
        <p>{{ $t('explore.author') }} : {{ dashboard.dashboard.user?.userName }}</p>
      </v-col>
      <v-col cols="12">
        <div id="area" ref="area">
          <DraggableResizable
            v-for="(chart, index) in dashboard.dashboard.charts"
            :key="chart"
            :container-width="areaWidth"
            :container-height="areaHeight"
            :index-of-chart="index"
            :grid-width="areaWidth / gridSizeDivisor.x"
            :grid-height="areaHeight / gridSizeDivisor.y"
            :read-only="true"
          ></DraggableResizable>
        </div>
      </v-col>
      <v-col cols="12">
        <p>{{ $t('explore.details') }}</p>
      </v-col>
      <v-divider></v-divider>
      <v-col cols="12" class="d-flex">
        <div class="me-5" :style="gooded">
          <v-icon class="me-2" icon="mdi-thumb-up-outline" @click="good()"></v-icon>
          <span>{{ dashboard.dashboard.like }}</span>
        </div>
        <div>
          <v-icon class="me-2" icon="mdi-eye-outline"></v-icon>
          <span>{{ dashboard.dashboard.view }}</span>
        </div>
      </v-col>
      <v-col cols="12">
        <v-row>
          <v-col cols="6">
            <p>{{ dashboard.dashboard.dashboardInfo || '...' }}</p>
          </v-col>
          <v-col cols="6">
            <p>{{ $t('explore.author') }} : {{ dashboard.dashboard.user?.userName }}</p>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12">
        <p>
          {{ $t('explore.updatedAt') }} :
          {{ new Date(dashboard.dashboard.updatedAt).toLocaleString().split(' ')[0] }}
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAxios } from '@/composables/axios'
import { useRoute, useRouter } from 'vue-router'
import { useTheme } from 'vuetify'
import { useUserStore } from '@/stores/user'
import { usePublicStore } from '@/stores/public'
import DraggableResizable from '@/components/DraggableResizable.vue'

const { apiAuth } = useAxios()
const route = useRoute()
const router = useRouter()
const theme = useTheme()
const user = useUserStore()
const dashboard = usePublicStore()

const getDashboard = async () => {
  try {
    await dashboard.getDashboardWithAPI(route.params.id)
    document.title = dashboard.dashboard.dashboardName + ' | DataViz'
  } catch (err) {
    console.log(err)
    router.push('/')
  }
}
getDashboard()

const gooded = computed(() => {
  if (dashboard.dashboard.likeUsers) {
    return {
      color: dashboard.dashboard.likeUsers.includes(user.id)
        ? theme.global.current.value.colors.primary
        : theme.global.current.value.colors.onSurface,
    }
  }
  return {}
})

const good = async () => {
  try {
    if (dashboard.dashboard.likeUsers) {
      await apiAuth.patch(`/dashboard/like/${route.params.id}`)
      if (!dashboard.dashboard.likeUsers.includes(user.id)) {
        dashboard.dashboard.likeUsers.push(user.id)
        dashboard.dashboard.like++
      } else {
        const idx = dashboard.dashboard.likeUsers.indexOf(user.id)
        dashboard.dashboard.likeUsers.splice(idx, 1)
        dashboard.dashboard.like--
      }
    }
  } catch (err) {
    console.log(err)
  }
}

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
</style>

<route lang="json">
{
  "meta": {
    "login": false,
    "admin": false,
    "title": "nav.explore"
  }
}
</route>
