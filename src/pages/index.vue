<template>
  <v-container>
    <div class="hero-section">
      <v-row class="flex-column flex-nowrap h-100">
        <v-col cols="12" class="d-flex justify-center align-end flex-0-0-0">
          <div class="w-75">
            <h1 class="mainHeadline text-h3 font-weight-bold">{{ $t('home.mainHeadline') }}</h1>
            <h3 class="Subheadline text-h5 font-weight-bold">{{ $t('home.Subheadline') }}</h3>
          </div>
        </v-col>
        <v-col cols="12" class="flex-0-0-0 mt-10">
          <div class="d-flex justify-center align-center flex-column flex-md-row">
            <v-btn class="btn-getStarted mb-3 mb-md-0 me-md-10" variant="outlined" rounded="0">{{
              $t('home.getStarted')
            }}</v-btn>
            <v-btn class="btn-explore" variant="outlined" rounded="0">{{
              $t('home.explore')
            }}</v-btn>
          </div>
        </v-col>
        <v-col cols="12" class="flex-1-0-0 d-flex justify-center">
          <div class="video">
            <video class="w-100" muted :src="demo" autoplay loop></video>
          </div>
        </v-col>
      </v-row>
    </div>
    <div class="introduction">
      <v-row class="flex-column flex-nowrap h-100">
        <v-col cols="12" class="flex-0-0-0">
          <h3 class="introductionTitle">{{ $t('home.introductionTitle') }}</h3>
        </v-col>
        <v-col cols="12" class="d-flex justify-center align-center flex-1-0-0">
          <v-card class="w-75 h-75 d-flex flex-column pa-2">
            <v-card-title class="flex-0-0-auto">{{ introductions[tab].title }}</v-card-title>
            <v-card-text class="flex-1-0-auto d-flex flex-column justify-space-between">
              <div>{{ introductions[tab].text }}</div>
              <div class="media"></div>
            </v-card-text>
            <v-card-actions class="overflow-x-auto">
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
    </div>
    <div class="highlights">
      <v-row>
        <v-col cols="12">
          <h3 class="highlightsTitle">{{ $t('home.highlightsTitle') }}</h3>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const demo = new URL('@/assets/demo.webm', import.meta.url).href

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
</script>

<style lang="scss" scoped>
.hero-section {
  height: 100vh;
  margin-bottom: 3rem;
  padding-top: 5rem;
  background: rgb(var(--v-theme-surface));

  & .mainHeadline {
    text-align: center;
    margin-bottom: 1rem;
  }

  & .Subheadline {
    text-align: center;
  }

  & .btn-getStarted {
    width: 200px;
    height: 80px;
    font-size: 2rem;
  }

  & .btn-explore {
    width: 200px;
    height: 80px;
    font-size: 2rem;
  }

  & .video {
    width: 75%;
    display: flex;
  }
}

.introduction {
  height: 100vh;
  margin-bottom: 3rem;
  background: rgb(var(--v-theme-surface));

  & .introductionTitle {
    font-size: 1.5rem;
    text-align: center;
  }

  & .media {
    height: 400px;
    border: 1px solid black;
  }
}

:deep(.introduction .v-btn__overlay) {
  background: transparent;
  opacity: 1;
}

:deep(.introduction .active > .v-btn__overlay) {
  border-bottom: 1px solid rgba(var(--v-theme-on-surface));
  border-radius: 0;
}

.highlights {
  height: 100vh;
  background: rgb(var(--v-theme-surface));

  & .highlightsTitle {
    font-size: 1.5rem;
    text-align: center;
  }
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
