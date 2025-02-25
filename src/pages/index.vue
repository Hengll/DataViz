<template>
  <v-container>
    <div class="hero-section">
      <v-row>
        <v-col cols="12" class="d-flex justify-center align-end mt-10">
          <div class="w-75">
            <h1 class="mainHeadline">{{ $t('home.mainHeadline') }}</h1>
            <h3 class="Subheadline">{{ $t('home.Subheadline') }}</h3>
          </div>
        </v-col>
        <v-col cols="12">
          <div class="d-flex justify-space-around">
            <v-btn class="btn-getStarted" variant="outlined" rounded="0">{{
              $t('home.getStarted')
            }}</v-btn>
            <v-btn class="btn-explore" variant="outlined" rounded="0">{{
              $t('home.explore')
            }}</v-btn>
          </div>
        </v-col>
      </v-row>
    </div>
    <div class="introduction"></div>
    <div class="highlights"></div>
  </v-container>
</template>

<script setup>
//
</script>

<style lang="scss" scoped>
.hero-section {
  height: 100vh;
  margin-bottom: 3rem;
  background: rgb(var(--v-theme-surface));

  & .mainHeadline {
    font-size: 4rem;
  }

  & .Subheadline {
    font-size: 1.5rem;
  }
}

.introduction {
  height: 100vh;
  margin-bottom: 3rem;
  background: rgb(var(--v-theme-surface));
}

.highlights {
  height: 100vh;
  background: rgb(var(--v-theme-surface));
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
