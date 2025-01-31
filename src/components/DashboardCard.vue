<template>
  <v-card>
    <v-img :src="image"></v-img>
    <v-row>
      <v-col cols="8">
        <v-card-title>
          <router-link :to="'/dashboard/' + _id" class="text-decoration-none">{{
            dashboardName
          }}</router-link>
        </v-card-title>
        <v-card-subtitle>{{ user }}</v-card-subtitle>
        <v-card-text>
          <v-row>
            <v-col cols="6" class="d-flex align-end">
              <v-icon class="me-2" icon="mdi-thumb-up-outline"></v-icon>
              <span>{{ like }}</span>
            </v-col>
            <v-col cols="6" class="d-flex align-end">
              <v-icon class="me-2" icon="mdi-eye-outline"></v-icon>
              <span>{{ view }}</span>
            </v-col>
          </v-row>
        </v-card-text>
      </v-col>
      <v-col cols="4">
        <v-card-actions class="d-flex flex-column">
          <v-btn class="border">{{ $t('dashboard.edit') }}</v-btn>
          <v-btn class="border" @click="onDelete">{{ $t('dashboard.delete') }}</v-btn>
        </v-card-actions>
      </v-col>
    </v-row>
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
