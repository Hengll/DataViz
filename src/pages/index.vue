<template>
  <div class="hero-section">
    <v-container class="h-100">
      <v-row class="flex-column flex-nowrap h-100">
        <v-col class="flex-0-1 d-flex flex-column flex-sm-row">
          <div class="w-100 w-sm-75">
            <h1 class="mainHeadline text-h3 text-md-h2 text-lg-h1 font-weight-bold">
              {{ $t('home.mainHeadline') }}
            </h1>
            <h1 class="mainHeadline text-h3 text-md-h2 text-lg-h1 font-weight-bold mb-3">
              {{ $t('home.mainHeadline2') }}
            </h1>
            <h3 class="Subheadline text-h6 font-weight-bold">{{ $t('home.Subheadline') }}</h3>
          </div>
          <div class="w-100 w-sm-50 d-flex flex-column justify-center align-center align-sm-end">
            <v-btn
              class="btn-getStarted mt-10 mt-sm-0"
              color="primary"
              variant="flat"
              @click="$router.push('/auth')"
              >{{ $t('home.getStarted') }}</v-btn
            >
          </div>
        </v-col>
        <v-col class="position-relative pt-16">
          <div class="vedio1">
            <video class="w-100 border rounded" muted :src="demo2" autoplay loop></video>
          </div>
          <div class="vedio2">
            <video class="w-100 rounded border" muted :src="demo" autoplay loop></video>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
  <div
    class="introduction"
    :style="{
      paddingTop: name === 'xs' || name === 'sm' ? '5rem' : '25rem',
      height: name === 'xs' || name === 'sm' ? 'auto' : '400vh',
    }"
  >
    <v-container class="h-100">
      <v-row class="flex-column flex-nowrap h-100">
        <v-col cols="12" class="flex-0-1">
          <h3 class="text-h5 text-sm-h3 font-weight-bold">{{ $t('home.introductionTitle') }}</h3>
        </v-col>
        <v-col cols="12" class="flex-1-1 d-flex flex-column position-relative">
          <v-divider
            vertical
            class="vertical-line border-opacity-25"
            :style="{ left: name === 'xs' || name === 'sm' ? 'calc(28px + 2%)' : '50%' }"
          ></v-divider>
          <v-col
            v-for="(introduction, index) in introductions"
            :key="introduction"
            cols="12"
            class="flex-1-0-0 d-flex flex-column flex-md-row align-center mb-16 mb-md-auto"
          >
            <v-col
              class="flex-1-1 h-md-50 w-md-50 pa-md-16"
              :class="{
                'order-1': index % 2 === 1 || name === 'sm' || name === 'xs' ? true : false,
              }"
              :style="{ width: name === 'xs' || name === 'sm' ? '95%' : 'auto' }"
            >
              <v-icon
                class="border rounded pa-8 text-h3 border-primary border-opacity-100"
                color="primary"
                :icon="introduction.icon"
              ></v-icon>
              <h1 class="my-5 text-sm-h3 font-weight-bold">{{ introduction.title }}</h1>
              <p>{{ introduction.text }}</p>
            </v-col>
            <v-col
              class="overflow-hidden pa-0 flex-0-1 w-md-50 d-flex justify-center align-start order-md-0 position-relative"
            >
              <div class="media border rounded border-opacity-25">
                <v-img :src="introduction.media" eager class="rounded"></v-img>
              </div>
            </v-col>
          </v-col>
        </v-col>
      </v-row>
    </v-container>
  </div>
  <div class="highlights">
    <v-container fluid class="h-100">
      <v-row class="flex-column flex-nowrap h-100">
        <v-col cols="12" class="flex-0-0">
          <h3 class="text-h5 text-sm-h4 font-weight-bold text-center">
            {{ $t('home.highlightsTitle') }}
          </h3>
        </v-col>
        <v-col cols="12" class="flex-1-0 d-flex justify-center align-center">
          <swiper
            v-if="dashboards.length > 0"
            :slides-per-view="name === 'xs' ? 1 : 2"
            :loop="true"
            :space-between="30"
            :centered-slides="true"
            :autoplay="{
              delay: 5000,
              disableOnInteraction: false,
            }"
            :pagination="{
              clickable: true,
            }"
            :navigation="true"
            :modules="[Autoplay, Pagination, Navigation]"
          >
            <swiper-slide v-for="dashboard in dashboards" :key="dashboard">
              <v-col cols="12">
                <h4 class="cursor-pointer" @click="$router.push(`/dashboard/${dashboard._id}`)">
                  {{ dashboard.dashboardName }}
                </h4>
                <v-img
                  class="border ma-1 cursor-pointer rounded"
                  :lazy-src="whiteImg"
                  :src="dashboard.image"
                  @click="$router.push(`/dashboard/${dashboard._id}`)"
                >
                  <template #placeholder>
                    <div class="d-flex align-center justify-center fill-height">
                      <v-progress-circular indeterminate></v-progress-circular>
                    </div>
                  </template>
                </v-img>
              </v-col>
            </swiper-slide>
          </swiper>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import { useAxios } from '@/composables/axios'
