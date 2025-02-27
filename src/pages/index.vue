<template>
  <div class="hero-section">
    <v-container class="h-screen">
      <v-row class="flex-column flex-nowrap h-100">
        <v-col class="flex-0-1 d-flex flex-column flex-sm-row">
          <div class="w-100 w-sm-50">
            <h1 class="mainHeadline text-h3 font-weight-bold">{{ $t('home.mainHeadline') }}</h1>
            <h3 class="Subheadline text-h6 font-weight-bold">{{ $t('home.Subheadline') }}</h3>
          </div>
          <div class="w-100 w-sm-50 d-flex flex-column justify-center align-center align-sm-end">
            <v-btn class="btn-getStarted" color="primary" variant="flat">{{
              $t('home.getStarted')
            }}</v-btn>
            <v-btn class="btn-explore" variant="outlined">{{ $t('home.explore') }}</v-btn>
          </div>
        </v-col>
        <v-col class="position-relative pt-16">
          <div class="vedio1">
            <video class="w-100 rounded-xl" muted :src="demo" autoplay loop></video>
          </div>
          <div class="vedio2">
            <video class="w-100 rounded-xl" muted :src="demo" autoplay loop></video>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
  <div class="introduction">
    <v-container class="h-screen">
      <v-row class="flex-column flex-nowrap h-100">
        <v-col cols="12" class="flex-0-1">
          <h3 class="introductionTitle">{{ $t('home.introductionTitle') }}</h3>
        </v-col>
        <v-col cols="12" class="flex-1-1 d-flex justify-center align-center">
          <v-card class="w-100 w-xl-75">
            <v-card-title>{{ introductions[tab].title }}</v-card-title>
            <v-card-text>
              <div>{{ introductions[tab].text }}</div>
              <div class="media"></div>
            </v-card-text>
            <v-card-actions>
              <v-btn
                v-for="(introduction, index) in introductions"
                :key="introduction"
                :class="{ active: tab === index ? true : false }"
                @click="tab = index"
                >{{ introduction.title }}</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
  <div class="highlights">
    <v-container fluid class="h-screen">
      <v-row class="flex-column flex-nowrap h-100">
        <v-col cols="12" class="flex-0-0">
          <h3 class="highlightsTitle">{{ $t('home.highlightsTitle') }}</h3>
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
                  class="border ma-1 cursor-pointer rounded-xl"
                  :src="dashboard.image || whiteImg"
                  @click="$router.push(`/dashboard/${dashboard._id}`)"
                ></v-img>
              </v-col>
            </swiper-slide>
          </swiper>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import { useAxios } from '@/composables/axios'
import { useDisplay } from 'vuetify'

const { t } = useI18n()
const { api } = useAxios()
const { name } = useDisplay()

const demo = new URL('@/assets/demo.webm', import.meta.url).href
const whiteImg = new URL('@/assets/white.png', import.meta.url).href

const tab = ref(0)
const introductions = computed(() => {
  return [
    {
      icon: 'mdi-data',
      title: t('home.introductionData'),
      text: t('home.introductionDataText'),
      media: '',
    },
    {
      icon: 'mdi-transit-connection-horizontal',
      title: t('home.introductionLinkData'),
      text: t('home.introductionLinkDataText'),
      media: '',
    },
    {
      icon: 'mdi-view-dashboard-edit-outline',
      title: t('home.introductionDashboard'),
      text: t('home.introductionDashboardText'),
      media: '',
    },
    {
      icon: 'mdi-account-arrow-up-outline',
      title: t('home.introductionPublic'),
      text: t('home.introductionPublicText'),
      media: '',
    },
  ]
})

const dashboards = ref([])

const getDashboards = async () => {
  try {
    const { data } = await api.get('/dashboard/public?page=1&limit=5&sort=view')
    dashboards.value = data.result
  } catch (err) {
    console.log(err)
  }
}
getDashboards()
</script>

<style lang="scss" scoped>
.hero-section {
  height: 100vh;
  padding-top: 6rem;

  & .mainHeadline {
    margin-bottom: 1rem;
  }

  & .btn-getStarted {
    width: 200px;
    height: 80px;
    font-size: 2rem;
    margin-bottom: 1rem;
    // background: rgba(var(--v-theme-primary), 0.8);
  }

  & .btn-explore {
    width: 200px;
    height: 80px;
    font-size: 2rem;
  }

  & .vedio1 {
    width: 60%;
  }

  & .vedio2 {
    width: 50%;
    position: absolute;
    top: 30%;
    right: 0;
  }
}

.introduction {
  height: 120vh;
  padding-top: 6rem;
  background: rgb(var(--v-theme-surface));

  & .introductionTitle {
    font-size: 1.5rem;
    text-align: center;
  }

  & .media {
    aspect-ratio: 16 / 9;
    border: 1px solid black;
  }
}

:deep(.active > .v-btn__overlay) {
  border-bottom: 1px solid rgba(var(--v-theme-secondary));
  border-radius: 0;
}

.highlights {
  height: 120vh;
  padding-top: 6rem;

  & .highlightsTitle {
    font-size: 1.5rem;
    text-align: center;
  }
}

.swiper {
  width: 100%;
  height: 80%;
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
    "admin": false,
    "title": "nav.home"
  }
}
</route>
