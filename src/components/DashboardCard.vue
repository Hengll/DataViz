<template>
  <v-card>
    <v-img :src="image" height="200" cover></v-img>
    <v-card-title>
      <router-link :to="'/dashboard/' + _id">{{ dashboardName }}</router-link>
    </v-card-title>
    <v-card-subtitle>{{ user }}</v-card-subtitle>
    <v-card-text>
      <v-row>
        <v-col cols="8">
          <v-icon icon="mdi-thumb-up-outline"></v-icon>
          <span>{{ like }}</span>
          <v-icon icon="mdi-eye-outline"></v-icon>
          <span>{{ view }}</span>
        </v-col>
        <v-col cols="4" class="d-flex flex-column">
          <v-btn>{{ $t('dashboard.edit') }}</v-btn>
          <v-btn @click="onDelete">{{ $t('dashboard.delete') }}</v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup>
defineProps({
  // eslint-disable-next-line vue/prop-name-casing
  _id: {
    type: String,
    default: '',
  },
  dashboardName: {
    type: String,
    default: '',
  },
  user: {
    type: String,
    default: '',
  },
  like: {
    type: Number,
    default: 0,
  },
  view: {
    type: Number,
    default: 0,
  },
  image: {
    type: String,
    default: '',
  },
  onDelete: {
    type: Function,
    default: () => {},
  },
})
</script>
