<template>
  <div>
    <div class="hero-section d-flex flex-column justify-center align-center text-center">
      <h1 class="text-h3 font-weight-bold">{{ $t('about.title') }}</h1>
      <h2 class="text-h5 mt-4">{{ $t('about.subtitle') }}</h2>
    </div>

    <v-container>
      <v-row>
        <v-col cols="12" class="mx-auto text-center">
          <h3 class="text-h4 font-weight-bold">{{ $t('about.missionTitle') }}</h3>
          <p class="mt-3">{{ $t('about.missionText') }}</p>
        </v-col>
      </v-row>

      <v-row class="mt-10 align-stretch" justify="center">
        <v-col v-for="feature in features" :key="feature.title" cols="3">
          <v-card class="pa-5 text-center h-100" elevation="2">
            <v-icon class="mb-4" size="48" color="primary">{{ feature.icon }}</v-icon>
            <h4 class="text-h5 font-weight-bold">{{ feature.title }}</h4>
            <p class="mt-2">{{ feature.text }}</p>
          </v-card>
        </v-col>
      </v-row>

      <v-row class="mt-10">
        <v-col cols="12" class="text-center">
          <h3 class="text-h4 font-weight-bold">{{ $t('about.techTitle') }}</h3>
        </v-col>
        <v-col cols="12" class="d-flex justify-center">
          <ul>
            <li><strong>Frontend:</strong> Vue3 + Vite + Vuetify</li>
            <li><strong>Backend:</strong> Node.js + MongoDB</li>
          </ul>
        </v-col>
        <v-col cols="12" class="d-flex justify-center">
          <ul>
            <li><strong>Visualization:</strong> Chart.js + interact.js</li>
            <li><strong>Cloud Storage:</strong> Cloudinary</li>
          </ul>
        </v-col>
      </v-row>

      <v-row class="mt-10 text-center">
        <v-col cols="12">
          <h3 class="text-h4 font-weight-bold">{{ $t('about.challengesTitle') }}</h3>
        </v-col>
        <v-col cols="12" class="">
          <p>{{ $t('about.challenge1') }}</p>
          <p>{{ $t('about.challenge2') }}</p>
          <p>{{ $t('about.challenge3') }}</p>
        </v-col>
      </v-row>

      <v-row class="mt-10 text-center">
        <v-col cols="12">
          <h3 class="text-h4 font-weight-bold">{{ $t('about.futureTitle') }}</h3>
        </v-col>
        <v-col cols="12" class="">
          <p>{{ $t('about.future1') }}</p>
          <p>{{ $t('about.future2') }}</p>
          <p>{{ $t('about.future3') }}</p>
        </v-col>
      </v-row>

      <v-row class="mt-10 text-center">
        <v-col cols="12">
          <h3 class="text-h4 font-weight-bold">GitHub</h3>
        </v-col>
        <v-col cols="12">
          <p>
            GitHub:
            <a href="https://github.com/Hengll/DataViz_front" target="_blank">GitHub Repo</a>
          </p>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const features = computed(() => {
  return [
    {
      icon: 'mdi-database',
      title: t('about.feature1Title'),
      text: t('about.feature1Text'),
    },
    {
      icon: 'mdi-transit-connection-horizontal',
      title: t('about.feature2Title'),
      text: t('about.feature2Text'),
    },
    {
      icon: 'mdi-view-dashboard-edit-outline',
      title: t('about.feature3Title'),
      text: t('about.feature3Text'),
    },
    {
      icon: 'mdi-account-arrow-up-outline',
      title: t('about.feature4Title'),
      text: t('about.feature4Text'),
    },
  ]
})
</script>

<style lang="scss" scoped>
.hero-section {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.2)), center/cover;
  color: white;
  padding: 2rem;
}
</style>

<route lang="json">
{
  "meta": {
    "login": false,
    "admin": false,
    "title": "nav.about"
  }
}
</route>
