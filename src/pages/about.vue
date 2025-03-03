<template>
  <div>
    <!-- Hero Section -->
    <div class="hero-section d-flex flex-column justify-center align-center text-center">
      <h1 class="text-h3 font-weight-bold">{{ $t('about.title') }}</h1>
      <h2 class="text-h5 mt-4">{{ $t('about.subtitle') }}</h2>
    </div>

    <v-container>
      <!-- Our Mission -->
      <v-row>
        <v-col cols="12" md="8" class="mx-auto text-center">
          <h3 class="text-h4 font-weight-bold">{{ $t('about.missionTitle') }}</h3>
          <p class="mt-3">{{ $t('about.missionText') }}</p>
        </v-col>
      </v-row>

      <!-- Key Features -->
      <v-row class="mt-10" justify="center">
        <v-col v-for="feature in features" :key="feature.title" cols="12" md="6" lg="3">
          <v-card class="pa-5 text-center" elevation="2">
            <v-icon class="mb-4" size="48" color="primary">{{ feature.icon }}</v-icon>
            <h4 class="text-h5 font-weight-bold">{{ feature.title }}</h4>
            <p class="mt-2">{{ feature.text }}</p>
          </v-card>
        </v-col>
      </v-row>

      <!-- Tech Stack -->
      <v-row class="mt-10">
        <v-col cols="12" class="text-center">
          <h3 class="text-h4 font-weight-bold">{{ $t('about.techTitle') }}</h3>
        </v-col>
        <v-col cols="12" md="6">
          <ul>
            <li><strong>Frontend:</strong> Vue 3 + Vite + Tailwind CSS</li>
            <li><strong>Backend:</strong> Flask + MariaDB / Firebase</li>
          </ul>
        </v-col>
        <v-col cols="12" md="6">
          <ul>
            <li><strong>Visualization:</strong> D3.js / Chart.js</li>
            <li><strong>Cloud Storage:</strong> Cloudinary</li>
          </ul>
        </v-col>
      </v-row>

      <!-- Development Challenges -->
      <v-row class="mt-10 text-center">
        <v-col cols="12">
          <h3 class="text-h4 font-weight-bold">{{ $t('about.challengesTitle') }}</h3>
        </v-col>
        <v-col cols="12" md="8" class="mx-auto">
          <ul>
            <li>{{ $t('about.challenge1') }}</li>
            <li>{{ $t('about.challenge2') }}</li>
            <li>{{ $t('about.challenge3') }}</li>
          </ul>
        </v-col>
      </v-row>

      <!-- Future Plans -->
      <v-row class="mt-10 text-center">
        <v-col cols="12">
          <h3 class="text-h4 font-weight-bold">{{ $t('about.futureTitle') }}</h3>
        </v-col>
        <v-col cols="12" md="8" class="mx-auto">
          <ul>
            <li>{{ $t('about.future1') }}</li>
            <li>{{ $t('about.future2') }}</li>
            <li>{{ $t('about.future3') }}</li>
          </ul>
        </v-col>
      </v-row>

      <!-- Contact Us -->
      <v-row class="mt-10 text-center">
        <v-col cols="12">
          <h3 class="text-h4 font-weight-bold">{{ $t('about.contactTitle') }}</h3>
        </v-col>
        <v-col cols="12">
          <p>GitHub: <a href="#" target="_blank">GitHub Repo</a></p>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const features = [
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
</script>

<style lang="scss" scoped>
.hero-section {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background:
    linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.2)),
    url('@/assets/about_hero.jpg') center/cover;
  color: white;
  padding: 2rem;
}
</style>