import { useDisplay } from 'vuetify'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useUserStore } from '@/stores/user'

const { t } = useI18n()
const { api } = useAxios()
const { name } = useDisplay()
const user = useUserStore()

const demo = new URL('@/assets/demo.webm', import.meta.url).href
const demo2 = new URL('@/assets/demo2.mp4', import.meta.url).href
const whiteImg = new URL('@/assets/white.png', import.meta.url).href

const introductions = computed(() => {
  return [
    {
      icon: 'mdi-database',
      title: t('home.introductionData'),
      text: t('home.introductionDataText'),
      media:
        user.theme === 'lightTheme'
          ? new URL('@/assets/introductionData.png', import.meta.url).href
          : new URL('@/assets/introductionData_dark.png', import.meta.url).href,
    },
    {
      icon: 'mdi-transit-connection-horizontal',
      title: t('home.introductionLinkData'),
      text: t('home.introductionLinkDataText'),
      media:
        user.theme === 'lightTheme'
          ? new URL('@/assets/introductionLinkData.png', import.meta.url).href
          : new URL('@/assets/introductionLinkData_dark.png', import.meta.url).href,
    },
    {
      icon: 'mdi-view-dashboard-edit-outline',
      title: t('home.introductionDashboard'),
      text: t('home.introductionDashboardText'),
      media:
        user.theme === 'lightTheme'
          ? new URL('@/assets/introductionDashboard.png', import.meta.url).href
          : new URL('@/assets/introductionDashboard_dark.png', import.meta.url).href,
    },
    {
      icon: 'mdi-account-arrow-up-outline',
      title: t('home.introductionPublic'),
      text: t('home.introductionPublicText'),
      media:
        user.theme === 'lightTheme'
          ? new URL('@/assets/introductionPublic.png', import.meta.url).href
          : new URL('@/assets/introductionPublic_dark.png', import.meta.url).href,
    },
  ]
})

const dashboards = ref(['', '', '', '', ''])

const getDashboards = async () => {
  try {
    const { data } = await api.get('/dashboard/public?page=1&limit=5&sort=view')
    dashboards.value = data.result
  } catch (err) {
    console.log(err)
  }
}
getDashboards()

gsap.registerPlugin(ScrollTrigger)
onMounted(() => {
  gsap.utils.toArray('.media').forEach((el, index) => {
    gsap.from(el, {
      opacity: 0,
      x: index % 2 === 0 ? 150 : -150,
      duration: 1.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 70%',
        end: 'top 50%',
        toggleActions: 'play none none none',
      },
    })
  })
})
</script>

<style lang="scss" scoped>
.hero-section {
  height: calc(100vh - 60px);
  padding-top: 6rem;

  & .btn-getStarted {
    width: 250px;
    height: 80px;
    font-size: 2rem;
  }

  & .vedio1 {
    width: 70%;
  }

  & .vedio2 {
    width: 60%;
    position: absolute;
    top: 40%;
    right: 0;
  }
}

.introduction {
  background: rgb(var(--v-theme-surface));

  & .vertical-line {
    position: absolute;
    top: 12px;
    height: calc(100% - 24px);
    border-style: dashed;
  }

  & .media {
    width: 100%;
  }
}

.highlights {
  height: 100vh;
  padding-top: 6rem;
}

.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;

  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

<route lang="json">
{
  "meta": {
    "login": false,
    "title": "nav.home"
  }
}
</route>
